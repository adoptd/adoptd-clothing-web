import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseBlogPostBySlug } from '@/lib/supabase';
import {
  getSupabaseBlogComments,
  getAllSupabaseBlogComments,
  createSupabaseBlogComment,
  saveAdminReplyToBlogComment,
  updateBlogCommentStatus,
  deleteSupabaseBlogComment,
} from '@/lib/blog-comments';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const showAll = request.nextUrl.searchParams.get('all') === 'true';
    if (showAll) {
      const comments = await getAllSupabaseBlogComments();
      return NextResponse.json({ comments }, { headers: { 'Cache-Control': 'no-store' } });
    }

    const slug = (request.nextUrl.searchParams.get('slug') || '').trim();
    if (!slug || slug.length > 180) {
      return NextResponse.json({ error: 'A valid article is required.' }, { status: 400 });
    }

    const post = await getSupabaseBlogPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }

    const comments = await getSupabaseBlogComments(post.slug);
    return NextResponse.json({ comments }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error: any) {
    console.error('Error loading blog comments:', error);
    return NextResponse.json(
      { error: error.message || 'Unable to load comments right now.' },
      { status: 500 }
    );
  }
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
    const parentId = body.parentId ? String(body.parentId).trim() : null;
    const isAuthorReply = Boolean(body.isAuthorReply);

    if (!slug || slug.length > 180 || !name || name.length > 80 || !comment || comment.length > 2000) {
      return NextResponse.json(
        { error: 'Please add your name and a comment (up to 2,000 characters).' },
        { status: 400 }
      );
    }
    if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json(
        { error: 'Please enter a valid email address or leave it blank.' },
        { status: 400 }
      );
    }

    const post = await getSupabaseBlogPostBySlug(slug);
    if (!post) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }

    await createSupabaseBlogComment({
      slug: post.slug,
      title: post.title,
      name,
      email,
      comment,
      parentId,
      isAuthorReply,
    });

    const comments = await getSupabaseBlogComments(post.slug);

    return NextResponse.json({
      success: true,
      message: parentId
        ? 'Thank you! Your reply has been posted.'
        : 'Thank you! Your comment has been posted.',
      comments,
    });
  } catch (error: any) {
    console.error('Unable to submit blog comment:', error);
    return NextResponse.json(
      {
        error:
          error?.message?.includes('blog_comments')
            ? 'Please run the blog_comments SQL setup in Supabase to enable comments.'
            : 'Comments are temporarily unavailable. Please try again later.',
      },
      { status: 503 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { commentId, adminReply, status } = body;

    if (!commentId) {
      return NextResponse.json({ error: 'commentId is required.' }, { status: 400 });
    }

    if (typeof adminReply === 'string') {
      await saveAdminReplyToBlogComment(commentId, adminReply);
    }

    if (status === 'Approved' || status === 'Hidden') {
      await updateBlogCommentStatus(commentId, status);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error updating blog comment:', error);
    return NextResponse.json(
      { error: error.message || 'Unable to update comment.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const commentId = request.nextUrl.searchParams.get('id');
    if (!commentId) {
      return NextResponse.json({ error: 'Comment ID is required.' }, { status: 400 });
    }

    await deleteSupabaseBlogComment(commentId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting blog comment:', error);
    return NextResponse.json(
      { error: error.message || 'Unable to delete comment.' },
      { status: 500 }
    );
  }
}
