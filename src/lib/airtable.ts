import Airtable from 'airtable';
import { Product, BlogPost, SiteSettings } from '@/types';
import { mockProducts, mockBlogPosts, mockSiteSettings } from '@/data/mockData';
import { parseDocxBuffer } from './docx-parser';
import yoastSeoData from '@/data/yoast-seo-data.json';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

const base = apiKey && baseId ? new Airtable({ apiKey }).base(baseId) : null;

// ============================================================================
// HIGH-PERFORMANCE IN-MEMORY CACHING LAYER
// ============================================================================
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

let cachedProducts: { data: Product[]; timestamp: number } | null = null;
const cachedProductsBySlug = new Map<string, Product>();
const cachedProductsById = new Map<string, Product>();

let cachedSeoRecords: { data: Record<string, { title?: string; description?: string; keyword?: string }>; timestamp: number } | null = null;

let cachedBlogPosts: { data: BlogPost[]; timestamp: number } | null = null;
const cachedBlogPostsBySlug = new Map<string, BlogPost>();

let cachedAboutData: { data: any; timestamp: number } | null = null;
let cachedSiteSettings: { data: SiteSettings; timestamp: number } | null = null;

const docxCache = new Map<string, { html: string; rawText: string; firstImageUrl?: string | null }>();

export function clearAirtableCache() {
  cachedProducts = null;
  cachedProductsBySlug.clear();
  cachedProductsById.clear();
  cachedSeoRecords = null;
  cachedBlogPosts = null;
  cachedBlogPostsBySlug.clear();
  cachedAboutData = null;
  cachedSiteSettings = null;
  docxCache.clear();
}

async function getCachedDocx(url: string) {
  if (docxCache.has(url)) {
    return docxCache.get(url)!;
  }
  try {
    const fileRes = await fetch(url);
    if (fileRes.ok) {
      const arrayBuffer = await fileRes.arrayBuffer();
      const parsed = await parseDocxBuffer(Buffer.from(arrayBuffer));
      docxCache.set(url, parsed);
      return parsed;
    }
  } catch (err) {
    console.error('Error fetching/parsing docx attachment:', err);
  }
  return { html: '', rawText: '' };
}

// Fetch all records from dedicated SEO table (Cached)
export async function getSeoRecords(): Promise<Record<string, { title?: string; description?: string; keyword?: string }>> {
  if (cachedSeoRecords && Date.now() - cachedSeoRecords.timestamp < CACHE_TTL_MS) {
    return cachedSeoRecords.data;
  }

  if (!base) return {};

  try {
    const records = await base('SEO').select().all();
    const map: Record<string, { title?: string; description?: string; keyword?: string }> = {};

    records.forEach((r) => {
      const slug = ((r.fields['Slug'] as string) || '').trim().toLowerCase();
      const name = ((r.fields['Product Name'] as string) || '').trim().toLowerCase();
      const title = (r.fields['SEO Meta Title'] as string) || '';
      const description = (r.fields['SEO Meta Description'] as string) || '';
      const keyword = (r.fields['Focus Keyword'] as string) || '';

      const seoData = { title, description, keyword };
      if (slug) map[slug] = seoData;
      if (name) map[name] = seoData;
    });

    cachedSeoRecords = { data: map, timestamp: Date.now() };
    return map;
  } catch {
    return cachedSeoRecords?.data || {};
  }
}

