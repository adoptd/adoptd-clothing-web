'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '@/types';

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formRenderTime, setFormRenderTime] = useState<number>(0);
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setFormRenderTime(Date.now());
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot, formRenderTime }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to subscribe');

      setSubscribed(true);
      setEmail('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Error subscribing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white text-stone-900 border-t border-stone-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Newsletter Section (1:1 Exact Match) */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Join Our Newsletter
          </h3>
          <p className="text-stone-600 text-sm leading-relaxed">
            Be part of something brighter. It’s not about sales — it’s about community, connection, and sharing how we spread God’s light.
          </p>

          {subscribed ? (
            <div className="flex items-center justify-center space-x-2 text-emerald-700 bg-emerald-50 border border-emerald-200 p-4 rounded-md">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-semibold">Success! Thank you for subscribing.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-3 pt-2">
              <div aria-hidden="true" style={{ display: 'none', position: 'absolute', left: '-9999px' }}>
                <input
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="flex-grow px-4 py-3 bg-white border border-stone-300 text-stone-900 placeholder-stone-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-black text-white hover:bg-stone-800 font-bold text-xs uppercase tracking-wider rounded-md transition disabled:opacity-50"
                >
                  {loading ? '...' : 'Subscribe'}
                </button>
              </div>
              {errorMsg && <p className="text-xs text-rose-600">{errorMsg}</p>}
            </form>
          )}

          {/* Social Follow Links */}
          <div className="flex items-center justify-center space-x-6 pt-4 text-xs font-bold uppercase tracking-wider text-stone-900">
            <a
              href="https://facebook.com/adoptdclothing25/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-stone-600 transition"
            >
              <Facebook className="w-4 h-4" />
              <span>Follow</span>
            </a>
            <a
              href="https://www.instagram.com/adoptdchristian"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-stone-600 transition"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow</span>
            </a>
          </div>
        </div>

        {/* Social Handle Banner */}
        <div className="text-center pt-8 border-t border-stone-200">
          <span className="font-extrabold text-sm sm:text-base tracking-[0.2em] text-stone-900 uppercase">
            @adoptd-CLOTHING
          </span>
        </div>

        {/* 4 Footer Columns (1:1 Exact Match) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs pt-4 border-t border-stone-200">
          
          {/* SHOP Column */}
          <div className="space-y-3">
            <h4 className="font-black uppercase tracking-wider text-stone-900">SHOP</h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li><Link href="/shop" className="hover:text-black">Christmas</Link></li>
              <li><Link href="/shop/tee-shirts" className="hover:text-black">T-Shirts</Link></li>
              <li><Link href="/shop/christian-hoodies-uk" className="hover:text-black">Hoodies</Link></li>
              <li><Link href="/shop/sweaters" className="hover:text-black">Sweaters</Link></li>
              <li><Link href="/shop/christian-bags" className="hover:text-black">Tote Bags</Link></li>
              <li><Link href="/church-print-services" className="hover:text-black">Church & Ministry Print Services</Link></li>
              <li><Link href="/shop" className="hover:text-black">Blaze city Merch</Link></li>
            </ul>
          </div>

          {/* COMPANY Column */}
          <div className="space-y-3">
            <h4 className="font-black uppercase tracking-wider text-stone-900">COMPANY</h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li><Link href="/" className="hover:text-black">Home</Link></li>
              <li><Link href="/church-print-services" className="hover:text-black">Church & Ministry Print Services</Link></li>
              <li><Link href="/shop" className="hover:text-black">Blaze city Merch</Link></li>
            </ul>
          </div>

          {/* INFO Column */}
          <div className="space-y-3">
            <h4 className="font-black uppercase tracking-wider text-stone-900">INFO</h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li><Link href="/church-print-services" className="hover:text-black">Support</Link></li>
              <li><Link href="/church-print-services" className="hover:text-black">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-black">Privacy Policy & GDPR</Link></li>
            </ul>
          </div>

          {/* FOLLOW Column */}
          <div className="space-y-3">
            <h4 className="font-black uppercase tracking-wider text-stone-900">FOLLOW</h4>
            <ul className="space-y-2 text-stone-600 font-medium">
              <li><a href="https://facebook.com/adoptdclothing25/" target="_blank" rel="noopener noreferrer" className="hover:text-black">Facebook</a></li>
              <li><a href="https://www.instagram.com/adoptdchristian" target="_blank" rel="noopener noreferrer" className="hover:text-black">Instagram</a></li>
              <li><Link href="/blog" className="hover:text-black">Blog & Journal</Link></li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-stone-200 text-center text-xs text-stone-500">
          <p>Copyright 2026 AdoptdClothing. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
