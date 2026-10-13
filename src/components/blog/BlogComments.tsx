'use client';

import { FormEvent, useEffect, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

interface CommentItem {
  id: string;
  name: string;
  comment: string;
  submittedAt: string;
}

export function BlogComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    fetch(`/api/blog-comments?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load comments')))
      .then((data) => { if (active) setComments(Array.isArray(data.comments) ? data.comments : []); })
      .catch(() => { if (active) setComments([]); });
    return () => { active = false; };
  }, [slug]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice('');
    setError('');
    try {
      const response = await fetch('/api/blog-comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, email, comment, website }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to submit your comment.');
      setNotice(data.message || 'Thank you! Your comment has been sent for approval.');
      setName('');
      setEmail('');
      setComment('');
      setWebsite('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit your comment. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="max-w-4xl mx-auto pt-10 border-t border-stone-200 space-y-8" aria-labelledby="blog-comments-heading">
      <div>
        <div className="flex items-center gap-2 text-[#00736a]">
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Join the conversation</span>
        </div>
        <h2 id="blog-comments-heading" className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-stone-950">
          Comments {comments.length > 0 && <span className="text-stone-500 text-2xl">({comments.length})</span>}
        </h2>
        <p className="mt-2 text-stone-600">We’d love to hear your thoughts. Comments are checked before they appear.</p>
      </div>

      {comments.length > 0 ? (
        <div className="space-y-5">
          {comments.map((item) => (
            <article key={item.id} className="rounded-xl bg-stone-50 border border-stone-200 p-5">
              <p className="font-bold text-stone-950">{item.name}</p>
              {item.submittedAt && <p className="mt-1 text-xs text-stone-500">{new Date(item.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
              <p className="mt-3 text-stone-700 whitespace-pre-wrap break-words">{item.comment}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-stone-600">No comments yet. You can be the first to share a thought.</p>
      )}

      <form onSubmit={handleSubmit} className="rounded-2xl border border-stone-200 p-5 sm:p-7 space-y-5">
        <div>
          <label htmlFor="comment-name" className="block text-sm font-semibold text-stone-800 mb-1.5">Your name *</label>
          <input id="comment-name" value={name} onChange={(event) => setName(event.target.value)} required maxLength={80} autoComplete="name" className="w-full rounded-lg border border-stone-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00736a]" />
        </div>
        <div>
          <label htmlFor="comment-email" className="block text-sm font-semibold text-stone-800 mb-1.5">Email address <span className="font-normal text-stone-500">(optional, not displayed)</span></label>
          <input id="comment-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254} autoComplete="email" className="w-full rounded-lg border border-stone-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00736a]" />
        </div>
        <div>
          <label htmlFor="comment-message" className="block text-sm font-semibold text-stone-800 mb-1.5">Your comment *</label>
          <textarea id="comment-message" value={comment} onChange={(event) => setComment(event.target.value)} required maxLength={2000} rows={5} className="w-full rounded-lg border border-stone-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#00736a]" />
          <p className="mt-1 text-xs text-stone-500">Please keep comments kind and respectful. Maximum 2,000 characters.</p>
        </div>
        <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="comment-website">Leave this field blank</label>
          <input id="comment-website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
        </div>
        {notice && <p role="status" className="rounded-lg bg-teal-50 text-teal-900 p-3 text-sm">{notice}</p>}
        {error && <p role="alert" className="rounded-lg bg-red-50 text-red-800 p-3 text-sm">{error}</p>}
        <button type="submit" disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#00736a] px-5 py-3 font-bold text-white hover:bg-[#005e56] disabled:opacity-60 transition">
          <Send className="w-4 h-4" /> {loading ? 'Sending…' : 'Submit comment'}
        </button>
        <p className="text-xs text-stone-500">Your comment will be sent to Adoptd for approval before it is published.</p>
      </form>
    </section>
  );
}
