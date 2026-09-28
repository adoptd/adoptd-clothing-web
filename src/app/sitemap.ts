import { MetadataRoute } from 'next';
import { getProducts, getBlogPosts } from '@/lib/airtable';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adoptdchristianclothing.co.uk';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([
    getProducts(),
    getBlogPosts(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop/tee-shirts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop/christian-hoodies-uk`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop/christian-bags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop/christmas`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/church-print-services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.publishDate || Date.now()),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
