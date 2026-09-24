// Enterprise Multi-Layered Anti-Spam & Malicious Payload Defense for Newsletter

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

// 2. Comprehensive Disposable / Burner Email Domains Blocklist
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'tempmail.com',
  '10minutemail.com',
  '10minutemail.net',
  'guerrillamail.com',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamailblock.com',
  'sharklasers.com',
  'throwawaymail.com',
  'trashmail.com',
  'trashmail.net',
  'trashmail.me',
  'getnada.com',
  'temp-mail.org',
  'temp-mail.io',
  'yopmail.com',
  'yopmail.net',
  'dispostable.com',
  'fakemailgenerator.com',
  'mohmal.com',
  'maildrop.cc',
  'dropmail.me',
  'fakeinbox.com',
  'crazymailing.com',
  'burnermail.io',
  'mytrashmail.com',
  'emailondeck.com',
  'inboxkitten.com',
  'generator.email',
  'zillamail.com',
  'trashcanmail.com',
  'minuteinbox.com',
  'tempr.email',
  'discard.email',
  'spambog.com',
]);

// 3. Spam Keyword & URL Detection
const SPAM_PATTERNS = [
  /http[s]?:\/\//i,
  /www\./i,
  /\.com\b/i,
  /\.ru\b/i,
  /\.cn\b/i,
  /\.xyz\b/i,
  /\.top\b/i,
  /\.link\b/i,
  /href\s*=/i,
  /src\s*=/i,
  /<script/i,
  /<iframe/i,
  /<img/i,
  /javascript:/i,
  /data:text\/html/i,
  /onload\s*=/i,
  /onerror\s*=/i,
  /onclick\s*=/i,
  /telegram/i,
  /t\.me\//i,
  /whatsapp/i,
  /casino/i,
  /crypto/i,
  /viagra/i,
  /seo\s+services/i,
  /backlinks/i,
];

export interface SpamValidationResult {
  isSpam: boolean;
  reason?: string;
  silentDrop?: boolean; // Return 200 to fool automated bots without saving
  sanitizedEmail?: string;
  sanitizedName?: string;
}

// Strip any potentially dangerous HTML / JS / SQL / control characters
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/[\x00-\x1F\x7F]/g, '') // Strip control characters / null bytes
    .replace(/[\r\n\t]/g, ' ') // Strip CRLF injections
    .trim();
}

export function validateSubmissionSpam({
  email,
  name,
  honeypot,
  formRenderTime,
  clientIp = 'unknown',
}: {
  email: string;
  name?: string;
  honeypot?: string;
  formRenderTime?: number;
  clientIp?: string;
}): SpamValidationResult {
  // A. Honeypot check (Automated scrapers fill invisible inputs)
  if (honeypot && honeypot.trim().length > 0) {
    return { isSpam: true, silentDrop: true, reason: 'Honeypot field filled by bot' };
  }

  // B. Fast-Submission Speed Check (Bots submit in under a second)
  if (formRenderTime) {
    const elapsedSeconds = (Date.now() - formRenderTime) / 1000;
    if (elapsedSeconds < 1.2) {
      return { isSpam: true, silentDrop: true, reason: 'Submission completed too fast (< 1.2s)' };
    }
  }

  // C. Rate Limiting by Client IP (Sliding Window)
  const now = Date.now();
  const ipData = ipSubmissionTracker.get(clientIp);

  if (ipData) {
    if (now - ipData.firstAttempt < RATE_LIMIT_WINDOW_MS) {
      if (ipData.count >= MAX_ATTEMPTS_PER_WINDOW) {
        return { isSpam: true, silentDrop: false, reason: 'Too many requests. Please wait a few minutes before trying again.' };
      }
      ipData.count += 1;
    } else {
      ipSubmissionTracker.set(clientIp, { count: 1, firstAttempt: now });
    }
  } else {
    ipSubmissionTracker.set(clientIp, { count: 1, firstAttempt: now });
  }

  // D. Sanitization
  const rawEmail = (email || '').trim();
  const rawName = (name || '').trim();

  // E. Email Validation
  if (!rawEmail || rawEmail.length < 5 || rawEmail.length > 80) {
    return { isSpam: true, silentDrop: false, reason: 'Invalid email address length' };
  }

  // Strict RFC 5322 compliant regex preventing control characters and malformed patterns
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(rawEmail)) {
    return { isSpam: true, silentDrop: false, reason: 'Please enter a valid email address' };
  }

  // F. Disposable Email Domain Block
  const domain = rawEmail.split('@')[1]?.toLowerCase();
  if (domain && DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return { isSpam: true, silentDrop: false, reason: 'Temporary or disposable email addresses are not accepted.' };
  }

  // G. Malicious Script & Spam Keyword Check in Email or Name
  const combinedInput = `${rawEmail} ${rawName}`;
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(combinedInput)) {
      return { isSpam: true, silentDrop: true, reason: 'Suspicious content or script pattern detected' };
    }
  }

  // H. Name Validation & Sanitization (Letters, spaces, hyphens, and apostrophes only)
  let cleanName = '';
  if (rawName) {
    if (rawName.length > 50) {
      return { isSpam: true, silentDrop: false, reason: 'Name is too long (maximum 50 characters)' };
    }
    // Only allow human name characters
    const validNameRegex = /^[a-zA-Z\s\-\'.]+$/;
    if (!validNameRegex.test(rawName)) {
      return { isSpam: true, silentDrop: false, reason: 'Name contains invalid characters' };
    }
    cleanName = sanitizeInput(rawName);
  }

  const cleanEmail = sanitizeInput(rawEmail).toLowerCase();

  return {
    isSpam: false,
    sanitizedEmail: cleanEmail,
    sanitizedName: cleanName,
  };
}
