import { createClient } from '@supabase/supabase-js';
import { escapeHtml } from '@/lib/order-email';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://twpnniihnevlkxnuysjj.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'sb_publishable_JX1R7a8qmTADZzcKlcSVXA_YD7FZtQ7';

const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export interface BlogCommentReply {
  id: string;
  name: string;
  comment: string;
  submittedAt: string;
  isAuthorReply: boolean;
}

export interface BlogCommentItem {
  id: string;
  blogSlug: string;
  blogTitle: string;
  name: string;
  email?: string;
  comment: string;
  status: string;
  submittedAt: string;
  parentId?: string | null;
  isAuthorReply: boolean;
  adminReply?: string | null;
  adminReplyAt?: string | null;
  replies: BlogCommentReply[];
}

/**
 * Fetches all approved comments and their replies for a single blog article slug.
 */
export async function getSupabaseBlogComments(slug: string): Promise<BlogCommentItem[]> {
  const cleanSlug = (slug || '').trim().toLowerCase();
  if (!cleanSlug) return [];

  const { data, error } = await supabaseServer
    .from('blog_comments')
    .select(
      'id, blog_slug, blog_title, name, comment, status, parent_id, is_author_reply, admin_reply, admin_reply_at, created_at'
    )
    .ilike('blog_slug', cleanSlug)
    .eq('status', 'Approved')
    .order('created_at', { ascending: true });

  if (error || !data) {
    if (error && error.code !== 'PGRST205') {
      console.warn('[Blog Comments] Error fetching comments from Supabase:', error.message);
    }
    return [];
  }

  const topLevel: BlogCommentItem[] = [];
  const byId = new Map<string, BlogCommentItem>();
  const childRows: any[] = [];

  for (const row of data) {
    if (row.parent_id) {
      childRows.push(row);
    } else {
      const item: BlogCommentItem = {
        id: String(row.id),
        blogSlug: row.blog_slug,
        blogTitle: row.blog_title,
        name: row.name || 'Reader',
        comment: row.comment || '',
        status: row.status || 'Approved',
        submittedAt: row.created_at || new Date().toISOString(),
        parentId: null,
        isAuthorReply: Boolean(row.is_author_reply),
        adminReply: row.admin_reply || null,
        adminReplyAt: row.admin_reply_at || null,
        replies: [],
      };

      // If the owner typed an `admin_reply` directly in the Supabase table column, include it as an official reply
      if (row.admin_reply && String(row.admin_reply).trim()) {
        item.replies.push({
          id: `admin-reply-${row.id}`,
          name: 'ADOPTD Team',
          comment: String(row.admin_reply).trim(),
          submittedAt: row.admin_reply_at || row.created_at || new Date().toISOString(),
          isAuthorReply: true,
        });
      }

      topLevel.push(item);
      byId.set(String(row.id), item);
    }
  }

  for (const child of childRows) {
    const parent = byId.get(String(child.parent_id));
    if (parent) {
      parent.replies.push({
        id: String(child.id),
        name: child.name || (child.is_author_reply ? 'ADOPTD Team' : 'Reader'),
        comment: child.comment || '',
        submittedAt: child.created_at || new Date().toISOString(),
        isAuthorReply: Boolean(child.is_author_reply),
      });
    } else {
      // Orphan reply fallback
      topLevel.push({
        id: String(child.id),
        blogSlug: child.blog_slug,
        blogTitle: child.blog_title,
        name: child.name || 'Reader',
        comment: child.comment || '',
        status: child.status || 'Approved',
        submittedAt: child.created_at || new Date().toISOString(),
        parentId: String(child.parent_id),
        isAuthorReply: Boolean(child.is_author_reply),
        replies: [],
      });
    }
  }

  return topLevel;
}

/**
 * Fetches all comments across all blog articles for the owner management view.
 */
