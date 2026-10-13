import { NextRequest, NextResponse } from 'next/server';
import { createBlogComment, getApprovedBlogComments, getBlogPostBySlug } from '@/lib/airtable';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const slug = (request.nextUrl.searchParams.get('slug') || '').trim();
  if (!slug || slug.length > 180) {
    return NextResponse.json({ error: 'A valid article is required.' }, { status: 400 });
  }

  const post = await getBlogPostBySlug(slug);
  if (!post) return NextResponse.json({ error: 'Article not found.' }, { status: 404 });

  const comments = await getApprovedBlogComments(post.slug);
  return NextResponse.json({ comments }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Honeypot field: ordinary visitors leave this empty; bots often fill every field.
    if (typeof body.website === 'string' && body.website.trim()) {
      return NextResponse.json({ success: true });
    }

    const slug = typeof body.slug === 'string' ? body.slug.trim() : '';
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const comment = typeof body.comment === 'string' ? body.comment.trim() : '';

    if (!slug || slug.length > 180 || !name || name.length > 80 || !comment || comment.length > 2000) {
      return NextResponse.json({ error: 'Please add your name and a comment (up to 2,000 characters).' }, { status: 400 });
    }
    if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json({ error: 'Please enter a valid email address or leave it blank.' }, { status: 400 });
    }

    const post = await getBlogPostBySlug(slug);
    if (!post) return NextResponse.json({ error: 'Article not found.' }, { status: 404 });

    await createBlogComment({ slug: post.slug, title: post.title, name, email, comment });
    return NextResponse.json({ success: true, message: 'Thank you! Your comment has been sent for approval.' });
  } catch (error) {
    console.error('Unable to submit blog comment:', error);
    return NextResponse.json({ error: 'Comments are temporarily unavailable. Please try again later.' }, { status: 503 });
  }
}
