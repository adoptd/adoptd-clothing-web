import React from 'react';
import Link from 'next/link';
import { getPageSeo } from '@/lib/airtable';
import { getSupabaseProducts } from '@/lib/supabase';
import { ProductCard } from '@/components/product/ProductCard';
import {
  constructMetadata,
  generateBreadcrumbJsonLd,
  generateCollectionPageJsonLd,
  generateFaqJsonLd,
} from '@/lib/seo';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const categoryInfoMap: Record<
  string,
  { title: string; subtitle: string; description: string; overviewHtml: string }
> = {
  'tee-shirts': {
    title: 'Christian T-Shirts',
    subtitle: 'Classic Tees & Faith Statements',
    description:
      'Shop Christian T-shirts with faith-inspired designs, meaningful messages and Bible verses. Find everyday graphic tees that help you wear your faith and share the light.',
    overviewHtml: `
      <h2>Faith-Inspired Christian T-Shirts Designed in the UK</h2>
      <p>Our collection of unisex <strong>Christian T-shirts UK</strong> believers love is crafted for everyday comfort, durability, and quiet witness. Each graphic tee is printed on soft, ethically sourced ringspun cotton with relaxed unisex sizing from S to 3XL — ideal for Sunday worship, small groups, university campuses, or everyday wear.</p>
      <p>Every design draws directly from Scripture — from <em>Amazing Grace</em> and <em>Faith Over Fear</em> to <em>Need Prayer</em> — created to spark natural conversations about Jesus and remind those around you of the hope of the Gospel.</p>
    `,
  },
  'christian-hoodies-uk': {
    title: 'Christian Hoodies UK',
    subtitle: 'Heavyweight Faith Hoodies',
    description:
      'Premium heavyweight unisex Christian hoodies carrying bold scripture declarations and gospel truth.',
    overviewHtml: `
      <h2>Heavyweight Unisex Christian Hoodies UK</h2>
      <p>Stay warm while wearing the Word with our collection of <strong>Christian hoodies in the UK</strong>. Cut from cosy brushed-fleece cotton blends, our hoodies combine contemporary streetwear comfort with timeless biblical truth — including <em>He Left the 99 (Luke 15:4)</em>, <em>Way Truth Life (John 14:6)</em>, and <em>Kingdom Athlete</em>.</p>
      <p>Designed and dispatched from the UK with tracked Royal Mail delivery, these faith hoodies make thoughtful Christian gifts for men, women, youth leaders, and students year-round.</p>
    `,
  },
  sweaters: {
    title: 'Christian Sweaters & Crewnecks',
    subtitle: 'Warm Layering & Streetwear Cuts',
    description:
      'Cozy fleece-lined Christian crewneck sweatshirts designed for comfort and testimony.',
    overviewHtml: `
      <h2>Christian Sweaters &amp; Faith Crewneck Sweatshirts</h2>
      <p>Layer up in softness and scripture with our unisex Christian crewneck sweaters. Built with ribbed cuffs, a classic relaxed drape, and durable print finishes, each sweatshirt is made to share encouragement and biblical hope through every season.</p>
    `,
  },
  'christian-bags': {
    title: 'Christian Tote Bags',
    subtitle: 'Everyday Canvas Faith Accessories',
    description:
      'Durable 100% natural organic cotton Christian tote bags for Bibles, study books, and daily life.',
    overviewHtml: `
      <h2>Organic Cotton Christian Tote Bags UK</h2>
      <p>Carry your Bible, journal, study notes, or daily shopping in a durable 100% natural organic canvas <strong>Christian tote bag</strong>. Featuring reinforced shoulder straps and scripture-inspired artwork such as <em>He Makes All Things New</em>, <em>The True Vine</em>, and <em>Amazing Grace</em>, our tote bags are practical, eco-conscious Christian gifts.</p>
    `,
  },
  christmas: {
    title: 'Christian Christmas Collection',
    subtitle: 'Seasonal Faith Apparel & Thoughtful Gifts',
    description:
      'Celebrate the birth of Christ with our faith-inspired Christmas collection, scripture gifts, and festive apparel.',
    overviewHtml: `
      <h2>Christ-Centred Christian Christmas Clothing &amp; Gifts</h2>
      <p>Keep Jesus at the centre of the festive season with our <strong>Christian Christmas collection</strong>. From <em>O Holy Night</em> and <em>Jesus the Reason for the Season</em> jumpers and tees to meaningful stocking fillers, each piece celebrates the incarnation of Emmanuel — God with us.</p>
    `,
  },
  'gym-sportswear': {
    title: 'Christian Gym & Sportswear',
    subtitle: 'Faith for Every Rep, Run & Rest Day',
    description:
      'Move with purpose in Christian gym and sportswear from Adoptd. Discover faith-inspired activewear designed to encourage you to train with perseverance, keep your eyes on Jesus, and carry your faith into everyday life.',
    overviewHtml: `
      <h2>Built on Faith — Christian Gym &amp; Sportswear UK</h2>
      <p>Train with discipline, gratitude, and purpose in our <strong>Christian gym wear and activewear</strong> range. Featuring breathable performance tees, men’s gym tanks, women’s workout vests, and heavyweight <em>Kingdom Athlete</em> gym hoodies inspired by 1 Corinthians 9:24–27 and Philippians 4:13, our sportswear is built for every rep, run, and rest day.</p>
    `,
  },
};

