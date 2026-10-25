'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function DtfQuoteForm() {
  const [name, setName] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [details, setDetails] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formRenderTime, setFormRenderTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => setFormRenderTime(Date.now()), []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !product || !quantity) {
      setError('Please complete your name, email, product and quantity.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const message = [
        'Bulk printing quote request',
        '',
        'Organisation: ' + (organisation.trim() || 'Not provided'),
        'Phone: ' + (phone.trim() || 'Not provided'),
        'Product: ' + product,
        'Approximate quantity: ' + quantity,
        '',
        'Print details and deadline:',
        details.trim() || 'Not provided',
      ].join('\n');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: 'Bulk Printing Quote Request',
          message,
          honeypot,
          formRenderTime,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'We could not send your request. Please try again or email us directly.');
      setSubmitted(true);
      setName('');
      setOrganisation('');
      setEmail('');
      setPhone('');
      setProduct('');
      setQuantity('');
      setDetails('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return <div className="rounded-2xl bg-white p-8 text-stone-900 sm:p-10"><div className="mb-4 inline-flex rounded-full bg-[#00736a]/10 p-3 text-[#00736a]"><CheckCircle2 className="h-7 w-7" /></div><h3 className="text-2xl font-black">Thanks — your enquiry has been submitted.</h3><p className="mt-3 leading-7 text-stone-600">Your quote request has been sent. We’ll review the details and get back to you.</p></div>;
  }

  const inputClass = 'mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 font-normal text-stone-900 outline-none transition focus:border-[#00736a] focus:ring-2 focus:ring-[#00736a]/15';
  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white p-5 text-stone-900 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">Your name *<input required name="name" autoComplete="name" value={name} onChange={e => setName(e.target.value)} className={inputClass} placeholder="Name" /></label>
        <label className="text-sm font-semibold">Business or organisation<input name="organisation" value={organisation} onChange={e => setOrganisation(e.target.value)} className={inputClass} placeholder="Company, club, school..." /></label>
        <label className="text-sm font-semibold">Email address *<input required type="email" name="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" /></label>
        <label className="text-sm font-semibold">Phone number<input type="tel" name="phone" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} placeholder="Optional" /></label>
        <label className="text-sm font-semibold">What are you printing? *<select required name="product" value={product} onChange={e => setProduct(e.target.value)} className={inputClass}><option value="" disabled>Select a product</option><option>T-shirts</option><option>Hoodies / sweatshirts</option><option>Workwear / uniforms</option><option>Sportswear / teamwear</option><option>Mixed garments</option><option>Other</option></select></label>
        <label className="text-sm font-semibold">Approximate quantity *<select required name="quantity" value={quantity} onChange={e => setQuantity(e.target.value)} className={inputClass}><option value="" disabled>Select quantity</option><option>10–24</option><option>25–49</option><option>50–99</option><option>100–249</option><option>250+</option><option>Not sure yet</option></select></label>
        <label className="text-sm font-semibold sm:col-span-2">Print details & deadline<textarea name="details" rows={4} value={details} onChange={e => setDetails(e.target.value)} className={inputClass} placeholder="Print placement, artwork, garment colours, sizes and date needed..." /></label>
      </div>
      <div className="hidden" aria-hidden="true"><label>Leave this empty<input tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} /></label></div>
      <p className="text-xs leading-5 text-stone-500">We’ll use these details to respond to your quote enquiry.</p>
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={loading} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00736a] px-6 py-3.5 font-bold text-white transition hover:bg-[#005e57] disabled:cursor-wait disabled:opacity-60">{loading ? 'Sending your request…' : 'Send my quote request'} <ArrowRight className="h-4 w-4" /></button>
    </form>
  );
}
