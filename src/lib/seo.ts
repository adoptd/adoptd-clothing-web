import { Metadata } from 'next';
import { Product, BlogPost, SiteSettings } from '@/types';
import { mockSiteSettings } from '@/data/mockData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adoptdchristianclothing.co.uk';

export function constructMetadata({
  title,
  description,
  image,
  slug = '',
}: {
  title?: string;
  description?: string;
  image?: string;
  slug?: string;
}): Metadata {
  const fullTitle = title 
    ? `${title} | Adoptd Christian Clothing`
    : mockSiteSettings.globalMetaTitle;
  
  const fullDescription = description || mockSiteSettings.globalMetaDescription;
  const canonicalUrl = `${siteUrl}/${slug.replace(/^\//, '')}`;
  const ogImage = image || `${siteUrl}/og-image.jpg`;

  return {
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl,
      siteName: 'Adoptd Christian Clothing',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Generate JSON-LD Schema for Product
export function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.featuredImage,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Adoptd Christian Clothing',
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/product/${product.slug}`,
      priceCurrency: 'GBP',
      price: product.price.toFixed(2),
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Adoptd Christian Clothing',
      },
    },
  };
}

// Generate JSON-LD Schema for Blog Article
export function generateArticleJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishDate,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Adoptd Christian Clothing',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };
}
