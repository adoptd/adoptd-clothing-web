'use client';

import { FormEvent, useEffect, useState } from 'react';
import { MessageCircle, Send, CornerDownRight, Reply, X, ShieldCheck } from 'lucide-react';

interface CommentReplyItem {
  id: string;
  name: string;
  comment: string;
  submittedAt: string;
  isAuthorReply?: boolean;
}

interface CommentItem {
  id: string;
  name: string;
  comment: string;
  submittedAt: string;
  isAuthorReply?: boolean;
  replies?: CommentReplyItem[];
}

export function BlogComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [website, setWebsite] = useState('');
  const [replyingTo, setReplyingTo] = useState<CommentItem | null>(null);
  const [isAuthorReply, setIsAuthorReply] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetch(`/api/blog-comments?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('Unable to load comments'))))
      .then((data) => {
        if (active) setComments(Array.isArray(data.comments) ? data.comments : []);
      })
      .catch(() => {
        if (active) setComments([]);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  function handleStartReply(item: CommentItem) {
    setReplyingTo(item);
    setNotice('');
    setError('');
    const formEl = document.getElementById('blog-comment-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice('');
    setError('');
    try {
      const effectiveName = isAuthorReply && !name.trim() ? 'ADOPTD Team' : name;
      const response = await fetch('/api/blog-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          name: effectiveName,
          email,
          comment,
          website,
          parentId: replyingTo?.id || null,
          isAuthorReply,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to submit your comment.');
      setNotice(data.message || 'Thank you! Your comment has been posted.');
      if (Array.isArray(data.comments)) {
        setComments(data.comments);
      }
      setName('');
      setEmail('');
      setComment('');
      setWebsite('');
      setReplyingTo(null);
      setIsAuthorReply(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit your comment. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="max-w-4xl mx-auto pt-10 border-t border-stone-200 space-y-8"
      aria-labelledby="blog-comments-heading"
    >
      <div>
        <div className="flex items-center gap-2 text-[#00736a]">
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Join the conversation</span>
        </div>
        <h2
          id="blog-comments-heading"
          className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-stone-950"
        >
          Comments{' '}
          {comments.length > 0 && <span className="text-stone-500 text-2xl">({comments.length})</span>}
        </h2>
        <p className="mt-2 text-stone-600">
          We’d love to hear your thoughts. Share a comment or reply below.
        </p>
      </div>

      {comments.length > 0 ? (
        <div className="space-y-5">
          {comments.map((item) => (
            <article
              key={item.id}
              className="rounded-xl bg-stone-50 border border-stone-200 p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-stone-950">{item.name}</p>
                    {item.isAuthorReply && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#00736a] px-2.5 py-0.5 text-[11px] font-bold text-white">
                        <ShieldCheck className="w-3 h-3" /> ADOPTD Team
                      </span>
                    )}
                  </div>
                  {item.submittedAt && (
                    <p className="mt-0.5 text-xs text-stone-500">
                      {new Date(item.submittedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleStartReply(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00736a] hover:text-stone-950 px-2.5 py-1.5 rounded-lg hover:bg-stone-200/60 transition"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply</span>
                </button>
              </div>

              <p className="text-stone-700 whitespace-pre-wrap break-words leading-relaxed">
                {item.comment}
              </p>

              {/* Replies Thread */}
              {item.replies && item.replies.length > 0 && (
                <div className="mt-4 pt-4 border-t border-stone-200/80 pl-4 sm:pl-6 space-y-3">
                  {item.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className={`rounded-xl p-4 border ${
                        reply.isAuthorReply
                          ? 'bg-[#00736a]/5 border-[#00736a]/30'
                          : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <CornerDownRight className="w-3.5 h-3.5 text-[#00736a]" />
                        <span className="font-bold text-sm text-stone-950">{reply.name}</span>
                        {reply.isAuthorReply && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#00736a] px-2.5 py-0.5 text-[11px] font-bold text-white">
                            <ShieldCheck className="w-3 h-3" /> ADOPTD Team
                          </span>
                        )}
                        {reply.submittedAt && (
                          <span className="text-xs text-stone-500">
                            •{' '}
                            {new Date(reply.submittedAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm sm:text-base text-stone-800 whitespace-pre-wrap break-words leading-relaxed">
                        {reply.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="text-stone-600">No comments yet. You can be the first to share a thought.</p>
      )}

      <form
        id="blog-comment-form"
        onSubmit={handleSubmit}
        className="rounded-2xl border border-stone-200 p-5 sm:p-7 space-y-5 bg-white"
      >
        {replyingTo && (
          <div className="flex items-center justify-between gap-3 rounded-xl bg-[#00736a]/10 border border-[#00736a]/30 px-4 py-3 text-sm text-stone-900">
            <div className="flex items-center gap-2">
              <Reply className="w-4 h-4 text-[#00736a] flex-shrink-0" />
              <span>
                Replying to <strong>{replyingTo.name}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setReplyingTo(null);
                setIsAuthorReply(false);
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-stone-600 hover:text-stone-950"
            >
              <X className="w-4 h-4" /> Cancel reply
            </button>
          </div>
        )}

        <div>
          <label htmlFor="comment-name" className="block text-sm font-semibold text-stone-800 mb-1.5">
            Your name *
          </label>
          <input
            id="comment-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required={!isAuthorReply}
            placeholder={isAuthorReply ? 'ADOPTD Team' : 'Your name'}
            maxLength={80}
            autoComplete="name"
            className="w-full rounded-lg border border-stone-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00736a]"
          />
        </div>
        <div>
          <label htmlFor="comment-email" className="block text-sm font-semibold text-stone-800 mb-1.5">
            Email address <span className="font-normal text-stone-500">(optional, not displayed)</span>
          </label>
          <input
            id="comment-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            maxLength={254}
            autoComplete="email"
            className="w-full rounded-lg border border-stone-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00736a]"
          />
        </div>
        <div>
          <label htmlFor="comment-message" className="block text-sm font-semibold text-stone-800 mb-1.5">
            {replyingTo ? `Your reply to ${replyingTo.name} *` : 'Your comment *'}
          </label>
          <textarea
            id="comment-message"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            required
            maxLength={2000}
            rows={5}
            className="w-full rounded-lg border border-stone-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00736a]"
          />
          <p className="mt-1 text-xs text-stone-500">
            Please keep comments kind and respectful. Maximum 2,000 characters.
          </p>
        </div>

        {replyingTo && (
          <label className="inline-flex items-center gap-2 text-xs text-stone-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAuthorReply}
              onChange={(e) => {
                setIsAuthorReply(e.target.checked);
                if (e.target.checked && !name.trim()) {
                  setName('ADOPTD Team');
                }
              }}
              className="rounded border-stone-300 text-[#00736a] focus:ring-[#00736a]"
            />
            <span>Post as official ADOPTD Team reply</span>
          </label>
        )}

        <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="comment-website">Leave this field blank</label>
          <input
            id="comment-website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>
        {notice && (
          <p role="status" className="rounded-lg bg-teal-50 text-teal-900 p-3 text-sm">
            {notice}
          </p>
        )}
        {error && (
          <p role="alert" className="rounded-lg bg-red-50 text-red-800 p-3 text-sm">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00736a] px-5 py-3 font-bold text-white hover:bg-[#005e56] disabled:opacity-60 transition"
        >
          <Send className="w-4 h-4" />{' '}
          {loading ? 'Sending…' : replyingTo ? 'Post reply' : 'Submit comment'}
        </button>
      </form>
    </section>
  );
}
