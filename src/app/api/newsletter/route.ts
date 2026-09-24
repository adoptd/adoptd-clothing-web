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

    // 3. Save to Airtable
    await recordNewsletterSubscriber(cleanEmail, cleanName);

    // 4. Also store in Vercel Postgres if connected
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
