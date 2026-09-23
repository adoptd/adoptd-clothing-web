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

  return constructMetadata({
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.description.slice(0, 150),
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

  return (
    <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 py-12">
      {/* Inject Google Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </div>
  );
}
