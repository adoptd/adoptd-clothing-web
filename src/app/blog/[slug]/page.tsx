import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts, getProducts, getPageSeo } from '@/lib/airtable';
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
  const [post, pageSeo] = await Promise.all([
    getBlogPostBySlug(slug),
    getPageSeo(`blog/${slug}`),
  ]);

  if (!post) {
    return constructMetadata({ title: 'Article Not Found' });
  }

  return constructMetadata({
    title: pageSeo?.title || post.seoTitle || post.title,
    description: pageSeo?.description || post.seoDescription || post.excerpt,
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
    <article className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 py-12 space-y-12">
      {/* Back Link */}
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-stone-600 hover:text-stone-950 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto space-y-4">
        <span className="inline-block bg-stone-100 text-stone-800 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md">
          {post.category}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-black text-stone-950 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center space-x-4 text-sm text-stone-500 pt-2 border-b border-stone-200 pb-6">
          <span>By {post.author}</span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{post.publishDate}</span>
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{post.readingTimeMinutes} min read</span>
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto relative aspect-video w-full rounded-2xl overflow-hidden shadow-md bg-stone-100 border border-stone-200">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 896px"
        />
      </div>

      {/* Formatted Article Body (Supports parsed .docx HTML) */}
      <div
        className="max-w-4xl mx-auto prose-article text-stone-800 leading-relaxed font-normal text-lg sm:text-xl space-y-6"
        dangerouslySetInnerHTML={{ __html: post.contentHtml || `<p>${post.excerpt}</p>` }}
      />

      {/* Featured Products Mentioned in Article */}
      {featuredProducts.length > 0 && (
        <section className="max-w-4xl mx-auto pt-12 border-t border-stone-200 space-y-6">
          <div className="text-center sm:text-left">
            <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
              Featured In This Article
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-950 mt-1">
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
