// Multi-layered Anti-Spam & Bot Defense for Newsletter Submissions

// 1. In-Memory Sliding Window Rate Limiter (Max 3 submissions per IP per 10 minutes)
const ipSubmissionTracker = new Map<string, { count: number; firstAttempt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS_PER_WINDOW = 3;

// Periodic cleanup of stale IP records every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipSubmissionTracker.entries()) {
    if (now - data.firstAttempt > RATE_LIMIT_WINDOW_MS) {
      ipSubmissionTracker.delete(ip);
    }
  }
}, 15 * 60 * 1000);

// 2. Known Disposable / Temporary Email Domains Blocklist
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  'guerrillamail.com',
  'sharklasers.com',
  'throwawaymail.com',
  'trashmail.com',
  'getnada.com',
  'temp-mail.org',
  'yopmail.com',
  'dispostable.com',
  'fakemailgenerator.com',
  'mohmal.com',
]);

export interface SpamValidationResult {
  isSpam: boolean;
  reason?: string;
  silentDrop?: boolean; // Return 200 to fool automated bots without saving
}

export function validateSubmissionSpam({
  email,
  honeypot,
  formRenderTime,
  clientIp = 'unknown',
}: {
  email: string;
  honeypot?: string;
  formRenderTime?: number;
  clientIp?: string;
}): SpamValidationResult {
  // A. Honeypot check (Bots automatically fill hidden fields)
  if (honeypot && honeypot.trim().length > 0) {
    return { isSpam: true, silentDrop: true, reason: 'Honeypot field filled' };
  }

  // B. Fast-Submission Speed Check (Bots submit within milliseconds)
  if (formRenderTime) {
    const elapsedSeconds = (Date.now() - formRenderTime) / 1000;
    if (elapsedSeconds < 1.2) {
      return { isSpam: true, silentDrop: true, reason: 'Submission completed too fast (< 1.2s)' };
    }
  }

  // C. Rate Limiting by Client IP
  const now = Date.now();
  const ipData = ipSubmissionTracker.get(clientIp);

  if (ipData) {
    if (now - ipData.firstAttempt < RATE_LIMIT_WINDOW_MS) {
      if (ipData.count >= MAX_ATTEMPTS_PER_WINDOW) {
        return { isSpam: true, silentDrop: false, reason: 'Too many requests. Please try again later.' };
      }
      ipData.count += 1;
    } else {
      ipSubmissionTracker.set(clientIp, { count: 1, firstAttempt: now });
    }
  } else {
    ipSubmissionTracker.set(clientIp, { count: 1, firstAttempt: now });
  }

  // D. Email Syntax & Length Sanitization
  if (!email || typeof email !== 'string' || email.length > 100) {
    return { isSpam: true, silentDrop: false, reason: 'Invalid email length or format' };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { isSpam: true, silentDrop: false, reason: 'Please enter a valid email address' };
  }

  // E. Disposable Email Domain Block
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return { isSpam: true, silentDrop: false, reason: 'Temporary/disposable email addresses are not accepted.' };
  }

  return { isSpam: false };
}
