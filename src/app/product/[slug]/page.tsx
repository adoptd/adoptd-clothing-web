import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/airtable';
import { constructMetadata, generateProductJsonLd } from '@/lib/seo';
import { ProductDetailClient } from '@/components/product/ProductDetailClient';
import { Metadata } from 'next';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return constructMetadata({ title: 'Product Not Found' });
  }

  const rawDescription = product.seoDescription || product.shortDescription || product.description;
  const cleanDescription = rawDescription
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
  const metaDescription = cleanDescription.length <= 155
    ? cleanDescription
    : (cleanDescription.slice(0, 152).replace(/\s+\S*$/, '').trimEnd() + '...');

  return constructMetadata({
    title: product.seoTitle || product.name,
    description: metaDescription,
    image: product.featuredImage,
    slug: `product/${product.slug}`,
  });
}

export const revalidate = 60;

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(
    (p) =>
      p.id !== product.id &&
      (product.relatedProductIds?.includes(p.id) || p.category === product.category)
  ).slice(0, 3);

  const jsonLd = generateProductJsonLd(product);
  // Escape "<" to prevent product data from terminating the JSON-LD script element.
  const jsonLdString = JSON.stringify(jsonLd).replace(/</g, '\\u003c');

  return (
    <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 py-12">
      {/* Inject Google Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </div>
  );
}
