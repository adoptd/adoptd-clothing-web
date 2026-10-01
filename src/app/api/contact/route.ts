import { NextRequest, NextResponse } from 'next/server';
import { recordContactInquiry } from '@/lib/airtable';
import { validateSubmissionSpam } from '@/lib/spam-protection';
import { checkRateLimitKV } from '@/lib/vercel-kv';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message, orderNumber, honeypot, formRenderTime } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide your name, email address, and message.' },
        { status: 400 }
      );
    }

    // Extract client IP for rate-limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp || 'unknown';

    // 1. Rate Limiting via Vercel KV (5 submissions per 10 minutes per IP)
    const kvRateLimit = await checkRateLimitKV(`contact:${clientIp}`, 5, 600);
    if (!kvRateLimit.success) {
      return NextResponse.json(
        { error: 'Too many contact requests sent from your device. Please try again shortly or email us directly.' },
        { status: 429 }
      );
    }

    // 2. Multi-layer spam & bot validation
    const spamCheck = validateSubmissionSpam({
      email: typeof email === 'string' ? email : '',
      name: typeof name === 'string' ? name : '',
      honeypot,
      formRenderTime,
      clientIp,
    });

    if (spamCheck.isSpam) {
      if (spamCheck.silentDrop) {
        return NextResponse.json({ success: true, message: 'Message sent successfully.' });
      }
      return NextResponse.json(
        { error: spamCheck.reason || 'Invalid submission detected.' },
        { status: 429 }
      );
    }

    const cleanEmail = spamCheck.sanitizedEmail || email.trim().toLowerCase();
    const cleanName = spamCheck.sanitizedName || name.trim();
    const cleanSubject = typeof subject === 'string' && subject.trim() ? subject.trim() : 'General Support Inquiry';
    const cleanMessage = typeof message === 'string' ? message.trim() : '';
    const cleanOrderNumber = typeof orderNumber === 'string' ? orderNumber.trim() : '';

    // 3. Dispatch email via Resend if RESEND_API_KEY is configured
    const recipientEmail = 'adoptdclothing@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'ADOPTD Support <onboarding@resend.dev>',
            to: [recipientEmail],
            reply_to: cleanEmail,
            subject: `[Website Support] ${cleanSubject} - ${cleanName}`,
            text: `New contact submission from ADOPTD Clothing website:

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}
${cleanOrderNumber ? `Order Number: ${cleanOrderNumber}\n` : ''}
Message:
${cleanMessage}
            `,
            html: `
              <div style="font-family: sans-serif; font-size: 16px; color: #1c1917; max-width: 600px; line-height: 1.6;">
                <h2 style="color: #00736a; margin-bottom: 8px;">New Website Contact Inquiry</h2>
                <p><strong>From:</strong> ${cleanName} (<a href="mailto:${cleanEmail}">${cleanEmail}</a>)</p>
                <p><strong>Subject:</strong> ${cleanSubject}</p>
                ${cleanOrderNumber ? `<p><strong>Order Number:</strong> ${cleanOrderNumber}</p>` : ''}
                <hr style="border: 0; border-top: 1px solid #e7e5e4; margin: 20px 0;" />
                <div style="background-color: #f5f5f4; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${cleanMessage}</div>
                <hr style="border: 0; border-top: 1px solid #e7e5e4; margin: 20px 0;" />
                <p style="font-size: 13px; color: #78716c;">Sent via ADOPTD Christian Clothing website contact form.</p>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.warn('[Contact API] Could not dispatch email via Resend API:', emailErr);
      }
    }

    // 4. Record to Airtable
    await recordContactInquiry({
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      orderNumber: cleanOrderNumber,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. Our team will get back to you within 24 hours.',
    });
  } catch (error: any) {
    console.error('Error handling contact submission:', error);
    return NextResponse.json(
      { error: error.message || 'Unable to submit your message right now. Please email us directly.' },
      { status: 500 }
    );
  }
}
