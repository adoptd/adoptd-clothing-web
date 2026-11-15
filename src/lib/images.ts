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
    return '/images/products/christian-HOODIE_amazing-grace(main).webp';
  }
  if (s.includes('faith-over-fear') && s.includes('hoodie')) {
    return '/images/products/christian-HOODIE_faith-over-fear(main).webp';
  }
  if ((s.includes('he-left-the-99') || s.includes('99')) && s.includes('hoodie')) {
    return '/images/products/christian-HOODIE_he-left-the-99(main).webp';
  }
  if (s.includes('need-prayer') && s.includes('hoodie')) {
    return '/images/products/christian-HOODIE_need-prayer(main).webp';
  }
  if (s.includes('pray') && s.includes('hoodie')) {
    return '/images/products/christian-HOODIE_pray(main).webp';
  }

  // T-Shirts
  if (s.includes('faith-over-fear') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/christian-T-SHIRT_faith-over-fear(main).webp';
  }
  if (s.includes('pray') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/christian-T-SHIRT_pray(main).webp';
  }
  if (s.includes('need-prayer') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/christian-T-SHIRT_need-prayer(main).webp';
  }
  if ((s.includes('light') || s.includes('lord-is-my-light')) && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/christian-T-SHIRT_the-lord-is-my-light(main).webp';
  }
  if ((s.includes('he-left-the-99') || s.includes('99')) && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/christian-T-SHIRT_he-left-the-99(main).webp';
  }
  if ((s.includes('mountains') || s.includes('move-mountains')) && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/christian-T-SHIRT_faith-can-move-mountains(main).webp';
  }
  if (s.includes('jesus') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/christian-T-SHIRT_jesus(main).webp';
  }

  // Gym & Sportswear
  if (s.includes('kingdom-athlete') && (s.includes('hoodie') || s.includes('sweatshirt'))) {
    return '/images/products/christian-GYM-hoodie_kingdom-athlete(main).webp';
  }
  if (s.includes('kingdom-athlete')) {
    return '/images/products/christian-GYM-men-tank_kingdom-athlete(main).webp';
  }
  if (s.includes('run-the-race') && (s.includes('women') || s.includes('racerback'))) {
    return '/images/products/christian-GYM-women-tank_run-the-race(main).webp';
  }
  if (s.includes('run-the-race') && (s.includes('tank') || s.includes('vest'))) {
    return '/images/products/christian-GYM-men-tank_run-the-race(main).webp';
  }
  if (s.includes('run-the-race') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/christian-GYM-men-t-shirt_run-the-race(main).webp';
  }
  if (s.includes('armour') && (s.includes('women') || s.includes('racerback'))) {
    return '/images/products/christian-GYM-women-tank_armour(main).webp';
  }
  if (s.includes('armour') && (s.includes('tank') || s.includes('vest') || s.includes('performance'))) {
    return '/images/products/christian-GYM-men-t-shirt_armour(main).webp';
  }
  if (s.includes('armour')) {
    return '/images/products/christian-GYM-men-t-shirt_armour(main).webp';
  }
  if (s.includes('train-pray-repeat')) {
    return '/images/products/christian-GYM-women-tank_train-pray-repeat(main).webp';
  }

  // Christmas Collection
  if (s.includes('o-holy-night') || s.includes('holy-night')) {
    return '/images/products/christian-CHRISTMAS_o-holy-night(main).webp';
  }
  if (s.includes('hope-was-born') || s.includes('hope-is-born')) {
    return '/images/products/christian-CHRISTMAS_hope-was-born(main).webp';
  }
  if (s.includes('joy-to-the-world') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/christian-CHRISTMAS-t-shirt_joy-to-the-world(black).webp';
  }

  // T-Shirts (additional)
  if (s.includes('amazing-grace') && (s.includes('t-shirt') || s.includes('tee') || s.includes('shirt'))) {
    return '/images/products/christian-T-SHIRT_amazing-grace(main).webp';
  }

  // Tote Bags
  if (s.includes('he-makes-all-things-new')) {
    return '/images/products/christian-TOTE_he-makes-all-things-new(main).webp';
  }
  if (s.includes('the-true-vine')) {
    return '/images/products/christian-TOTE_the-true-vine(main).webp';
  }
  if (s.includes('more-of-him')) {
    return '/images/products/christian-TOTE_more-of-him(natural).webp';
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
    return '/images/products/christian-T-SHIRT_faith-over-fear(main).webp';
  }
  if (cat.includes('christmas') || cat.includes('xmas')) {
    return '/images/products/christian-CHRISTMAS_o-holy-night(main).webp';
  }
  if (cat.includes('gym') || cat.includes('sport') || cat.includes('active')) {
    return '/images/products/christian-GYM-men-tank_kingdom-athlete(main).webp';
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
