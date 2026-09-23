import { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adoptdchristianclothing.co.uk';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/checkout/success', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