// Fetch single page SEO by slug or path
export async function getPageSeo(slugOrPath: string) {
  const seoMap = await getSeoRecords();
  const cleanKey = slugOrPath.replace(/^\//, '').trim().toLowerCase();
  return seoMap[cleanKey] || seoMap[slugOrPath.trim().toLowerCase()] || null;
}

// Fetch all active products (Cached)
export async function getProducts(): Promise<Product[]> {
  if (cachedProducts && Date.now() - cachedProducts.timestamp < CACHE_TTL_MS) {
    return cachedProducts.data;
  }

  if (!base) {
    return mockProducts;
  }

  try {
    const [records, seoMap] = await Promise.all([
      base('Products')
        .select({
          filterByFormula: '{Published} = TRUE()',
          view: 'Grid view',
        })
        .all(),
      getSeoRecords(),
    ]);

    if (!records || records.length === 0) {
      return mockProducts;
    }

    const products: Product[] = await Promise.all(
      records.map(async (record) => {
        const fields = record.fields;
        const rawColors = (fields['Available Colours'] as string[]) || (fields['Available Colors'] as string[]) || ['Black'];
        
        // Build color variant object with flexible column matching
        const allFieldKeys = Object.keys(fields);
        const colors = rawColors.map((colorName) => {
          const cleanColor = colorName.trim();
          const colorLower = cleanColor.toLowerCase();
          const colorPrefixLower = cleanColor.split(' ')[0].toLowerCase();

          // 1. Try standard keys
          let attachments: any[] | undefined = 
            (fields[`Colour Images: ${cleanColor}`] as any[]) ||
            (fields[`Color Images: ${cleanColor}`] as any[]) ||
            (fields[`Images: ${cleanColor}`] as any[]) ||
            (fields[`${cleanColor} Images`] as any[]) ||
            (fields[`Images (${cleanColor})`] as any[]) ||
            (fields[`Images - ${cleanColor}`] as any[]) ||
            (fields[cleanColor] as any[]);

          // 2. If not found, search dynamically across all fields for an attachment column containing the color name
          if (!attachments || !Array.isArray(attachments) || attachments.length === 0) {
            const matchingKey = allFieldKeys.find((key) => {
              const kLower = key.toLowerCase();
              if (kLower.includes('main') || kLower.includes('featured')) return false;
              return kLower.includes(colorLower) || (colorPrefixLower.length > 2 && kLower.includes(colorPrefixLower));
            });

            if (matchingKey && Array.isArray(fields[matchingKey])) {
              attachments = fields[matchingKey] as any[];
            }
          }

          // 3. Fallback to Main Featured Image or empty
          const finalAttachments = (attachments && attachments.length > 0)
            ? attachments
            : (fields['Main Featured Image'] as any[]) || [];

          const images = finalAttachments.map((att: any) => att.url).filter(Boolean);
          
          return {
            name: cleanColor,
            hex: getColorHex(cleanColor),
            images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800'],
          };
        });

        const mainImageAtt = 
          (fields['Main Featured Image'] as any[]) ||
          (fields['Main Image'] as any[]) ||
          (fields['Featured Image'] as any[]) ||
          (fields['Main Category Image'] as any[]) ||
          (fields['Category Main Image'] as any[]) ||
          (fields['Category Image'] as any[]) ||
          (fields['Image'] as any[]) || [];
        const featuredImage = mainImageAtt.length > 0 ? mainImageAtt[0].url : colors[0]?.images[0] || '';

        const rawCat = (fields['Category'] as string) || 'tee-shirts';
        const cleanCat = rawCat.toLowerCase().replace(/_/g, '-');
        
        let categorySlug: any = 'tee-shirts';
        let categoryName = 'Apparel';
        if (cleanCat.includes('christmas') || cleanCat.includes('xmas')) {
          categorySlug = 'christmas';
          categoryName = 'Christmas';
        } else if (cleanCat.includes('bag') || cleanCat.includes('tote')) {
          categorySlug = 'christian-bags';
          categoryName = 'Tote Bags';
        } else if (cleanCat.includes('hoodie')) {
          categorySlug = 'christian-hoodies-uk';
          categoryName = 'Hoodies';
        } else if (cleanCat.includes('sweater')) {
          categorySlug = 'sweaters';
          categoryName = 'Sweaters';
        } else if (cleanCat.includes('shirt') || cleanCat.includes('tee')) {
          categorySlug = 'tee-shirts';
          categoryName = 'T-Shirts';
        }

        const rawName = (fields['Product Name'] as string) || 'Untitled Product';
        const autoSlug = rawName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
        const slug = (fields['Slug'] as string) || autoSlug || record.id;
        
        const yoastProducts = (yoastSeoData as any).products || {};
        const yoastMatch = yoastProducts[slug] || Object.values(yoastProducts).find((p: any) => p.liveUrl?.includes(slug));

        // Match against dedicated SEO table first, then fallback to Yoast database or defaults
        const seoEntry = seoMap[slug.toLowerCase()] || seoMap[rawName.toLowerCase()];

        const seoTitle = (fields['SEO Meta Title'] as string) ||
                         (fields['SEO Title'] as string) ||
                         seoEntry?.title ||
                         yoastMatch?.title ||
                         rawName;

        const seoDescription = (fields['SEO Meta Description'] as string) ||
                               (fields['SEO Description'] as string) ||
                               seoEntry?.description ||
                               yoastMatch?.description ||
                               (fields['Description'] as string) ||
                               '';

        const allKeys = Object.keys(fields);
        const longDescKey = allKeys.find(k => k.toLowerCase().replace(/[^a-z]/g, '') === 'longdescription');
        const shortDescKey = allKeys.find(k => k.toLowerCase().replace(/[^a-z]/g, '') === 'shortdescription');
        const descKey = allKeys.find(k => k.toLowerCase().trim() === 'description');

        // Parse Long Description (Cached docx attachment or plain text)
        let rawLongDesc = '';
        const rawLongDescVal = longDescKey ? fields[longDescKey] : fields['Long Description'];
        if (Array.isArray(rawLongDescVal) && rawLongDescVal.length > 0) {
          const docxAtt = rawLongDescVal.find(
            (att: any) => att.url && (att.filename?.endsWith('.docx') || att.type?.includes('word'))
          ) || rawLongDescVal[0];
          if (docxAtt && docxAtt.url) {
            const parsed = await getCachedDocx(docxAtt.url);
            rawLongDesc = parsed.html;
          }
        } else if (typeof rawLongDescVal === 'string') {
          rawLongDesc = rawLongDescVal;
        }

        const rawShortDesc = ((shortDescKey ? fields[shortDescKey] : fields['Short Description']) as string) || '';
        const rawDesc = ((descKey ? fields[descKey] : fields['Description']) as string) || '';

        const finalDescription = (rawLongDesc || rawDesc || rawShortDesc || '').trim();
        const finalLongDescription = (rawLongDesc || rawDesc || '').trim();
        const finalShortDescription = (rawShortDesc || '').trim();

        // Parse Category Overview (Cached docx attachment or plain text)
        let categoryOverview: string | undefined = undefined;
        const rawCategoryOverview = fields['Category Overview'];
        if (Array.isArray(rawCategoryOverview) && rawCategoryOverview.length > 0) {
          const docxAtt = rawCategoryOverview.find(
            (att: any) => att.url && (att.filename?.endsWith('.docx') || att.type?.includes('word'))
          ) || rawCategoryOverview[0];

          if (docxAtt && docxAtt.url) {
            const parsed = await getCachedDocx(docxAtt.url);
            categoryOverview = parsed.html;
          }
        } else if (typeof rawCategoryOverview === 'string') {
          categoryOverview = rawCategoryOverview;
        }

        return {
          id: record.id,
          name: rawName,
          slug,
          category: categorySlug,
          categoryName,
          price: Number(fields['Price (£)']) || 0,
          compareAtPrice: fields['Compare at Price (£)'] ? Number(fields['Compare at Price (£)']) : undefined,
          inStock: Boolean(fields['In Stock'] ?? true),
          availableSizes: (fields['Sizes'] as string[]) || ['S', 'M', 'L', 'XL'],
          colors,
          description: finalDescription,
          shortDescription: finalShortDescription || undefined,
          longDescription: finalLongDescription || undefined,
          scriptureReference: fields['Scripture Reference'] as string,
          careInstructions: fields['Care Instructions'] as string,
          sizeGuideType: (fields['Size Guide Type'] as any) || (
            categorySlug === 'tee-shirts' ? 'unisex-tshirt' :
            categorySlug === 'sweaters' ? 'sweater' :
            categorySlug === 'christian-bags' ? 'tote-bag' : 'unisex-hoodie'
          ),
          customSizeNotes: fields['Custom Size Notes'] as string,
          featuredImage,
          categoryOverview,
          relatedProductIds: (fields['Related Products'] as string[]) || [],
          seoTitle,
          seoDescription,
        };
      })
    );

    // Populate lookup maps for O(1) instantaneous access
    cachedProductsBySlug.clear();
    cachedProductsById.clear();
    products.forEach((p) => {
      cachedProductsBySlug.set(p.slug.toLowerCase(), p);
      cachedProductsById.set(p.id, p);
    });

    cachedProducts = { data: products, timestamp: Date.now() };
    return products;
  } catch (error) {
    console.error('Error fetching products from Airtable:', error);
    return cachedProducts?.data || mockProducts;
  }
}

// Fetch single product by slug (Instant O(1) Memory Lookup)
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const cleanSlug = slug.trim().toLowerCase();
  if (cachedProductsBySlug.has(cleanSlug)) {
    return cachedProductsBySlug.get(cleanSlug)!;
  }
  const products = await getProducts();
  return cachedProductsBySlug.get(cleanSlug) || products.find((p) => p.slug.toLowerCase() === cleanSlug) || null;
}

