import { createClient } from '@supabase/supabase-js';
import { Product, ProductColorVariant, ProductCategory } from '@/types';
import { getProductFallbackImage } from './images';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://twpnniihnevlkxnuysjj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_JX1R7a8qmTADZzcKlcSVXA_YD7FZtQ7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getStorageImageUrl(filename: string | null | undefined): string {
  if (!filename || !filename.trim()) return '';
  const clean = filename.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) return clean;
  return `${supabaseUrl}/storage/v1/object/public/products/${clean}`;
}

export function getColorHex(colorName: string): string {
  const normalized = colorName.toLowerCase().trim();
  if (normalized.includes('black')) return '#111111';
  if (normalized.includes('grey') || normalized.includes('gray')) return '#C0C0C0';
  if (normalized.includes('sand') || normalized.includes('natural')) return '#D8C7B5';
  if (normalized.includes('sapphire')) return '#0F52BA';
  if (normalized.includes('navy')) return '#1B2A4A';
  if (normalized.includes('blue')) return '#2B4C6F';
  if (normalized.includes('white')) return '#FFFFFF';
  if (normalized.includes('burgundy') || normalized.includes('maroon')) return '#6A1A24';
  if (normalized.includes('jade')) return '#00A86B';
  if (normalized.includes('green') || normalized.includes('forest') || normalized.includes('teal')) return '#2D4A3E';
  if (normalized.includes('purple')) return '#5B2C6F';
  if (normalized.includes('lilac')) return '#C8A2C8';
  return '#444444';
}

const COLOR_COLUMNS = [
  { key: 'image_black', name: 'Black' },
  { key: 'image_grey', name: 'Grey' },
  { key: 'image_natural', name: 'Natural' },
  { key: 'image_white', name: 'White' },
  { key: 'image_jade', name: 'Jade' },
  { key: 'image_purple', name: 'Purple' },
  { key: 'image_green', name: 'Green' },
  { key: 'image_burgundy', name: 'Burgundy' },
  { key: 'image_blue', name: 'Blue' },
  { key: 'image_lilac', name: 'Lilac' },
  { key: 'image_navy', name: 'Navy' },
  { key: 'image_sapphire', name: 'Sapphire' },
];

export function mapRowToProduct(row: any): Product {
  const rawName = (row.product_name || 'Untitled Product').trim();
  const slug = rawName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const rawCat = (row.category || '').toLowerCase();
  let categorySlug: ProductCategory = 'tee-shirts';
  let categoryName = row.category || 'T-Shirts';

  if (rawCat.includes('gym') || rawCat.includes('sport')) {
    categorySlug = 'gym-sportswear';
    categoryName = 'Gym & Sportswear';
  } else if (rawCat.includes('christmas')) {
    categorySlug = 'christmas';
    categoryName = 'Christmas';
  } else if (rawCat.includes('bag') || rawCat.includes('tote')) {
    categorySlug = 'christian-bags';
    categoryName = 'Tote Bags';
  } else if (rawCat.includes('hoodie')) {
    categorySlug = 'christian-hoodies-uk';
    categoryName = 'Hoodies';
  } else if (rawCat.includes('sweater')) {
    categorySlug = 'sweaters';
    categoryName = 'Sweaters';
  } else if (rawCat.includes('shirt') || rawCat.includes('tee')) {
    categorySlug = 'tee-shirts';
    categoryName = 'T-Shirts';
  }

  // Parse sizes (e.g. "S, M, L, XL, XXL, 3XL" or "One Size")
  let availableSizes: string[] = ['One Size'];
  if (row.sizes) {
    if (Array.isArray(row.sizes)) {
      availableSizes = row.sizes;
    } else if (typeof row.sizes === 'string') {
      availableSizes = row.sizes.split(',').map((s: string) => s.trim()).filter(Boolean);
    }
  }

  // Build color variants from the color columns
  const colors: ProductColorVariant[] = [];
  for (const c of COLOR_COLUMNS) {
    const val = row[c.key];
    if (val && typeof val === 'string' && val.trim()) {
      // Might be multiple filenames separated by comma (e.g. front and back)
      const filenames = val.split(',').map((f: string) => f.trim()).filter(Boolean);
      const images = filenames.map(getStorageImageUrl);
      colors.push({
        name: c.name,
        hex: getColorHex(c.name),
        images,
        hasSpecificImage: images.length > 0,
      });
    }
  }

  // Default color if none found
  if (colors.length === 0) {
    colors.push({
      name: 'Default',
      hex: '#111111',
      images: [],
      hasSpecificImage: false,
    });
  }

  // Featured image
  let featuredImage = getStorageImageUrl(row.main_featured_image);
  if (!featuredImage && colors.length > 0 && colors[0].images.length > 0) {
    featuredImage = colors[0].images[0];
  }
  if (!featuredImage) {
    featuredImage = getProductFallbackImage(categorySlug, slug);
  }

  // Size guide type
  let sizeGuideType: 'unisex-hoodie' | 'unisex-tshirt' | 'sweater' | 'tote-bag' = 'unisex-tshirt';
  if (categorySlug === 'christian-hoodies-uk') sizeGuideType = 'unisex-hoodie';
  else if (categorySlug === 'sweaters') sizeGuideType = 'sweater';
  else if (categorySlug === 'christian-bags') sizeGuideType = 'tote-bag';

  return {
    id: String(row.id),
    name: rawName,
    slug,
    category: categorySlug,
    categoryName,
    price: Number(row.price) || 0,
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : undefined,
    inStock: row.in_stock !== false,
    availableSizes,
    colors,
    description: row.short_description || row.long_description || '',
    shortDescription: row.short_description || undefined,
    longDescription: row.long_description || undefined,
    scriptureReference: row.scripture_reference || undefined,
    sizeGuideType,
    featuredImage,
    categoryOverview: row.category_overview || undefined,
  };
}

let cachedProducts: Product[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute in-memory cache

export async function getSupabaseProducts(): Promise<Product[]> {
  if (cachedProducts && Date.now() - lastFetchTime < CACHE_TTL_MS) {
    return cachedProducts;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('published', true)
    .order('id', { ascending: true });

  if (error) {
    console.error('[Supabase] Error fetching products:', error);
    return cachedProducts || [];
  }

  const products = (data || []).map(mapRowToProduct);
  cachedProducts = products;
  lastFetchTime = Date.now();
  return products;
}

export async function getSupabaseProductBySlug(slug: string): Promise<Product | null> {
  const products = await getSupabaseProducts();
  const cleanSlug = (slug || '').trim().toLowerCase();
  return products.find((p) => p.slug === cleanSlug || p.id === cleanSlug) || null;
}
