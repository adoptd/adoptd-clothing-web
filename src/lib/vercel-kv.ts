import { kv } from '@vercel/kv';
import { Product } from '@/types';

const CATALOGUE_KV_KEY = 'adoptd:catalogue:products:v1';
const CATALOGUE_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days fallback TTL

export function isKvConfigured(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

/**
 * Distributed Edge Rate Limiter powered by Vercel KV (Upstash Redis)
 */
export async function checkRateLimitKV(
  key: string,
  limit: number = 3,
  windowSeconds: number = 600
): Promise<{ success: boolean; remaining: number }> {
  if (!isKvConfigured()) {
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

/**
 * Retrieve shared Airtable product catalogue from Vercel KV if available
 */
export async function getCachedCatalogueKV(): Promise<Product[] | null> {
  if (!isKvConfigured()) {
    return null;
  }

  try {
    const data = await kv.get<Product[]>(CATALOGUE_KV_KEY);
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return null;
  } catch (error) {
    console.warn('[Vercel KV] Failed to retrieve catalogue from KV:', error);
    return null;
  }
}

/**
 * Store validated Airtable product catalogue in Vercel KV
 */
export async function setCachedCatalogueKV(products: Product[]): Promise<void> {
  if (!isKvConfigured() || !Array.isArray(products) || products.length === 0) {
    return;
  }

  try {
    await kv.set(CATALOGUE_KV_KEY, products, { ex: CATALOGUE_TTL_SECONDS });
  } catch (error) {
    console.warn('[Vercel KV] Failed to persist catalogue to KV:', error);
  }
}

/**
 * Clear cached catalogue from Vercel KV
 */
export async function clearCachedCatalogueKV(): Promise<void> {
  if (!isKvConfigured()) {
    return;
  }

  try {
    await kv.del(CATALOGUE_KV_KEY);
  } catch (error) {
    console.warn('[Vercel KV] Failed to clear catalogue in KV:', error);
  }
}