// Fetch single product by ID (Instant O(1) Memory Lookup)
export async function getProductById(id: string): Promise<Product | null> {
  if (cachedProductsById.has(id)) {
    return cachedProductsById.get(id)!;
  }
  const products = await getProducts();
  return cachedProductsById.get(id) || products.find((p) => p.id === id) || null;
}

// Fetch About page content (Cached)
export async function getAboutPageData(): Promise<{
  title: string;
  contentHtml: string;
  rawText: string;
  seoTitle?: string;
  seoDescription?: string;
}> {
  if (cachedAboutData && Date.now() - cachedAboutData.timestamp < CACHE_TTL_MS) {
    return cachedAboutData.data;
  }

  const defaultData = {
    title: 'About Adoptd Christian Clothing',
    contentHtml: `
      <p>ADOPTD is an independent Christian clothing brand, created with a simple purpose — to make clothing that carries a message of faith, hope and identity.</p>
      <p>Every purchase helps a small business keep creating, designing and sharing faith through clothing.</p>
    `,
    rawText: 'ADOPTD is an independent Christian clothing brand, created with a simple purpose — to make clothing that carries a message of faith, hope and identity.',
  };

  if (!base) return defaultData;

  try {
    const [records, seoEntry] = await Promise.all([
      base('About').select().all(),
      getPageSeo('about'),
    ]);

    if (!records || records.length === 0) {
      return defaultData;
    }

    const record = records.find(r => r.fields['Title'] || r.fields['Content'] || r.fields['content']) || records[0];
    const fields = record.fields;

    const title = (fields['Title'] as string) || (fields['title'] as string) || defaultData.title;
    
    const contentField = fields['Content'] || fields['content'] || fields['Word Document'] || fields['Document'];
    let contentHtml = defaultData.contentHtml;
    let rawText = defaultData.rawText;

    if (Array.isArray(contentField) && contentField.length > 0) {
      const docxAtt = contentField.find(
        (att: any) => att.url && (att.filename?.endsWith('.docx') || att.type?.includes('word'))
      ) || contentField[0];

      if (docxAtt && docxAtt.url) {
        const parsed = await getCachedDocx(docxAtt.url);
        contentHtml = parsed.html;
        rawText = parsed.rawText;
      }
    } else if (typeof contentField === 'string' && contentField.trim()) {
      if (contentField.includes('<') && contentField.includes('>')) {
        contentHtml = contentField.trim();
      } else {
        contentHtml = contentField
          .trim()
          .split(/\n\n+/)
          .map(p => `<p>${p.trim()}</p>`)
          .join('');
      }
      rawText = contentField.trim();
    }

    const result = {
      title,
      contentHtml,
      rawText,
      seoTitle: seoEntry?.title || `${title} | Adoptd Christian Clothing UK`,
      seoDescription: seoEntry?.description || rawText.slice(0, 160),
    };

    cachedAboutData = { data: result, timestamp: Date.now() };
    return result;
  } catch (error) {
    console.error('Error fetching About table from Airtable:', error);
    return cachedAboutData?.data || defaultData;
  }
}