export async function getAllSupabaseBlogComments(): Promise<BlogCommentItem[]> {
  const { data, error } = await supabaseServer
    .from('blog_comments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const rows = data || [];
  const childrenByParent = new Map<string, BlogCommentReply[]>();

  for (const row of rows) {
    if (row.parent_id) {
      const parentKey = String(row.parent_id);
      const list = childrenByParent.get(parentKey) || [];
      list.unshift({
        id: String(row.id),
        name: row.name || (row.is_author_reply ? 'ADOPTD Team' : 'Reader'),
        comment: row.comment || '',
        submittedAt: row.created_at || new Date().toISOString(),
        isAuthorReply: Boolean(row.is_author_reply),
      });
      childrenByParent.set(parentKey, list);
    }
  }

  return rows
    .filter((row) => !row.parent_id)
    .map((row) => {
      const replies: BlogCommentReply[] = [];
      if (row.admin_reply && String(row.admin_reply).trim()) {
        replies.push({
          id: `admin-reply-${row.id}`,
          name: 'ADOPTD Team',
          comment: String(row.admin_reply).trim(),
          submittedAt: row.admin_reply_at || row.created_at || new Date().toISOString(),
          isAuthorReply: true,
        });
      }
      const childReplies = childrenByParent.get(String(row.id)) || [];
      replies.push(...childReplies);

      return {
        id: String(row.id),
        blogSlug: row.blog_slug,
        blogTitle: row.blog_title,
        name: row.name || 'Reader',
        email: row.email || undefined,
        comment: row.comment || '',
        status: row.status || 'Approved',
        submittedAt: row.created_at || new Date().toISOString(),
        parentId: null,
        isAuthorReply: Boolean(row.is_author_reply),
        adminReply: row.admin_reply || null,
        adminReplyAt: row.admin_reply_at || null,
        replies,
      };
    });
}

/**
 * Inserts a new blog comment or reply into Supabase and sends an email notification to the store owner.
 */
export async function createSupabaseBlogComment(data: {
  slug: string;
  title: string;
  name: string;
  email?: string;
  comment: string;
  parentId?: string | number | null;
  isAuthorReply?: boolean;
}) {
  const cleanSlug = data.slug.trim().toLowerCase();
  const isAuthor = Boolean(data.isAuthorReply);
  const effectiveName = isAuthor ? data.name.trim() || 'ADOPTD Team' : data.name.trim();

  const insertPayload: Record<string, any> = {
    blog_slug: cleanSlug,
    blog_title: data.title.trim(),
    name: effectiveName,
    email: data.email ? data.email.trim() : null,
    comment: data.comment.trim(),
    status: 'Approved',
    is_author_reply: isAuthor,
    parent_id: data.parentId ? Number(data.parentId) : null,
  };

  const { data: inserted, error } = await supabaseServer
    .from('blog_comments')
    .insert(insertPayload)
    .select('id, created_at')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Send email notification to business email when a visitor leaves a comment
  if (!isAuthor && process.env.RESEND_API_KEY) {
    const recipient =
      process.env.ORDER_NOTIFICATION_EMAIL ||
      process.env.BUSINESS_EMAIL ||
      'adoptdclothing@gmail.com';
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://adoptdchristianclothing.co.uk').replace(/\/$/, '');
    const postUrl = `${siteUrl}/blog/${cleanSlug}`;
    const manageUrl = `${siteUrl}/admin/blog-comments`;

    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'ADOPTD Blog <onboarding@resend.dev>',
          to: [recipient],
          ...(data.email && data.email.includes('@') ? { reply_to: data.email.trim() } : {}),
          subject: `💬 New Blog Comment on "${data.title}" – ${effectiveName}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1c1917; max-width: 600px; line-height: 1.6;">
              <div style="background-color: #00736a; color: #ffffff; padding: 20px 24px; border-radius: 12px 12px 0 0;">
                <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #d1fae5; font-weight: 700;">
                  ADOPTD Journal &bull; New Comment Notification
                </p>
                <h2 style="margin: 6px 0 0 0; font-size: 20px; color: #ffffff;">
                  New Comment on &ldquo;${escapeHtml(data.title)}&rdquo;
                </h2>
              </div>
              <div style="border: 1px solid #e7e5e4; border-top: 0; border-radius: 0 0 12px 12px; padding: 24px; background-color: #ffffff;">
                <p style="margin: 0 0 8px 0;"><strong>From:</strong> ${escapeHtml(effectiveName)}${
                  data.email ? ` (<a href="mailto:${escapeHtml(data.email)}" style="color: #00736a;">${escapeHtml(data.email)}</a>)` : ''
                }</p>
                <p style="margin: 0 0 16px 0;"><strong>Article:</strong> <a href="${escapeHtml(postUrl)}" style="color: #00736a;">${escapeHtml(data.title)}</a></p>
                <div style="background-color: #fafaf9; border: 1px solid #e7e5e4; border-radius: 8px; padding: 16px; white-space: pre-wrap; margin-bottom: 20px;">${escapeHtml(
                  data.comment
                )}</div>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                  <a href="${escapeHtml(postUrl)}#blog-comments-heading" style="display: inline-block; background-color: #00736a; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 10px 18px; border-radius: 8px; margin-right: 10px;">
                    View &amp; Reply on Blog Post
                  </a>
                  <a href="${escapeHtml(manageUrl)}" style="display: inline-block; background-color: #1c1917; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 10px 18px; border-radius: 8px;">
                    Open Comments Manager
                  </a>
                </div>
              </div>
            </div>
          `,
        }),
      });
    } catch (emailErr) {
      console.warn('[Blog Comments] Failed to send comment notification email:', emailErr);
    }
  }

  return {
    id: String(inserted?.id || Date.now()),
    createdAt: inserted?.created_at || new Date().toISOString(),
  };
}

/**
 * Saves an official ADOPTD reply on a comment (updates `admin_reply` column on the comment row).
 */
export async function saveAdminReplyToBlogComment(commentId: string | number, replyText: string) {
  const cleanReply = replyText.trim();
  const { error } = await supabaseServer
    .from('blog_comments')
    .update({
      admin_reply: cleanReply || null,
      admin_reply_at: cleanReply ? new Date().toISOString() : null,
    })
    .eq('id', Number(commentId));

  if (error) {
    throw new Error(error.message);
  }
  return { success: true };
}

/**
 * Updates a comment's visibility status ('Approved' | 'Hidden') or deletes it.
 */
export async function updateBlogCommentStatus(commentId: string | number, status: 'Approved' | 'Hidden') {
  const { error } = await supabaseServer
    .from('blog_comments')
    .update({ status })
    .eq('id', Number(commentId));

  if (error) {
    throw new Error(error.message);
  }
  return { success: true };
}

export async function deleteSupabaseBlogComment(commentId: string | number) {
  const { error } = await supabaseServer
    .from('blog_comments')
    .delete()
    .eq('id', Number(commentId));

  if (error) {
    throw new Error(error.message);
  }
  return { success: true };
}
