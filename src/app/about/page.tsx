import React from 'react';
import Link from 'next/link';
import { getAboutPageData } from '@/lib/airtable';
import { constructMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { Sparkles } from 'lucide-react';

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
      {/* About Us hero */}
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

      {/* Replaced the previous About Us body with the requested brand message */}
      <section className="max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl space-y-6 text-stone-800 text-base sm:text-lg leading-relaxed">
          <p>
            ADOPTD is an independent Christian clothing brand, created with a simple purpose — to make clothing that carries a message of faith, hope and identity.
          </p>
          <p>
            To read about how my journey started,{' '}
            <Link
              href="/blog"
              className="font-bold text-[#00736a] underline underline-offset-4 hover:text-stone-950"
            >
              read my blog
            </Link>
            .
          </p>
          <p>
            Every purchase helps a small business keep creating, designing and sharing faith through clothing.
          </p>
        </div>
      </section>
    </div>
  );
}