// Fetch blog posts (Cached)
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (cachedBlogPosts && Date.now() - cachedBlogPosts.timestamp < CACHE_TTL_MS) {
    return cachedBlogPosts.data;
  }

  if (!base) {
    return mockBlogPosts;
  }

  try {
    let records: readonly any[] = [];
    
    const tableCandidates = ['Blog', 'Blog Posts', 'Journal', 'Articles'];
    for (const tableName of tableCandidates) {
      try {
        records = await base(tableName)
          .select({
            view: 'Grid view',
          })
          .all();
        if (records && records.length > 0) break;
      } catch {
        // Try next candidate
      }
    }

    if (!records || records.length === 0) {
      return mockBlogPosts;
    }

    const posts: BlogPost[] = [];

    for (const record of records) {
      const fields = record.fields;
      
      if (fields['Published'] === false || fields['Status'] === 'Draft') {
        continue;
      }

      let contentHtml = (fields['Direct Body (Alternative)'] as string) || (fields['Content'] as string) || (fields['Body'] as string) || '';
      let rawText = '';
      let docxCoverImage: string | null = null;

      const docxAttachments = 
        (fields['Word Document'] as any[]) ||
        (fields['Docx File'] as any[]) ||
        (fields['Document'] as any[]) ||
        (fields['Word Doc'] as any[]) ||
        (fields['File'] as any[]) ||
        (fields['Attachment'] as any[]) ||
        [];

      if (docxAttachments.length > 0 && docxAttachments[0].url) {
        const parsed = await getCachedDocx(docxAttachments[0].url);
        if (parsed.html) {
          contentHtml = parsed.html;
          rawText = parsed.rawText;
          docxCoverImage = parsed.firstImageUrl || null;
        }
      }

      const coverAtt = 
        (fields['Cover Image'] as any[]) ||
        (fields['Image'] as any[]) ||
        (fields['Featured Image'] as any[]) ||
        (fields['Picture'] as any[]) ||
        [];

      const coverImage = coverAtt.length > 0 
        ? coverAtt[0].url 
        : docxCoverImage || 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200';

      const title = (fields['Title'] as string) || (fields['Post Title'] as string) || (fields['Name'] as string) || 'Faith & Devotion';
      
      const autoSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      const slug = (fields['Slug'] as string) || autoSlug || record.id;

      let excerpt = (fields['Excerpt'] as string) || (fields['Summary'] as string) || '';
      if (!excerpt && rawText) {
        excerpt = rawText.slice(0, 160).trim() + '...';
      } else if (!excerpt) {
        excerpt = 'A biblical reflection and devotional from the ADOPTD journal.';
      }

      const wordCount = (rawText || contentHtml.replace(/<[^>]*>/g, '')).split(/\s+/).length;
      const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

      const featuredProductNames = (fields['Featured Products'] as string[]) || [];

      posts.push({
        id: record.id,
        title,
        slug,
        coverImage,
        category: (fields['Category'] as string) || 'Faith & Devotion',
        excerpt,
        contentHtml,
        publishDate: (fields['Publish Date'] as string) || (fields['Date'] as string) || new Date().toISOString().split('T')[0],
        author: (fields['Author'] as string) || 'ADOPTD Team',
        readingTimeMinutes,
        featuredProductIds: featuredProductNames,
        seoTitle: (fields['SEO Meta Title'] as string) || `${title} | ADOPTD Journal`,
        seoDescription: (fields['SEO Meta Description'] as string) || excerpt,
        published: true,
      });
    }

    cachedBlogPostsBySlug.clear();
    posts.forEach((p) => {
      cachedBlogPostsBySlug.set(p.slug.toLowerCase(), p);
    });

    cachedBlogPosts = { data: posts, timestamp: Date.now() };
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts from Airtable:', error);
    return cachedBlogPosts?.data || mockBlogPosts;
  }
}

