import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts, getProducts } from '@/lib/airtable';
import { constructMetadata, generateArticleJsonLd } from '@/lib/seo';
import { ProductCard } from '@/components/product/ProductCard';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return constructMetadata({ title: 'Article Not Found' });
  }

  return constructMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverImage,
    slug: `blog/${post.slug}`,
  });
}

export const revalidate = 60;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allProducts = await getProducts();
  const featuredProducts = allProducts.filter((p) =>
    post.featuredProductIds?.includes(p.id)
  ).slice(0, 2);

  const jsonLd = generateArticleJsonLd(post);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Inject Google Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-stone-600 hover:text-stone-950 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Articles</span>
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="inline-block bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
          {post.category}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-950 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4 text-xs text-stone-500 pt-2 border-b border-stone-200 pb-6">
          <span>By {post.author}</span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.publishDate}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTimeMinutes} min read</span>
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md bg-stone-100 border border-stone-200">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 800px"
        />
      </div>

      {/* Formatted Article Body (Supports parsed .docx HTML) */}
      <div
        className="prose-article text-stone-800 leading-relaxed font-normal text-base sm:text-lg space-y-4"
        dangerouslySetInnerHTML={{ __html: post.contentHtml || `<p>${post.excerpt}</p>` }}
      />

      {/* Featured Products Mentioned in Article */}
      {featuredProducts.length > 0 && (
        <section className="pt-12 border-t border-stone-200 space-y-6">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
              Featured In This Article
            </span>
            <h3 className="font-serif text-2xl font-bold text-stone-950 mt-1">
              Shop Related Faith Pieces
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
