import Airtable from 'airtable';
import { Product, BlogPost, SiteSettings } from '@/types';
import { mockProducts, mockBlogPosts, mockSiteSettings } from '@/data/mockData';
import { parseDocxBuffer } from './docx-parser';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;

const base = apiKey && baseId ? new Airtable({ apiKey }).base(baseId) : null;

// Fetch all active products
export async function getProducts(): Promise<Product[]> {
  if (!base) {
    return mockProducts;
  }

  try {
    const records = await base('Products')
      .select({
        filterByFormula: '{Published} = TRUE()',
        view: 'Grid view',
      })
      .all();

    if (!records || records.length === 0) {
      return mockProducts;
    }

    return records.map((record) => {
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
            // Don't match the main image column accidentally
            if (kLower.includes('main') || kLower.includes('featured')) return false;
            // Check if column name contains full color name or color prefix
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

      const mainImageAtt = (fields['Main Featured Image'] as any[]) || [];
      const featuredImage = mainImageAtt.length > 0 ? mainImageAtt[0].url : colors[0]?.images[0] || '';

      const rawCat = (fields['Category'] as string) || 'tee-shirts';
      const cleanCat = rawCat.toLowerCase().replace(/_/g, '-');
      
      let categorySlug: any = 'tee-shirts';
      let categoryName = 'Apparel';
      if (cleanCat.includes('bag') || cleanCat.includes('tote')) {
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

      return {
        id: record.id,
        name: (fields['Product Name'] as string) || 'Untitled Product',
        slug: (fields['Slug'] as string) || record.id,
        category: categorySlug,
        categoryName,
        price: Number(fields['Price (£)']) || 0,
        compareAtPrice: fields['Compare at Price (£)'] ? Number(fields['Compare at Price (£)']) : undefined,
        inStock: Boolean(fields['In Stock'] ?? true),
        availableSizes: (fields['Sizes'] as string[]) || ['S', 'M', 'L', 'XL'],
        colors,
        description: (fields['Description'] as string) || '',
        scriptureReference: fields['Scripture Reference'] as string,
        careInstructions: fields['Care Instructions'] as string,
        sizeGuideType: (fields['Size Guide Type'] as any) || 'unisex-hoodie',
        customSizeNotes: fields['Custom Size Notes'] as string,
        featuredImage,
        relatedProductIds: (fields['Related Products'] as string[]) || [],
        seoTitle: fields['SEO Meta Title'] as string,
        seoDescription: fields['SEO Meta Description'] as string,
      };
    });
  } catch (error) {
    console.error('Error fetching products from Airtable:', error);
    return mockProducts;
  }
}

// Fetch single product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

// Fetch blog posts (including .docx parsing)
export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!base) {
    return mockBlogPosts;
  }

  try {
    const records = await base('Blog Posts')
      .select({
        filterByFormula: '{Published} = TRUE()',
        sort: [{ field: 'Publish Date', direction: 'desc' }],
      })
      .all();

    if (!records || records.length === 0) {
      return mockBlogPosts;
    }

    const posts: BlogPost[] = [];

    for (const record of records) {
      const fields = record.fields;
      let contentHtml = (fields['Direct Body (Alternative)'] as string) || '';

      // If a .docx file is attached, parse it!
      const docxAttachments = (fields['Docx File'] as any[]) || [];
      if (docxAttachments.length > 0 && docxAttachments[0].url) {
        try {
          const res = await fetch(docxAttachments[0].url);
          const arrayBuffer = await res.arrayBuffer();
          const parsed = await parseDocxBuffer(Buffer.from(arrayBuffer));
          if (parsed.html) {
            contentHtml = parsed.html;
          }
        } catch (docxErr) {
          console.error('Error downloading/parsing attached .docx from Airtable:', docxErr);
        }
      }

      const coverAtt = (fields['Cover Image'] as any[]) || [];
      const coverImage = coverAtt.length > 0 ? coverAtt[0].url : 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200';

      posts.push({
        id: record.id,
        title: (fields['Title'] as string) || 'Untitled Post',
        slug: (fields['Slug'] as string) || record.id,
        coverImage,
        category: (fields['Category'] as string) || 'Devotionals',
        excerpt: (fields['Excerpt'] as string) || '',
        contentHtml,
        publishDate: (fields['Publish Date'] as string) || new Date().toISOString().split('T')[0],
        author: (fields['Author'] as string) || 'Adoptd Team',
        readingTimeMinutes: Math.max(1, Math.ceil((contentHtml.length || 500) / 1000)),
        featuredProductIds: (fields['Featured Products'] as string[]) || [],
        seoTitle: fields['SEO Meta Title'] as string,
        seoDescription: fields['SEO Meta Description'] as string,
        published: true,
      });
    }

    return posts;
  } catch (error) {
    console.error('Error fetching blog posts from Airtable:', error);
    return mockBlogPosts;
  }
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

// Fetch site settings
export async function getSiteSettings(): Promise<SiteSettings> {
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

    return {
      announcementBanner: settingsMap['announcement_banner'] || settingsMap['homepage_announcement_banner'] || mockSiteSettings.announcementBanner,
      announcementActive: settingsMap['announcement_active'] !== 'false',
      globalMetaTitle: settingsMap['global_meta_title'] || mockSiteSettings.globalMetaTitle,
      globalMetaDescription: settingsMap['global_meta_description'] || mockSiteSettings.globalMetaDescription,
      contactEmail: settingsMap['contact_email'] || mockSiteSettings.contactEmail,
      instagramUrl: settingsMap['instagram_url'] || mockSiteSettings.instagramUrl,
      facebookUrl: settingsMap['facebook_url'] || mockSiteSettings.facebookUrl,
      freeShippingThreshold: Number(settingsMap['free_shipping_threshold']) || 40.00,
    };
  } catch (error) {
    console.error('Error fetching site settings from Airtable:', error);
    return mockSiteSettings;
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
