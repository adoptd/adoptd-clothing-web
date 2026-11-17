'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Reply,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

interface AdminCommentReply {
  id: string;
  name: string;
  comment: string;
  submittedAt: string;
  isAuthorReply: boolean;
}

interface AdminCommentItem {
  id: string;
  blogSlug: string;
  blogTitle: string;
  name: string;
  email?: string;
  comment: string;
  status: string;
  submittedAt: string;
  adminReply?: string | null;
  adminReplyAt?: string | null;
  replies: AdminCommentReply[];
}

export default function AdminBlogCommentsPage() {
  const [comments, setComments] = useState<AdminCommentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedNoticeId, setSavedNoticeId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'unreplied'>('all');

  async function loadAllComments() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/blog-comments?all=true', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Could not load blog comments.');
      }
      const list: AdminCommentItem[] = Array.isArray(data.comments) ? data.comments : [];
      setComments(list);
      const initialDrafts: Record<string, string> = {};
      list.forEach((c) => {
        initialDrafts[c.id] = c.adminReply || '';
      });
      setReplyDrafts(initialDrafts);
    } catch (err: any) {
      setError(err.message || 'Unable to load blog comments.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAllComments();
  }, []);

  async function handleSaveReply(commentId: string) {
    setSavingId(commentId);
    setSavedNoticeId(null);
    try {
      const replyText = replyDrafts[commentId] || '';
      const res = await fetch('/api/blog-comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentId,
          adminReply: replyText,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save reply');
      setSavedNoticeId(commentId);
      await loadAllComments();
    } catch (err: any) {
      alert(err.message || 'Could not save reply');
    } finally {
      setSavingId(null);
    }
  }

  async function handleToggleStatus(item: AdminCommentItem) {
    const nextStatus = item.status === 'Approved' ? 'Hidden' : 'Approved';
    setSavingId(item.id);
    try {
      const res = await fetch('/api/blog-comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commentId: item.id,
          status: nextStatus,
        }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      await loadAllComments();
    } catch (err: any) {
      alert(err.message || 'Could not update status');
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(commentId: string) {
    if (!window.confirm('Are you sure you want to permanently delete this comment?')) {
      return;
    }
    setSavingId(commentId);
    try {
      const res = await fetch(`/api/blog-comments?id=${encodeURIComponent(commentId)}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete comment');
      await loadAllComments();
    } catch (err: any) {
      alert(err.message || 'Could not delete comment');
    } finally {
      setSavingId(null);
    }
  }

  const displayedComments = comments.filter((item) => {
    if (filter === 'unreplied') {
      return !item.adminReply && (!item.replies || item.replies.length === 0);
    }
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00736a]">
            ADOPTD Journal Management
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-stone-950 mt-1">
            Blog Comments &amp; Replies
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            View all reader comments across your blog posts and publish official ADOPTD replies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFilter(filter === 'all' ? 'unreplied' : 'all')}
            className="px-4 py-2 rounded-lg border border-stone-300 text-xs font-bold text-stone-800 hover:bg-stone-100 transition"
          >
            {filter === 'all' ? 'Show Only Unreplied' : 'Show All Comments'}
          </button>
          <button
            type="button"
            onClick={loadAllComments}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-600">
          Loading blog comments...
        </div>
      ) : error ? (
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl text-amber-950 space-y-2">
          <p className="font-bold">Blog comments table setup required in Supabase:</p>
          <p className="text-sm">{error}</p>
        </div>
      ) : displayedComments.length === 0 ? (
        <div className="p-12 text-center bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
          <MessageCircle className="w-8 h-8 text-stone-400 mx-auto" />
          <p className="font-bold text-stone-900">No blog comments found</p>
          <p className="text-sm text-stone-600">
            When readers leave comments on your blog articles, they will appear here so you can reply.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {displayedComments.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-stone-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-base text-stone-950">{item.name}</span>
                    {item.email && (
                      <a
                        href={`mailto:${item.email}`}
                        className="text-xs text-[#00736a] underline"
                      >
                        ({item.email})
                      </a>
                    )}
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    On article:{' '}
                    <Link
                      href={`/blog/${item.blogSlug}#blog-comments-heading`}
                      className="font-semibold text-[#00736a] hover:underline inline-flex items-center gap-1"
                    >
                      {item.blogTitle} <ExternalLink className="w-3 h-3" />
                    </Link>{' '}
                    •{' '}
                    {new Date(item.submittedAt).toLocaleString('en-GB', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={savingId === item.id}
                    onClick={() => handleToggleStatus(item)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-100 transition"
                  >
                    {item.status === 'Approved' ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" /> Hide
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" /> Approve
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={savingId === item.id}
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-200 text-xs font-semibold text-rose-700 hover:bg-rose-50 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>

              {/* Reader's Comment */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-stone-800 whitespace-pre-wrap">
                {item.comment}
              </div>

              {/* Official ADOPTD Reply Box */}
              <div className="pt-2 space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00736a]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Your Official ADOPTD Team Reply</span>
                </label>
                <textarea
                  rows={3}
                  value={replyDrafts[item.id] ?? ''}
                  onChange={(e) =>
                    setReplyDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))
                  }
                  placeholder="Write a warm reply to this reader (will appear directly underneath their comment on the blog)..."
                  className="w-full rounded-xl border border-stone-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00736a]"
                />
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={savingId === item.id}
                    onClick={() => handleSaveReply(item.id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00736a] text-white text-xs font-bold hover:bg-[#005e56] disabled:opacity-50 transition"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>
                      {savingId === item.id
                        ? 'Saving...'
                        : item.adminReply
                        ? 'Update Reply'
                        : 'Publish Reply'}
                    </span>
                  </button>

                  {savedNoticeId === item.id && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" /> Reply published on blog!
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
