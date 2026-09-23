import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/airtable';
import { ProductCard } from '@/components/product/ProductCard';
import { constructMetadata } from '@/lib/seo';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const categoryInfoMap: Record<string, { title: string; subtitle: string; description: string }> = {
  'tee-shirts': {
    title: 'Christian T-Shirts',
    subtitle: 'Classic Tees & Faith Statements',
    description: '100% soft organic cotton Christian t-shirts crafted in the UK with minimalist faith designs.',
  },
  'christian-hoodies-uk': {
    title: 'Christian Hoodies UK',
    subtitle: 'Heavyweight Faith Hoodies',
    description: 'Premium heavyweight unisex Christian hoodies carrying bold scripture declarations and gospel truth.',
  },
  'sweaters': {
    title: 'Christian Sweaters & Crewnecks',
    subtitle: 'Warm Layering & Streetwear Cuts',
    description: 'Cozy fleece-lined Christian crewneck sweatshirts designed for comfort and testimony.',
  },
  'christian-bags': {
    title: 'Christian Tote Bags',
    subtitle: 'Everyday Canvas Faith Accessories',
    description: 'Durable 100% natural organic cotton Christian tote bags for Bibles, study books, and daily life.',
  },
};

export async function generateStaticParams() {
  return [
    { category: 'tee-shirts' },
    { category: 'christian-hoodies-uk' },
    { category: 'sweaters' },
    { category: 'christian-bags' },
  ];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const info = categoryInfoMap[category] || {
    title: `${category.replace(/-/g, ' ')}`,
    description: 'Shop Christian clothing and apparel.',
  };

  return constructMetadata({
    title: `${info.title} | Adoptd Christian Clothing UK`,
    description: info.description,
    slug: `shop/${category}`,
  });
}

export const revalidate = 60;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const allProducts = await getProducts();
  const products = allProducts.filter((p) => p.category === category);
  const info = categoryInfoMap[category];

  const categories = [
    { name: 'All Products', slug: 'all', href: '/shop' },
    { name: 'T-Shirts', slug: 'tee-shirts', href: '/shop/tee-shirts' },
    { name: 'Hoodies', slug: 'christian-hoodies-uk', href: '/shop/christian-hoodies-uk' },
    { name: 'Sweaters', slug: 'sweaters', href: '/shop/sweaters' },
    { name: 'Tote Bags', slug: 'christian-bags', href: '/shop/christian-bags' },
  ];

  return (
    <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
          {info?.subtitle || 'Collection'}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
          {info?.title || category.replace(/-/g, ' ')}
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          {info?.description || 'Browse our faith-centred pieces.'}
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-b border-stone-200 pb-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.href}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition ${
              cat.slug === category
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200 p-8">
          <p className="text-stone-600 text-sm mb-4">No products currently in this collection.</p>
          <Link
            href="/shop"
            className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
          >
            Browse All Items
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
