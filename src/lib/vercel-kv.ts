import { kv } from '@vercel/kv';

/**
 * Distributed Edge Rate Limiter powered by Vercel KV (Upstash Redis)
 */
export async function checkRateLimitKV(
  key: string,
  limit: number = 3,
  windowSeconds: number = 600
): Promise<{ success: boolean; remaining: number }> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    // Graceful in-memory fallback if Vercel KV is not yet provisioned
    return { success: true, remaining: limit };
  }

  try {
    const current = await kv.incr(key);
    if (current === 1) {
      await kv.expire(key, windowSeconds);
    }
    return {
      success: current <= limit,
      remaining: Math.max(0, limit - current),
    };
  } catch (error) {
    console.warn('Vercel KV rate limit check failed, bypassing:', error);
    return { success: true, remaining: limit };
  }
}
