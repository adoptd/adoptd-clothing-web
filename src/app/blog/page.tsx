import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/lib/airtable';
import { constructMetadata } from '@/lib/seo';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Blog & Faith Devotionals | Adoptd Christian Clothing',
  description: 'Read our latest Christian articles, devotionals, and reflections on living out faith in modern everyday life.',
  slug: 'blog',
});

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
          Faith & Reflections
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-950">
          The Adoptd Journal
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Stories, devotions, and thoughts on sharing the light of Jesus through culture, apparel, and daily discipleship.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white border border-stone-200 rounded-2xl overflow-hidden hover:border-stone-400 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="relative aspect-video w-full bg-stone-100 overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md backdrop-blur-sm">
                {post.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-950 group-hover:text-stone-700 transition line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-xs text-stone-600 line-clamp-3 mt-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readingTimeMinutes} min read</span>
                </span>
                <span className="font-semibold text-stone-900 group-hover:underline inline-flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
