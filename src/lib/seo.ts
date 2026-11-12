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
  const ogImage = image ? absoluteImageUrl(image) : `${siteUrl}/images/hero-banner.webp`;

  return {
    metadataBase: new URL(siteUrl),
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

// Sitewide WebSite schema for Google Sitelinks & AI entity linking.
export function generateWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: organizationName,
    url: siteUrl,
    inLanguage: 'en-GB',
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
  };
}

// BreadcrumbList schema for category, product, and journal pages.
export function generateBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path.startsWith('/') ? item.path : `/${item.path}`}`,
    })),
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
    url: `${siteUrl}/product/${product.slug}`,
    category: product.categoryName || 'Christian Clothing',
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
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: product.price >= 40 ? '0.00' : '3.95',
          currency: 'GBP',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'GB',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 3,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 4,
            unitCode: 'DAY',
          },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'GB',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
      },
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
