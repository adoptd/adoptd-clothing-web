import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Heart, Church, ShieldCheck } from 'lucide-react';
import { getProducts, getSiteSettings, getBlogPosts } from '@/lib/airtable';
import { ProductCard } from '@/components/product/ProductCard';

export const revalidate = 60; // Refresh data every 60 seconds from Airtable

export default async function HomePage() {
  const [products, settings, blogPosts] = await Promise.all([
    getProducts(),
    getSiteSettings(),
    getBlogPosts(),
  ]);

  const featuredProducts = products.slice(0, 4);
  const categories = [
    {
      name: 'T-Shirts',
      slug: 'tee-shirts',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      description: 'Clean typography & organic cotton',
    },
    {
      name: 'Hoodies',
      slug: 'christian-hoodies-uk',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      description: 'Heavyweight warmth with scripture truth',
    },
    {
      name: 'Sweaters',
      slug: 'sweaters',
      image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80',
      description: 'Cozy fleece-lined streetwear cuts',
    },
    {
      name: 'Tote Bags',
      slug: 'christian-bags',
      image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=800&auto=format&fit=crop&q=80',
      description: '100% durable canvas faith accessories',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&auto=format&fit=crop&q=80"
            alt="Christian Clothing Background"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/60 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-stone-800/80 border border-stone-700/80 px-4 py-1.5 rounded-full text-xs text-stone-300 font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Independent UK Christian Apparel Brand</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Wear The Word. <br className="hidden sm:inline" />
            <span className="text-stone-300">Share The Light.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-lg font-normal leading-relaxed">
            ADOPTD was created with a simple purpose — to make clothing that carries a message of faith, hope and identity. Every purchase helps a small business share Jesus through everyday design.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/shop/christian-hoodies-uk"
              className="w-full sm:w-auto px-8 py-4 bg-white text-stone-950 hover:bg-stone-100 font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Shop Hoodies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop/tee-shirts"
              className="w-full sm:w-auto px-8 py-4 bg-stone-800/90 text-white hover:bg-stone-700/90 border border-stone-600 font-bold text-sm tracking-wider uppercase rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <span>Shop T-Shirts</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop By Category Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
            Collections
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
            Shop By Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-200 block"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <h3 className="font-serif text-xl font-bold uppercase tracking-wider mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-300 opacity-90">{cat.description}</p>
                <div className="mt-3 inline-flex items-center space-x-1.5 text-xs font-semibold text-white group-hover:text-amber-300 transition">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products / Bestsellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 pb-4 border-b border-stone-200">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
              Faith-Centred Apparel
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
              Featured Pieces
            </h2>
          </div>
          <Link
            href="/shop/christian-hoodies-uk"
            className="text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-stone-950 mt-3 sm:mt-0 flex items-center space-x-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Mission Statement */}
      <section className="bg-stone-100 py-16 sm:py-20 border-y border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-stone-900 text-white mx-auto">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
            Christian Clothing That Shares Your Faith
          </h2>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            ADOPTED was created from a simple desire — to share Jesus with the world. I believe clothing can start conversations, provoke questions and offer encouragement in everyday life.
          </p>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Every design has a purpose: to get people thinking, talking and, above all, to point people towards Jesus.
          </p>
          <div className="pt-2">
            <span className="inline-block font-serif text-lg font-semibold text-stone-900 italic">
              "Small brand. Big message. Jesus at the centre."
            </span>
          </div>
        </div>
      </section>

      {/* Church & Ministry Print Services Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-stone-800 px-3 py-1 rounded-full text-xs font-semibold text-stone-300">
              <Church className="w-4 h-4 text-amber-400" />
              <span>For Churches, Worship Teams & Youth Ministries</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Church & Ministry Custom Print Services
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">
              Looking for custom hoodies, t-shirts, or tote bags for your church conference, youth camp, or outreach team? We provide ethical, premium-quality apparel printing tailored to your ministry.
            </p>
          </div>
          <Link
            href="/church-print-services"
            className="flex-shrink-0 px-8 py-4 bg-white text-stone-950 hover:bg-stone-200 font-bold text-sm tracking-wider uppercase rounded-xl transition shadow-lg"
          >
            Learn More & Get A Quote
          </Link>
        </div>
      </section>

      {/* Recent Blog / Devotional Highlights */}
      {blogPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8 pb-4 border-b border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
                From The Blog
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 mt-1">
                Faith & Devotionals
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-stone-950 flex items-center space-x-1"
            >
              <span>Read All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.slice(0, 2).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-stone-400 transition-all shadow-sm hover:shadow-md"
              >
                <div className="sm:w-1/2 relative aspect-video sm:aspect-auto overflow-hidden bg-stone-100 min-h-[180px]">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 sm:w-1/2 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-stone-700 transition line-clamp-2 mt-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-100">
                    <span>{post.publishDate}</span>
                    <span>{post.readingTimeMinutes} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
