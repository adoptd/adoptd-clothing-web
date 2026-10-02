import React from 'react';
import Link from 'next/link';
import { getAboutPageData } from '@/lib/airtable';
import { constructMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutPageData();
  return constructMetadata({
    title: data.seoTitle || `${data.title} | Adoptd Christian Clothing UK`,
    description: data.seoDescription || data.rawText.slice(0, 160),
    slug: 'about',
  });
}

export default async function AboutPage() {
  const data = await getAboutPageData();

  return (
    <div className="bg-white text-stone-900 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#f8f7f5] border-b border-stone-200/80 py-16 sm:py-24">
        <div className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#00736a] font-black">
              <Sparkles className="w-4 h-4" />
              <span>Our Story & Mission</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-950 tracking-tight leading-[1.15]">
              {data.title}
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Small business. Big faith. Jesus at the centre.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN STORY & CONTENT (Auto-Parsed from Word Document) */}
      <section className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl space-y-8">
          <article
            className="text-stone-800 text-base sm:text-lg leading-relaxed space-y-6 [&>p]:leading-relaxed [&>p]:mb-5 [&_strong]:text-stone-950 [&_strong]:font-bold [&_h1]:font-serif [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-stone-950 [&_h1]:mb-4 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-stone-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-stone-900 [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_blockquote]:border-l-4 [&_blockquote]:border-[#00736a] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-stone-700 [&_blockquote]:my-6 [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-8 [&_img]:max-w-full"
            dangerouslySetInnerHTML={{ __html: data.contentHtml }}
          />

          {/* Core Values / Callout Card */}
          <div className="mt-12 bg-[#030303] text-white rounded-3xl p-8 sm:p-12 shadow-md space-y-6">
            <div className="flex items-center space-x-3 text-[#00736a]">
              <Heart className="w-6 h-6 fill-[#00736a]" />
              <span className="text-xs uppercase tracking-widest font-black text-[#26a69a]">
                Why We Create
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Clothing That Starts Conversations
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Every garment is intentionally designed to provoke questions, offer encouragement, and point others towards the hope found in Jesus Christ.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#00736a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-[#005c55] transition shadow-md"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/church-print-services"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-white/10 text-white hover:bg-white/20 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl transition"
              >
                <span>Church Print Services</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
