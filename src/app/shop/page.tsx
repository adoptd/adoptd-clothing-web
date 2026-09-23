import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/airtable';
import { ProductCard } from '@/components/product/ProductCard';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Shop All Christian Clothing & Apparel',
  description: 'Explore our full collection of faith-based hoodies, t-shirts, sweaters, and tote bags designed in the UK.',
  slug: 'shop',
});

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getProducts();

  const categories = [
    { name: 'All Products', slug: 'all', href: '/shop' },
    { name: 'T-Shirts', slug: 'tee-shirts', href: '/shop/tee-shirts' },
    { name: 'Hoodies', slug: 'christian-hoodies-uk', href: '/shop/christian-hoodies-uk' },
    { name: 'Sweaters', slug: 'sweaters', href: '/shop/sweaters' },
    { name: 'Tote Bags', slug: 'christian-bags', href: '/shop/christian-bags' },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-2 sm:px-3 lg:px-4 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
          ADOPTD Store
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
          All Christian Apparel & Accessories
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed">
          Ethically sourced, thoughtfully designed apparel carrying scripture and gospel hope for daily life.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-b border-stone-200 pb-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.href}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition ${
              cat.slug === 'all'
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
