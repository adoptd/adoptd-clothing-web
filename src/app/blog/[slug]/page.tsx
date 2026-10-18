import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts, getProducts, getPageSeo } from '@/lib/airtable';
import { constructMetadata, generateArticleJsonLd } from '@/lib/seo';
import { ProductCard } from '@/components/product/ProductCard';
import { BlogComments } from '@/components/blog/BlogComments';
import { Clock, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';


/**
 * Add a small number of contextual internal links to plain-text article content.
 * Existing links and HTML attributes are left untouched; each destination is linked once.
 */
function addContextualInternalLinks(
  html: string,
  currentSlug: string,
  posts: { title: string; slug: string }[],
  products: { name: string; slug: string }[],
): string {
  const candidates: { phrase: string; href: string }[] = [];

  posts
    .filter((item) => item.slug !== currentSlug && item.title.trim().length > 8)
    .forEach((item) => candidates.push({ phrase: item.title, href: `/blog/${item.slug}` }));

  products.forEach((product) => {
    candidates.push({ phrase: product.name, href: `/product/${product.slug}` });
    // Product designs are often referred to by their shorter design name in article copy.
    const aliases = [
      'Faith Over Fear',
      'He Makes All Things New',
      'Amazing Grace',
      'The True Vine',
      'More of Him Less of Me',
      'Need Prayer',
      'The Lord Is My Light',
      'He Left the 99',
    ];
    aliases.forEach((phrase) => {
      if (product.name.toLowerCase().includes(phrase.toLowerCase())) {
        candidates.push({ phrase, href: `/product/${product.slug}` });
      }
    });
  });

  const uniqueCandidates = Array.from(
    new Map(candidates.sort((a, b) => b.phrase.length - a.phrase.length)
      .map((item) => [`${item.phrase.toLowerCase()}|${item.href}`, item])).values(),
  );
  const linkedDestinations = new Set<string>();
  let insideAnchor = false;

  return html.split(/(<[^>]+>)/g).map((part) => {
    if (part.startsWith('<')) {
      if (/^<a\b/i.test(part)) insideAnchor = true;
      if (/^<\/a\s*>/i.test(part)) insideAnchor = false;
      return part;
    }
    if (insideAnchor || !part.trim()) return part;

    let result = part;
    for (const candidate of uniqueCandidates) {
      if (linkedDestinations.has(candidate.href)) continue;
      const escaped = candidate.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\interface BlogPostPageProps {');
      const matcher = new RegExp(`(^|[^\\w])(${escaped})(?![\\w])`, 'i');
      if (matcher.test(result)) {
        result = result.replace(matcher, (_match, prefix, phrase) =>
          `${prefix}<a href="${candidate.href}" class="text-[#00736a] underline underline-offset-4 hover:text-stone-950">${phrase}</a>`,
        );
        linkedDestinations.add(candidate.href);
      }
    }
    return result;
  }).join('');
}

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

  const [allProducts, allPosts] = await Promise.all([getProducts(), getBlogPosts()]);
  const featuredProducts = allProducts.filter((p) =>
    post.featuredProductIds?.includes(p.id)
  ).slice(0, 2);

  // Prefer articles in the same category, then suggest other recent articles.
  const otherPosts = allPosts.filter((item) => item.slug !== post.slug);
  const sameCategoryPosts = otherPosts.filter(
    (item) => item.category && item.category.toLowerCase() === post.category?.toLowerCase()
  );
  const otherCategoryPosts = otherPosts.filter(
    (item) => !sameCategoryPosts.some((related) => related.slug === item.slug)
  );
  const relatedPosts = [...sameCategoryPosts, ...otherCategoryPosts].slice(0, 3);

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
        dangerouslySetInnerHTML={{ __html: addContextualInternalLinks(post.contentHtml || `<p>${post.excerpt}</p>`, post.slug, allPosts, allProducts) }}
      />

      <BlogComments slug={post.slug} />

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

      {/* Related articles create links between relevant blog posts */}
      {relatedPosts.length > 0 && (
        <section className="max-w-4xl mx-auto pt-10 border-t border-stone-200 space-y-6" aria-labelledby="related-articles-heading">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
              Keep Reading
            </span>
            <h2 id="related-articles-heading" className="font-serif text-3xl font-bold text-stone-950 mt-1">
              You Might Also Enjoy
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.slug}`}
                className="group rounded-xl border border-stone-200 p-5 hover:border-[#00736a] hover:shadow-sm transition"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#00736a]">
                  {related.category}
                </span>
                <h3 className="mt-2 font-serif text-xl font-bold text-stone-950 group-hover:text-[#00736a]">
                  {related.title}
                </h3>
                <p className="mt-2 text-sm text-stone-600 line-clamp-3">
                  {related.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-stone-900 group-hover:text-[#00736a]">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
          <p className="text-sm text-stone-600">
            New to ADOPTD? <Link href="/about" className="font-semibold text-[#00736a] underline underline-offset-4 hover:text-stone-950">Read our story</Link> or <Link href="/shop" className="font-semibold text-[#00736a] underline underline-offset-4 hover:text-stone-950">explore the collection</Link>.
          </p>
          <div className="text-sm">
            <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-stone-600 hover:text-stone-950">
              <ArrowLeft className="w-4 h-4" /> Browse all articles
            </Link>
          </div>
        </section>
      )}
    </article>
  );
}
