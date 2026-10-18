import { Metadata } from 'next';
import { Product, BlogPost, SiteSettings } from '@/types';
import { mockSiteSettings } from '@/data/mockData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adoptdchristianclothing.co.uk';
const organizationName = 'Adoptd Christian Clothing';

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
    ? (/adoptd/i.test(title) ? title : `${title} | Adoptd Christian Clothing`)
    : mockSiteSettings.globalMetaTitle;

  const fullDescription = description || mockSiteSettings.globalMetaDescription;
  const canonicalUrl = `${siteUrl}/${slug.replace(/^\//, '')}`;
  const ogImage = image || `${siteUrl}/images/hero-banner.webp`;

  return {
    title: fullTitle,
    description: fullDescription,
    icons: {
      icon: '/images/logo.png',
      shortcut: '/images/logo.png',
      apple: '/images/logo.png',
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl,
      siteName: organizationName,
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
    verification: {
      google: '0-4_yYX1Phctphb1rGYCzPDddXcjEJzILNViXbufdh4',
    },
  };
}

function absoluteImageUrl(image: string): string {
  try {
    return new URL(image, siteUrl).toString();
  } catch {
    return image;
  }
}

// Sitewide Organization schema. Optional contact/social fields are only emitted when configured.
export function generateOrganizationJsonLd(settings?: SiteSettings) {
  const sameAs = [
    settings?.facebookUrl || 'https://www.facebook.com/adoptdclothing25/',
    settings?.instagramUrl || 'https://www.instagram.com/adoptdchristian',
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: organizationName,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/logo.png`,
    },
    sameAs,
    ...(settings?.contactEmail
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: settings.contactEmail,
            availableLanguage: 'English',
          },
        }
      : {}),
  };
}

// Generate JSON-LD Schema for Product and its Offer.
export function generateProductJsonLd(product: Product) {
  const images = Array.from(
    new Set(
      [product.featuredImage, ...product.colors.flatMap((color) => color.images)]
        .filter(Boolean)
        .map(absoluteImageUrl)
    )
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${siteUrl}/product/${product.slug}#product`,
    name: product.name,
    description: (product.shortDescription || product.description || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
    image: images.length ? images : [`${siteUrl}/images/hero-banner.webp`],
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: organizationName,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/product/${product.slug}`,
      priceCurrency: 'GBP',
      price: product.price.toFixed(2),
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: organizationName,
      },
    },
  };
}

// Generate JSON-LD Schema for Blog Article.
export function generateArticleJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: absoluteImageUrl(post.coverImage),
    datePublished: post.publishDate,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: organizationName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };
}
