import { createClient } from '@supabase/supabase-js';
import { Product, ProductColorVariant, ProductCategory } from '@/types';
import { mockProducts } from '@/data/mockData';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://twpnniihnevlkxnuysjj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_JX1R7a8qmTADZzcKlcSVXA_YD7FZtQ7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Map of existing mock products for instant fallback of pre-rendered high-res variants
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
  { key: 'image_black', name: 'Black', slug: 'black' },
  { key: 'image_grey', name: 'Grey', slug: 'grey' },
  { key: 'image_natural', name: 'Natural', slug: 'sand' },
  { key: 'image_white', name: 'White', slug: 'white' },
  { key: 'image_jade', name: 'Jade', slug: 'jade' },
  { key: 'image_purple', name: 'Purple', slug: 'purple' },
  { key: 'image_green', name: 'Green', slug: 'green' },
  { key: 'image_burgundy', name: 'Burgundy', slug: 'burgundy' },
  { key: 'image_blue', name: 'Blue', slug: 'blue' },
  { key: 'image_lilac', name: 'Lilac', slug: 'lilac' },
  { key: 'image_navy', name: 'Navy', slug: 'navy' },
  { key: 'image_sapphire', name: 'Sapphire', slug: 'sapphireblue' },
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

  // Check if mockData has rich color variants with verified local images for this product
  const mockMatch = mockBySlug.get(slug) || mockBySlug.get(rawName.toLowerCase());

  // Build colors
  let colors: ProductColorVariant[] = [];

  if (mockMatch && mockMatch.colors && mockMatch.colors.length > 0) {
    colors = mockMatch.colors;
  } else {
    // Check local public folder for images by slug convention
    const publicProductsDir = path.join(process.cwd(), 'public', 'images', 'products');
    for (const c of COLOR_COLUMNS) {
      const colorImages: string[] = [];
      const primaryCandidate = `${slug}-${c.slug}.webp`;
      if (fs.existsSync(path.join(publicProductsDir, primaryCandidate))) {
        colorImages.push(`/images/products/${primaryCandidate}`);
      }

      // Check lifestyle photos
      for (let i = 1; i <= 3; i++) {
        const lifeCandidate = `${slug}-lifestyle-${i}.webp`;
        if (fs.existsSync(path.join(publicProductsDir, lifeCandidate))) {
          colorImages.push(`/images/products/${lifeCandidate}`);
        }
      }

      // If database has an image filename specified in this column
      const dbVal = row[c.key];
      if (dbVal && typeof dbVal === 'string' && dbVal.trim()) {
        const filenames = dbVal.split(',').map((f: string) => f.trim()).filter(Boolean);
        filenames.forEach((fname) => {
          if (!fname.includes('airtable.com')) {
            const url = fname.startsWith('/') || fname.startsWith('http')
              ? fname
              : `${supabaseUrl}/storage/v1/object/public/products/${fname}`;
            if (!colorImages.includes(url)) {
              colorImages.push(url);
            }
          }
        });
      }

      if (colorImages.length > 0) {
        colors.push({
          name: c.name,
          hex: getColorHex(c.name),
          images: colorImages,
          hasSpecificImage: true,
        });
      }
    }
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
  if (mockMatch && mockMatch.featuredImage) {
    featuredImage = mockMatch.featuredImage;
  } else if (fs.existsSync(path.join(process.cwd(), 'public', 'images', 'products', `${slug}.webp`))) {
    featuredImage = `/images/products/${slug}.webp`;
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
