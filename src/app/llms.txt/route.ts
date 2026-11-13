import { NextResponse } from 'next/server';
import { getSupabaseProducts, getSupabaseBlogPosts } from '@/lib/supabase';

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adoptdchristianclothing.co.uk';

export async function GET() {
  const [products, posts] = await Promise.all([
    getSupabaseProducts(),
    getSupabaseBlogPosts(),
  ]);

  const lines: string[] = [
    '# Adoptd Christian Clothing UK',
    '',
    '> Ethically sourced, faith-inspired Christian clothing and apparel in the UK — designed to wear the Word and share the light.',
    '',
    `- Website: ${siteUrl}`,
    '- Location: United Kingdom',
    '- Currency: GBP (£)',
    '- Shipping: £3.95 flat-rate UK tracked delivery, free UK delivery on orders over £40',
    '- Returns: 30-day UK return policy',
    '- Contact: hello@adoptdchristianclothing.co.uk',
    '',
    '## Collections',
    `- [All Christian Apparel](${siteUrl}/shop): Full collection of faith-inspired clothing and accessories`,
    `- [Christian T-Shirts](${siteUrl}/shop/tee-shirts): Scripture-inspired graphic tees`,
    `- [Christian Hoodies UK](${siteUrl}/shop/christian-hoodies-uk): Heavyweight unisex faith hoodies`,
    `- [Christian Tote Bags](${siteUrl}/shop/christian-bags): Organic cotton tote bags`,
    `- [Christian Christmas Collection](${siteUrl}/shop/christmas): Festive Christian sweatshirts and tees`,
    `- [Christian Gym & Sportswear](${siteUrl}/shop/gym-sportswear): Faith-inspired activewear and training vests`,
    `- [Church Print Services](${siteUrl}/church-print-services): Custom Christian apparel printing for UK churches, youth groups, and ministries`,
    '',
    '## Products',
  ];

  for (const p of products) {
    const cleanDesc = (p.shortDescription || p.description || '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 140);
    lines.push(
      `- [${p.name}](${siteUrl}/product/${p.slug}) (£${p.price.toFixed(2)}, ${p.inStock ? 'In Stock' : 'Out of Stock'})${cleanDesc ? `: ${cleanDesc}` : ''}`
    );
  }

  if (posts.length > 0) {
    lines.push('', '## The Adoptd Journal (Faith & Devotionals)');
    for (const post of posts) {
      lines.push(
        `- [${post.title}](${siteUrl}/blog/${post.slug}) (${post.category}): ${post.excerpt}`
      );
    }
  }

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