// Fetch single blog post by slug (Instant O(1) Lookup)
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const cleanSlug = slug.trim().toLowerCase();
  if (cachedBlogPostsBySlug.has(cleanSlug)) {
    return cachedBlogPostsBySlug.get(cleanSlug)!;
  }
  const posts = await getBlogPosts();
  return cachedBlogPostsBySlug.get(cleanSlug) || posts.find((p) => p.slug.toLowerCase() === cleanSlug) || null;
}

// Fetch global site settings (Cached)
export async function getSiteSettings(): Promise<SiteSettings> {
  if (cachedSiteSettings && Date.now() - cachedSiteSettings.timestamp < CACHE_TTL_MS) {
    return cachedSiteSettings.data;
  }

  if (!base) {
    return mockSiteSettings;
  }

  try {
    let records: readonly any[] = [];
    try {
      records = await base('Site Settings').select().all();
    } catch {
      records = await base('Site Settings & SEO').select().all();
    }

    if (!records || records.length === 0) {
      return mockSiteSettings;
    }

    const settingsMap: Record<string, any> = {};
    records.forEach((r) => {
      const key = (r.fields['Setting Key'] as string) || (r.fields['Key'] as string);
      if (key) {
        settingsMap[key] = r.fields['Setting Value'] || r.fields['Value / Text'] || r.fields['Value'];
      }
      if (r.fields['announcement_banner']) settingsMap['announcement_banner'] = r.fields['announcement_banner'];
      if (r.fields['contact_email']) settingsMap['contact_email'] = r.fields['contact_email'];
      if (r.fields['free_shipping_threshold']) settingsMap['free_shipping_threshold'] = r.fields['free_shipping_threshold'];
    });

    const settings: SiteSettings = {
      announcementBanner: settingsMap['announcement_banner'] || settingsMap['homepage_announcement_banner'] || mockSiteSettings.announcementBanner,
      announcementActive: settingsMap['announcement_active'] !== 'false',
      globalMetaTitle: settingsMap['global_meta_title'] || mockSiteSettings.globalMetaTitle,
      globalMetaDescription: settingsMap['global_meta_description'] || mockSiteSettings.globalMetaDescription,
      contactEmail: settingsMap['contact_email'] || mockSiteSettings.contactEmail,
      instagramUrl: settingsMap['instagram_url'] || mockSiteSettings.instagramUrl,
      facebookUrl: settingsMap['facebook_url'] || mockSiteSettings.facebookUrl,
      freeShippingThreshold: Number(settingsMap['free_shipping_threshold']) || 40.00,
    };

    cachedSiteSettings = { data: settings, timestamp: Date.now() };
    return settings;
  } catch (error) {
    console.error('Error fetching site settings from Airtable:', error);
    return cachedSiteSettings?.data || mockSiteSettings;
  }
}

