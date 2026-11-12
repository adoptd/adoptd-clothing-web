/**
 * Image helpers for bulletproof asset delivery across Adoptd Clothing.
 * Detects expired Airtable attachment URLs and provides permanent local fallbacks.
 */

export function isAirtableUrlExpired(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  if (!url.includes('airtableusercontent.com') && !url.includes('airtable.com')) return false;

  try {
    const parsed = new URL(url);
    const expParam = parsed.searchParams.get('exp') || parsed.searchParams.get('expires');
    if (expParam) {
      let expSec = parseInt(expParam, 10);
      if (expSec < 10000000000) expSec *= 1000;
      return Date.now() >= expSec;
    }
  } catch {
    // If URL parsing fails, do not flag as expired
  }

  return false;
}

export function getProductFallbackImage(category?: string, slug?: string): string {
  const s = (slug || '').toLowerCase();

  // 1. Direct product-specific high-resolution static WebP mockups
  // Hoodies
  if (s.includes('amazing-grace') && s.includes('hoodie')) {
    return '/images/products/amazing-grace-hoodie.webp';
  }
  if (s.includes('faith-over-fear') && s.includes('hoodie')) {
    return '/images/products/faith-over-fear-christian-hoodie.webp';
  }
  if ((s.includes('he-left-the-99') || s.includes('99')) && s.includes('hoodie')) {
    return '/images/products/he-left-the-99-christian-hoodie.webp';
  }
  if (s.includes('need-prayer') && s.includes('hoodie')) {
    return '/images/products/need-prayer-christian-hoodie.webp';
  }
  if (s.includes('pray') && s.includes('hoodie')) {
    return '/images/products/pray-christian-hoodie.webp';
  }

  // T-Shirts
  if (s.includes('faith-over-fear') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/faith-over-fear-christian-t-shirt.webp';
  }
  if (s.includes('pray') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/pray-christian-t-shirt.webp';
  }
  if (s.includes('need-prayer') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/need-prayer-christian-t-shirt.webp';
  }
  if ((s.includes('light') || s.includes('lord-is-my-light')) && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/the-lord-is-my-light-christian-t-shirt.webp';
  }
  if ((s.includes('he-left-the-99') || s.includes('99')) && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/he-left-the-99-christian-t-shirt.webp';
  }
  if ((s.includes('mountains') || s.includes('move-mountains')) && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/faith-can-move-mountains-christian-t-shirt.webp';
  }
  if (s.includes('jesus') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/jesus-christian-t-shirt.webp';
  }

  // Gym & Sportswear
  if (s.includes('kingdom-athlete') && s.includes('hoodie')) {
    return '/images/products/kingdom-athlete-christian-hoodie.webp';
  }
  if (s.includes('kingdom-athlete') && s.includes('sweatshirt')) {
    return '/images/products/kingdom-athlete-christian-sweatshirt.webp';
  }
  if (s.includes('kingdom-athlete')) {
    return '/images/products/kingdom-athlete-mens-performance-tank.webp';
  }
  if (s.includes('run-the-race') && (s.includes('women') || s.includes('racerback'))) {
    return '/images/products/run-the-race-womens-racerback-tank.webp';
  }
  if (s.includes('run-the-race') && (s.includes('tank') || s.includes('vest'))) {
    return '/images/products/run-the-race-christian-mens-tank.webp';
  }
  if (s.includes('run-the-race') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/run-the-race-christian-mens-t-shirt.webp';
  }
  if (s.includes('armour') && (s.includes('women') || s.includes('racerback'))) {
    return '/images/products/armour-christian-womens-racerback-tank.webp';
  }
  if (s.includes('armour') && (s.includes('tank') || s.includes('vest') || s.includes('performance'))) {
    return '/images/products/armour-christian-mens-performance-tank.webp';
  }
  if (s.includes('armour')) {
    return '/images/products/armour-christian-mens-t-shirt.webp';
  }
  if (s.includes('train-pray-repeat')) {
    return '/images/products/train-pray-repeat-womens-racerback-tank.webp';
  }

  // Christmas Collection
  if (s.includes('o-holy-night') || s.includes('holy-night')) {
    return '/images/products/o-holy-night-christmas-sweatshirt.webp';
  }
  if (s.includes('hope-was-born') || s.includes('hope-is-born')) {
    return '/images/products/hope-was-born-christmas-sweatshirt.webp';
  }

  // T-Shirts (additional)
  if (s.includes('amazing-grace') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/amazing-grace-christian-t-shirt.webp';
  }

  // Tote Bags
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
    return '/images/products/christian-TOTE_amazing-grace(main).webp';
  }

  // 2. Category-based high-resolution static fallbacks
  const cat = (category || '').toLowerCase();
  if (cat.includes('bag') || cat.includes('tote')) {
    return '/images/products/christian-TOTE_amazing-grace(main).webp';
  }
  if (cat.includes('hoodie') || cat.includes('sweater')) {
    return '/images/products/christian-HOODIE_amazing-grace(main).webp';
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
