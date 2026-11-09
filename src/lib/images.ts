/**
 * Image helpers for bulletproof asset delivery across Adoptd Clothing.
 * Detects expired Airtable attachment URLs and provides permanent local fallbacks.
 */

export function isAirtableUrlExpired(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  if (!url.includes('airtableusercontent.com') && !url.includes('airtable.com')) return false;

  // Match 13-digit millisecond timestamp or 10-digit second timestamp in URL path
  const match = url.match(/\/(\d{10}|\d{13})\//);
  if (match) {
    let expiresAt = parseInt(match[1], 10);
    if (match[1].length === 10) {
      expiresAt *= 1000;
    }
    // Flag as expired if current time is within 5 minutes of expiration or in the past
    return Date.now() >= expiresAt - 5 * 60 * 1000;
  }

  return false;
}

export function getProductFallbackImage(category?: string, slug?: string): string {
  const s = (slug || '').toLowerCase();

  // 1. Direct product-specific high-resolution static WebP mockups
  if (s.includes('amazing-grace') && s.includes('hoodie')) {
    return '/images/products/amazing-grace-hoodie.webp';
  }
  if (s.includes('he-makes-all-things-new')) {
    return '/images/products/he-makes-all-things-new-tote.webp';
  }
  if (s.includes('the-true-vine')) {
    return '/images/products/the-true-vine-tote.webp';
  }
  if (s.includes('more-of-him')) {
    return '/images/products/more-of-him-tote.webp';
  }
  if (s.includes('amazing-grace') && (s.includes('tote') || s.includes('bag'))) {
    return '/images/products/amazing-grace-tote.webp';
  }

  // 2. Category-based high-resolution static fallbacks
  const cat = (category || '').toLowerCase();
  if (cat.includes('bag') || cat.includes('tote')) {
    return '/images/products/amazing-grace-tote.webp';
  }
  if (cat.includes('hoodie') || cat.includes('sweater')) {
    return '/images/products/amazing-grace-hoodie.webp';
  }
  if (cat.includes('shirt') || cat.includes('tee')) {
    return '/images/shop-tshirts-bg.webp';
  }
  if (cat.includes('christmas') || cat.includes('xmas')) {
    return '/images/shop-christmas-bg.webp';
  }
  if (cat.includes('gym') || cat.includes('sport') || cat.includes('active')) {
    return '/images/gym-sportswear-banner.png';
  }

  return '/images/shop-hoodies-bg.webp';
}

export function resolveProductImage(url?: string, category?: string, slug?: string): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return getProductFallbackImage(category, slug);
  }

  if (isAirtableUrlExpired(url)) {
    return getProductFallbackImage(category, slug);
  }

  return url;
}