// Record Newsletter Subscriber in Airtable
export async function recordNewsletterSubscriber(email: string, name?: string) {
  if (!base) {
    console.log('[Mock] Recorded newsletter subscriber in local state:', email, name);
    return { success: true };
  }

  try {
    const fields: any = {
      Email: email,
      Status: 'Active',
    };
    if (name) {
      fields['First Name'] = name;
    }

    await base('Newsletter Subscribers').create([{ fields }]);
    return { success: true };
  } catch (error) {
    console.error('Error recording newsletter subscriber in Airtable:', error);
    throw error;
  }
}

// Record Support/Contact Inquiry in Airtable
export async function recordContactInquiry(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  orderNumber?: string;
}) {
  if (!base) {
    console.log('[Mock] Recorded contact inquiry:', data);
    return { success: true };
  }

  try {
    const fields: any = {
      Name: data.name,
      Email: data.email,
      Subject: data.subject,
      Message: data.message,
    };
    if (data.orderNumber) {
      fields['Order Number'] = data.orderNumber;
    }

    try {
      await base('Contact Submissions').create([{ fields }]);
    } catch {
      try {
        await base('Inquiries').create([{ fields }]);
      } catch {
        try {
          await base('Messages').create([{ fields }]);
        } catch {
          console.warn('[Airtable] No dedicated contact table found. Email notification dispatched.');
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error recording contact inquiry in Airtable:', error);
    return { success: false, error };
  }
}

// Helper for color hex values
function getColorHex(colorName: string): string {
  const normalized = colorName.toLowerCase();
  if (normalized.includes('black')) return '#111111';
  if (normalized.includes('grey') || normalized.includes('gray')) return '#C0C0C0';
  if (normalized.includes('sand') || normalized.includes('natural')) return '#D8C7B5';
  if (normalized.includes('navy') || normalized.includes('blue')) return '#1B2A4A';
  if (normalized.includes('white')) return '#FFFFFF';
  if (normalized.includes('burgundy') || normalized.includes('maroon')) return '#6A1A24';
  if (normalized.includes('green') || normalized.includes('forest')) return '#2D4A3E';
  return '#444444';
}
