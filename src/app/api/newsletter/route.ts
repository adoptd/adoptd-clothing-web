import { NextRequest, NextResponse } from 'next/server';
import { recordNewsletterSubscriber } from '@/lib/airtable';
import { validateSubmissionSpam } from '@/lib/spam-protection';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, honeypot, formRenderTime } = body;

    // Extract client IP for rate-limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || 'unknown';

    // Run multi-layer spam & bot validation
    const spamCheck = validateSubmissionSpam({
      email: email ? email.trim().toLowerCase() : '',
      honeypot,
      formRenderTime,
      clientIp,
    });

    if (spamCheck.isSpam) {
      // If honeypot or bot speed trap triggered, silently return 200 OK so bots think they succeeded without saving spam
      if (spamCheck.silentDrop) {
        return NextResponse.json({ success: true, message: 'Subscribed successfully' });
      }

      return NextResponse.json(
        { error: spamCheck.reason || 'Invalid submission' },
        { status: 429 }
      );
    }

    // Save cleaned, verified email to Airtable
    await recordNewsletterSubscriber(email.trim().toLowerCase());

    return NextResponse.json({ success: true, message: 'Subscribed successfully' });
  } catch (error: any) {
    console.error('Error handling newsletter submission:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
