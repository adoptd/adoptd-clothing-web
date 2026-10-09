import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getProducts } from '@/lib/airtable';
import { ProductCard } from '@/components/product/ProductCard';
import { TestimonialsCarousel } from '@/components/home/TestimonialsCarousel';

export const revalidate = 60;

export default async function HomePage() {
  const products = await getProducts();

  const categoryOrder = ['tee-shirts', 'christian-hoodies-uk', 'christian-bags', 'christmas', 'sweaters'];
  const featuredProducts: typeof products = [];
  const productsByCategory: Record<string, typeof products> = {};

  products.forEach((p) => {
    const cat = p.category || 'tee-shirts';
    if (!productsByCategory[cat]) {
      productsByCategory[cat] = [];
    }
    productsByCategory[cat].push(p);
  });

  let round = 0;
  while (featuredProducts.length < 5 && round < 10) {
    for (const cat of categoryOrder) {
      if (featuredProducts.length >= 5) break;
      const list = productsByCategory[cat];
      if (list && list[round]) {
        featuredProducts.push(list[round]);
      }
    }
    for (const cat in productsByCategory) {
      if (featuredProducts.length >= 5) break;
      if (!categoryOrder.includes(cat)) {
        const list = productsByCategory[cat];
        if (list && list[round]) {
          featuredProducts.push(list[round]);
        }
      }
    }
    round++;
  }

  if (featuredProducts.length < 5) {
    for (const p of products) {
      if (!featuredProducts.some((fp) => fp.id === p.id)) {
        featuredProducts.push(p);
        if (featuredProducts.length >= 5) break;
      }
    }
  }

  const getCategoryImage = (slug: string): string => {
    const categoryProducts = productsByCategory[slug] || [];
    if (categoryProducts.length > 0) {
      return categoryProducts[0].featuredImage || '/images/shop-tshirts-bg.webp';
    }

    const fallbacks: Record<string, string> = {
      'tee-shirts': '/images/shop-tshirts-bg.webp',
      'christian-hoodies-uk': '/images/shop-hoodies-bg.webp',
      'christian-bags': 'https://adoptdchristianclothing.co.uk/wp-content/uploads/2026/09/mockup-of-a-man-with-a-loc-hairstyle-carrying-a-tote-bag-on-his-back-in-a-park-m56958-2-300x300.webp',
      'christmas': '/images/shop-christmas-bg.webp',
    };
    return fallbacks[slug] || '/images/shop-tshirts-bg.webp';
  };

  const categories = [
    {
      name: 'T-SHIRTS',
      slug: 'tee-shirts',
      image: getCategoryImage('tee-shirts'),
    },
    {
      name: 'HOODIES',
      slug: 'christian-hoodies-uk',
      image: getCategoryImage('christian-hoodies-uk'),
    },
    {
      name: 'TOTE BAGS',
      slug: 'christian-bags',
      image: getCategoryImage('christian-bags'),
    },
    {
      name: 'CHRISTMAS',
      slug: 'christmas',
      image: getCategoryImage('christmas'),
    },
  ];

  return (
    <div className="bg-white text-stone-900 space-y-16 sm:space-y-24 pb-0">
      <section className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <div className="flex flex-col gap-6 justify-between">
            <div className="bg-[#efefef] rounded-[24px] p-6 sm:p-10 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-stone-950 leading-tight">
                  SMALL BUSINESS. BIG FAITH.
                </h1>
                <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-normal">
                  ADOPTD is an independent Christian clothing brand, created with a simple purpose — to make clothing that carries a message of faith, hope and identity. Every purchase helps a small[...]
                </p>
                <p className="text-stone-900 text-xs sm:text-sm font-bold">
                  Thank you for choosing to support an independent Christian brand.
                </p>
              </div>

              <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full rounded-[18px] overflow-hidden bg-white shadow-sm">
                <Image
                  src="/images/hero-banner.webp"
                  alt="Adoptd Christian Clothing Collection"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href="/shop/tee-shirts"
                className="group relative rounded-[20px] overflow-hidden aspect-[4/3] sm:aspect-square flex items-end p-6 shadow-sm focus:outline-none"
              >
                <Image
                  src={getCategoryImage('tee-shirts')}
                  alt="Shop Christian T-Shirts"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 w-full flex items-center justify-between">
                  <span className="text-white text-base sm:text-lg font-black uppercase tracking-wider">
                    Shop T-Shirts
                  </span>
                  <span className="p-2 bg-white text-black rounded-full group-hover:bg-[#00736a] group-hover:text-white transition shadow">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>

              <Link
                href="/shop/christian-hoodies-uk"
                className="group relative rounded-[20px] overflow-hidden aspect-[4/3] sm:aspect-square flex items-end p-6 shadow-sm focus:outline-none"
              >
                <Image
                  src={getCategoryImage('christian-hoodies-uk')}
                  alt="Shop Christian Hoodies"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 w-full flex items-center justify-between">
                  <span className="text-white text-base sm:text-lg font-black uppercase tracking-wider">
                    Shop Hoodies
                  </span>
                  <span className="p-2 bg-white text-black rounded-full group-hover:bg-[#00736a] group-hover:text-white transition shadow">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="relative w-full h-full min-h-[420px] sm:min-h-[520px] lg:min-h-full rounded-[24px] overflow-hidden bg-[#efefef] shadow-sm group">
            <Image
              src="/images/hero-hoodie.webp"
              alt="Featured Adoptd Christian Hoodie Collection"
              fill
              priority
              className="object-cover object-center group-hover:scale-102 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <div className="w-full border-t-2 border-black" />

      <section className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="w-full bg-[#030303] text-white py-16 sm:py-24 border-y border-stone-800">
        <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
            <div className="flex flex-col justify-between h-full">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] font-black tracking-tight text-white leading-[1.12] text-left">
                Christian Clothing That Shares Your Faith
              </h2>
            </div>

            <div className="flex flex-col justify-between h-full space-y-4 lg:space-y-0 text-left">
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-normal">
                ADOPTED was created from a simple desire — <strong className="text-white font-bold">to share Jesus with the world.</strong> I believe clothing can start conversations, provoke questi[...]
              </p>
              <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-normal">
                Every design has a purpose: <strong className="text-white font-bold">to get people thinking, talking and, above all, to point people towards Jesus.</strong>
              </p>
              <div>
                <p className="font-bold text-white text-base sm:text-lg tracking-wider uppercase">
                  Small brand. Big message. Jesus at the centre.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Shop By Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              className="bg-[#efefef] rounded-[20px] p-8 flex flex-col items-center justify-between text-center space-y-6 hover:shadow-md transition-all"
            >
              <div className="relative aspect-square w-32 rounded-lg overflow-hidden bg-white shadow-sm">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </div>

              <h3 className="font-black text-base text-stone-900 tracking-wider">
                {cat.name}
              </h3>

              <Link
                href={`/shop/${cat.slug}`}
                className="w-full py-2.5 px-6 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-md hover:bg-stone-800 transition text-center"
              >
                Shop
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-[#808080] text-white py-14 sm:py-20">
        <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2">
          <TestimonialsCarousel />
        </div>
      </section>
    </div>
  );
}