const categoryFaqs = [
  {
    question: 'Where is Adoptd Christian Clothing based and how fast is UK delivery?',
    answer:
      'Adoptd Christian Clothing is an independent UK brand. All orders are dispatched with tracked Royal Mail UK delivery (£3.95 flat rate, typically arriving within 2–4 working days).',
  },
  {
    question: 'How do your unisex Christian T-shirts and hoodies fit?',
    answer:
      'Our T-shirts and hoodies feature a comfortable, modern unisex fit available in sizes S through 3XL. Each product page includes a detailed UK size guide with chest and length measurements.',
  },
  {
    question: 'Do you offer custom printing for UK churches and youth ministries?',
    answer:
      'Yes! We provide custom screen printing and bulk apparel packages for UK churches, youth camps, worship teams, and Christian outreach events via our Church & Ministry Print Services page.',
  },
];

export async function generateStaticParams() {
  return [
    { category: 'tee-shirts' },
    { category: 'christian-hoodies-uk' },
    { category: 'sweaters' },
    { category: 'christian-bags' },
    { category: 'christmas' },
    { category: 'gym-sportswear' },
  ];
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const pageSeo = await getPageSeo(`shop/${category}`);

  const info = categoryInfoMap[category] || {
    title: `${category.replace(/-/g, ' ')}`,
    description: 'Shop Christian clothing and apparel.',
  };

  if (category === 'tee-shirts') {
    return constructMetadata({
      title: 'Christian T-Shirts UK | Faith Graphic Tees',
      description:
        'Shop Christian T-shirts in the UK at Adoptd. Discover faith-inspired graphic tees featuring Bible verses and meaningful designs to wear your faith and share the light.',
      slug: 'shop/tee-shirts',
    });
  }

  if (category === 'christian-hoodies-uk') {
    return constructMetadata({
      title: 'Christian Hoodies UK | Faith-Inspired Hoodies',
      description:
        'Shop Christian hoodies in the UK at Adoptd. Explore comfortable faith-inspired hoodies featuring Bible verses and meaningful designs to wear your faith and share the light.',
      slug: 'shop/christian-hoodies-uk',
    });
  }

  return constructMetadata({
    title: pageSeo?.title || `${info.title} | Adoptd Christian Clothing UK`,
    description: pageSeo?.description || info.description,
    slug: `shop/${category}`,
  });
}

export const revalidate = 3600;

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const allProducts = await getSupabaseProducts();
  const products = allProducts.filter((p) => p.category === category);
  const info = categoryInfoMap[category];
  const categoryTitle = info?.title || category.replace(/-/g, ' ');
  const categoryDescription = info?.description || 'Browse our faith-centred Christian clothing collection.';
  const categoryOverview =
    products.find((p) => p.categoryOverview)?.categoryOverview || info?.overviewHtml;

  const categories = [
    { name: 'All Products', slug: 'all', href: '/shop' },
    { name: 'T-Shirts', slug: 'tee-shirts', href: '/shop/tee-shirts' },
    { name: 'Hoodies', slug: 'christian-hoodies-uk', href: '/shop/christian-hoodies-uk' },
    { name: 'Tote Bags', slug: 'christian-bags', href: '/shop/christian-bags' },
    { name: 'Christmas', slug: 'christmas', href: '/shop/christmas' },
    { name: 'Gym & Sportswear', slug: 'gym-sportswear', href: '/shop/gym-sportswear' },
  ];

  const collectionJsonLd = JSON.stringify(
    generateCollectionPageJsonLd({
      title: categoryTitle,
      description: categoryDescription,
      slug: `shop/${category}`,
      products,
    })
  ).replace(/</g, '\\u003c');

  const breadcrumbJsonLd = JSON.stringify(
    generateBreadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Shop', path: '/shop' },
      { name: categoryTitle, path: `/shop/${category}` },
    ])
  ).replace(/</g, '\\u003c');

  const faqJsonLd = JSON.stringify(generateFaqJsonLd(categoryFaqs)).replace(/</g, '\\u003c');

  return (
    <div className="max-w-[1680px] mx-auto px-3 sm:px-1.5 lg:px-2 py-12 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: collectionJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />

      {/* Header */}
      <div className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
            {info?.subtitle || 'Collection'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950">
            {categoryTitle}
          </h1>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {categoryDescription}
          </p>
        </div>
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

      {/* Products Grid (2 columns on mobile, 3 on tablet, 4 on desktop) */}
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Long SEO category description below the products */}
      {categoryOverview && (
        <div className="w-full pt-8 border-t border-stone-200">
          {categoryOverview.includes('<') && categoryOverview.includes('>') ? (
            <div
              className="text-stone-700 text-sm sm:text-base leading-relaxed space-y-4 w-full text-left [&>p]:leading-relaxed [&>p]:mb-4 [&_strong]:text-stone-950 [&_strong]:font-bold [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-stone-900 [&_h2]:mb-2 [&_h3]:font-serif [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-stone-900 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1"
              dangerouslySetInnerHTML={{ __html: categoryOverview }}
            />
          ) : (
            <div className="text-stone-700 text-sm sm:text-base leading-relaxed space-y-4 w-full text-left whitespace-pre-line">
              {categoryOverview}
            </div>
          )}
        </div>
      )}

      {/* Structured FAQ Section for Google & AI Search Overviews */}
      <section className="w-full pt-8 border-t border-stone-200 space-y-5" aria-labelledby="category-faq-heading">
        <h2 id="category-faq-heading" className="font-serif text-xl sm:text-2xl font-bold text-stone-950">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categoryFaqs.map((faq) => (
            <div key={faq.question} className="rounded-xl bg-stone-50 border border-stone-200 p-5 space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-stone-950">{faq.question}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
