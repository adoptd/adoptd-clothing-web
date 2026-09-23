import React from 'react';
import Link from 'next/link';
import { getProducts, getBlogPosts } from '@/lib/airtable';
import { constructMetadata } from '@/lib/seo';
import { Map, ShoppingBag, BookOpen, Layers, ShieldCheck, FileCode, ArrowRight } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Website Sitemap | Adoptd Christian Clothing UK',
  description: 'Explore our complete website sitemap. Quick access to all Christian apparel, hoodies, t-shirts, devotionals, and ministry print services.',
  slug: 'sitemap',
});

export const revalidate = 60;

export default async function SitemapPage() {
  const [products, posts] = await Promise.all([
    getProducts(),
    getBlogPosts(),
  ]);

  const categories = [
    { name: 'All Products', href: '/shop' },
    { name: 'Christian T-Shirts', href: '/shop/tee-shirts' },
    { name: 'Christian Hoodies UK', href: '/shop/christian-hoodies-uk' },
    { name: 'Sweaters & Crewnecks', href: '/shop/sweaters' },
    { name: 'Christian Tote Bags', href: '/shop/christian-bags' },
  ];

  const mainPages = [
    { name: 'Home', href: '/' },
    { name: 'Church & Ministry Print Services', href: '/church-print-services' },
    { name: 'The Adoptd Journal (Blog)', href: '/blog' },
    { name: 'Privacy Policy & GDPR Compliance', href: '/privacy-policy' },
    { name: 'XML Search Engine Sitemap', href: '/sitemap.xml', external: true },
  ];

  return (
    <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-stone-100 text-stone-800 px-4 py-1.5 rounded-full text-xs font-semibold">
          <Map className="w-4 h-4 text-[#00736a]" />
          <span>Site Directory & Navigation</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-stone-950">
          Website Sitemap
        </h1>
        <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
          Quick directory index to easily navigate every collection, faith apparel item, ministry service, and article across our website.
        </p>
      </div>

      {/* Main Grid Directory */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* 1. Main Pages */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <div className="flex items-center space-x-3 text-[#00736a] border-b border-stone-100 pb-4">
            <Layers className="w-6 h-6" />
            <h2 className="font-serif text-xl font-bold text-stone-950">Main Pages</h2>
          </div>
          <ul className="space-y-3 text-base text-stone-700 font-medium">
            {mainPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="hover:text-[#00736a] transition flex items-center justify-between group"
                >
                  <span>{page.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#00736a]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. Shop Categories */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <div className="flex items-center space-x-3 text-[#00736a] border-b border-stone-100 pb-4">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="font-serif text-xl font-bold text-stone-950">Apparel Collections</h2>
          </div>
          <ul className="space-y-3 text-base text-stone-700 font-medium">
            {categories.map((cat) => (
              <li key={cat.href}>
                <Link
                  href={cat.href}
                  className="hover:text-[#00736a] transition flex items-center justify-between group"
                >
                  <span>{cat.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#00736a]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Journal & Articles */}
        <div className="bg-white border border-stone-200 rounded-2xl p-8 space-y-6 shadow-sm md:col-span-2">
          <div className="flex items-center space-x-3 text-[#00736a] border-b border-stone-100 pb-4">
            <BookOpen className="w-6 h-6" />
            <h2 className="font-serif text-xl font-bold text-stone-950">The Adoptd Journal</h2>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-base text-stone-700 font-medium">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-[#00736a] transition flex items-center justify-between group py-1"
                >
                  <span className="line-clamp-1">{post.title}</span>
                  <ArrowRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#00736a]" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Complete Product Catalog Section */}
      <div className="bg-stone-50 border border-stone-200 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="border-b border-stone-200 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950">
              Complete Apparel Catalog ({products.length} Products)
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Direct links to all live scripture hoodies, tees, and tote bags.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-stone-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-800 transition"
          >
            <span>Browse Storefront</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm font-medium text-stone-800">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#00736a] hover:text-[#00736a] transition shadow-xs flex items-center justify-between group"
            >
              <span className="line-clamp-1">{p.name}</span>
              <span className="text-xs font-bold text-stone-900 group-hover:text-[#00736a] pl-2 flex-shrink-0">
                £{p.price.toFixed(2)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Search Engine XML Callout */}
      <div className="p-6 bg-white border border-stone-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-600">
        <div className="flex items-center space-x-3">
          <FileCode className="w-5 h-5 text-[#00736a]" />
          <span>Looking for raw machine-readable search engine data?</span>
        </div>
        <a
          href="/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00736a] font-bold hover:underline inline-flex items-center space-x-1"
        >
          <span>View XML Sitemap</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
