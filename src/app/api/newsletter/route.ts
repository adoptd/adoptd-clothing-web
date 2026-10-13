import { NextRequest, NextResponse } from 'next/server';
import { recordNewsletterSubscriber } from '@/lib/airtable';
import { validateSubmissionSpam } from '@/lib/spam-protection';
import { checkRateLimitKV } from '@/lib/vercel-kv';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, honeypot, formRenderTime } = body;

    // Extract client IP for rate-limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || 'unknown';

    // 1. Edge Distributed Rate Limiting via Vercel KV
    const kvRateLimit = await checkRateLimitKV(`newsletter:${clientIp}`, 3, 600);
    if (!kvRateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // 2. Multi-layer spam & bot validation with strict payload sanitization
    const spamCheck = validateSubmissionSpam({
      email: typeof email === 'string' ? email : '',
      name: typeof name === 'string' ? name : '',
      honeypot,
      formRenderTime,
      clientIp,
    });

    if (spamCheck.isSpam) {
      if (spamCheck.silentDrop) {
        // Return 200 OK so automated scrapers don't retry, but discard payload without saving
        return NextResponse.json({ success: true, message: 'Subscribed successfully' });
      }

      return NextResponse.json(
        { error: spamCheck.reason || 'Invalid submission' },
        { status: 429 }
      );
    }

    const cleanEmail = spamCheck.sanitizedEmail || email.trim().toLowerCase();
    const cleanName = spamCheck.sanitizedName || '';

    // 3. Add the subscriber to MailerLite using a server-only API key.
    // Do not expose MAILERLITE_API_KEY to client-side code.
    const mailerLiteApiKey = process.env.MAILERLITE_API_KEY;
    if (!mailerLiteApiKey) {
      console.error('[MailerLite] MAILERLITE_API_KEY is not configured.');
      return NextResponse.json(
        { error: 'Newsletter sign-up is temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    const mailerLiteResponse = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${mailerLiteApiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: cleanEmail,
        fields: cleanName ? { name: cleanName } : {},
      }),
      cache: 'no-store',
    });

    if (!mailerLiteResponse.ok) {
      const responseDetails = await mailerLiteResponse.text();
      console.error('[MailerLite] Subscriber request failed:', mailerLiteResponse.status, responseDetails);
      return NextResponse.json(
        { error: 'We couldn’t complete your newsletter sign-up. Please try again later.' },
        { status: 502 }
      );
    }

    // 4. Save to Airtable as well, preserving the existing subscriber record flow.
    await recordNewsletterSubscriber(cleanEmail, cleanName);

    // 5. Also store in Vercel Postgres if connected
    if (process.env.POSTGRES_URL) {
      try {
        await sql`
          INSERT INTO newsletter_subscribers (email, name)
          VALUES (${cleanEmail}, ${cleanName})
          ON CONFLICT (email) DO NOTHING;
        `;
      } catch (pgErr) {
        console.warn('[Vercel Postgres] Failed to mirror subscriber:', pgErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error: any) {
    console.error('Error handling newsletter submission:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
