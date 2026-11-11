import { createClient } from '@supabase/supabase-js';
import { Product, ProductColorVariant, ProductCategory } from '@/types';
import { mockProducts } from '@/data/mockData';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://twpnniihnevlkxnuysjj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_JX1R7a8qmTADZzcKlcSVXA_YD7FZtQ7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const mockBySlug = new Map<string, Product>();
mockProducts.forEach((p) => {
  mockBySlug.set(p.slug.toLowerCase(), p);
  mockBySlug.set(p.name.toLowerCase(), p);
});

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
  { key: 'image_black', name: 'Black', aliases: ['black'] },
  { key: 'image_grey', name: 'Grey', aliases: ['grey', 'gray'] },
  { key: 'image_natural', name: 'Natural', aliases: ['natural', 'sand'] },
  { key: 'image_white', name: 'White', aliases: ['white'] },
  { key: 'image_jade', name: 'Jade', aliases: ['jade'] },
  { key: 'image_purple', name: 'Purple', aliases: ['purple'] },
  { key: 'image_green', name: 'Green', aliases: ['green', 'olive'] },
  { key: 'image_burgundy', name: 'Burgundy', aliases: ['burgundy', 'maroon'] },
  { key: 'image_blue', name: 'Blue', aliases: ['blue'] },
  { key: 'image_lilac', name: 'Lilac', aliases: ['lilac'] },
  { key: 'image_navy', name: 'Navy', aliases: ['navy'] },
  { key: 'image_sapphire', name: 'Sapphire', aliases: ['sapphire', 'sapphireblue'] },
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

  const mockMatch = mockBySlug.get(slug) || mockBySlug.get(rawName.toLowerCase());
  const publicProductsDir = path.join(process.cwd(), 'public', 'images', 'products');

  // Build colors directly from Supabase database columns!
  const dbHasColors = COLOR_COLUMNS.some((c) => {
    const val = row[c.key];
    return val && typeof val === 'string' && val.trim() && !val.includes('airtable.com');
  });

  const colors: ProductColorVariant[] = [];

  for (const c of COLOR_COLUMNS) {
    const dbVal = row[c.key];
    // A color is available if its image column in Supabase is not null / not empty
    const hasDbColor = dbVal && typeof dbVal === 'string' && dbVal.trim() && !dbVal.includes('airtable.com');

    // If database explicitly defines which colors exist for this product, follow the database
    if (dbHasColors && !hasDbColor) continue;

    // Also check if local pre-rendered images exist for this color
    let localFileMatch = '';
    for (const alias of c.aliases) {
      const candidate = `${slug}-${alias}.webp`;
      if (fs.existsSync(path.join(publicProductsDir, candidate))) {
        localFileMatch = `/images/products/${candidate}`;
        break;
      }
    }

    if (hasDbColor || localFileMatch) {
      const colorImages: string[] = [];

      // 1. Prefer verified local high-res WebP if present
      if (localFileMatch) {
        colorImages.push(localFileMatch);
      } else if (hasDbColor) {
        // 2. Otherwise use Supabase storage URL (primary image only)
        const filenames = dbVal.split(',').map((f: string) => f.trim()).filter(Boolean);
        const primaryFile = filenames.find((f: string) => !f.includes('airtable.com'));
        if (primaryFile) {
          const url = primaryFile.startsWith('/') || primaryFile.startsWith('http')
            ? primaryFile
            : `${supabaseUrl}/storage/v1/object/public/products/${primaryFile}`;
          colorImages.push(url);
        }
      }

      colors.push({
        name: c.name,
        hex: getColorHex(c.name),
        images: colorImages,
        hasSpecificImage: colorImages.length > 0,
      });
    }
  }

  // Fallback to mock colors if database has zero colors defined
  if (colors.length === 0 && mockMatch && mockMatch.colors && mockMatch.colors.length > 0) {
    colors.push(...mockMatch.colors);
  }

  // Fallback default color
  if (colors.length === 0) {
    colors.push({
      name: 'Default',
      hex: '#111111',
      images: [`/images/products/${slug}.webp`],
      hasSpecificImage: false,
    });
  }

  // Featured image
  let featuredImage = '';
  if (fs.existsSync(path.join(publicProductsDir, `${slug}.webp`))) {
    featuredImage = `/images/products/${slug}.webp`;
  } else if (mockMatch && mockMatch.featuredImage) {
    featuredImage = mockMatch.featuredImage;
  } else if (colors[0]?.images[0]) {
    featuredImage = colors[0].images[0];
  } else {
    featuredImage = '/images/shop-hoodies-bg.webp';
  }

  // Size guide type
  let sizeGuideType: 'unisex-hoodie' | 'unisex-tshirt' | 'sweater' | 'tote-bag' = 'unisex-tshirt';
  if (categorySlug === 'christian-hoodies-uk') sizeGuideType = 'unisex-hoodie';
  else if (categorySlug === 'sweaters') sizeGuideType = 'sweater';
  else if (categorySlug === 'christian-bags') sizeGuideType = 'tote-bag';

  // Clean descriptions (filter out .docx attachment links from Airtable)
  const isDocxOrUrl = (str?: string) => 
    Boolean(str && (str.includes('.docx') || str.includes('http://') || str.includes('https://')));

  const cleanLongDescription = isDocxOrUrl(row.long_description) ? '' : (row.long_description || '').trim();
  const cleanShortDescription = isDocxOrUrl(row.short_description) ? '' : (row.short_description || '').trim();
  const finalDescription = cleanLongDescription || cleanShortDescription || (mockMatch?.description || '');

  return {
    id: String(row.id),
    name: rawName,
    slug,
    category: categorySlug,
    categoryName,
    price: Number(row.price) || (mockMatch?.price || 19.99),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : mockMatch?.compareAtPrice,
    inStock: row.in_stock !== false,
    availableSizes: availableSizes.length > 0 ? availableSizes : (mockMatch?.availableSizes || ['M', 'L', 'XL']),
    colors,
    description: finalDescription,
    shortDescription: cleanShortDescription || undefined,
    longDescription: cleanLongDescription || undefined,
    scriptureReference: row.scripture_reference || mockMatch?.scriptureReference || undefined,
    sizeGuideType: mockMatch?.sizeGuideType || sizeGuideType,
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
    return cachedProducts || mockProducts;
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
