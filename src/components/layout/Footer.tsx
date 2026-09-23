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
    <footer className="bg-white text-stone-900">
      {/* 1. Teal Green Newsletter Block (#54a69b) - Full Width 2-Column */}
      <div className="w-full bg-[#54a69b] text-white py-12 sm:py-16">
        <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Column: Heading & Subtitle */}
            <div className="space-y-2 text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
                JOIN OUR NEWSLETTER
              </h3>
              <p className="text-teal-50 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-xl">
                Be part of something brighter. It’s not about sales — it’s about community, connection, and sharing how we spread God’s light.
              </p>
            </div>

            {/* Right Column: Form (Stretched Full Width Across Column) */}
            <div className="w-full">
              {subscribed ? (
                <div className="bg-white/20 border border-white text-white p-3.5 rounded-lg text-sm font-semibold text-center flex items-center justify-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>Success! Thank you for subscribing.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3 w-full">
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

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-2.5 bg-transparent border border-white/80 text-white placeholder-white/80 rounded-sm focus:outline-none focus:ring-1 focus:ring-white text-sm"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-white text-[#54a69b] hover:bg-stone-100 font-bold text-xs uppercase tracking-widest rounded-full transition shadow-sm disabled:opacity-50 text-center"
                  >
                    {loading ? '...' : 'SUBSCRIBE'}
                  </button>
                  {errorMsg && <p className="text-xs text-rose-100">{errorMsg}</p>}
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Dark Charcoal Footer (#424242) */}
      <div className="bg-[#424242] text-white pt-12 pb-16">
        <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 space-y-10">
          
          {/* Top Row: Social Icons */}
          <div className="flex items-center space-x-4 text-white">
            <a
              href="https://facebook.com/adoptdclothing25/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 fill-current" />
            </a>
            <a
              href="https://www.instagram.com/adoptdchristian"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Large Brand Heading */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              @ADOPTD-CLOTHING
            </h3>
          </div>

          {/* 4 Footer Columns (Tighter Column Spacing & Larger Typography) */}
          <div className="max-w-4xl lg:max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 text-sm sm:text-[15px]">
            
            {/* SHOP Column */}
            <div className="space-y-3.5">
              <h4 className="font-black uppercase tracking-wider text-white text-sm sm:text-base">SHOP</h4>
              <ul className="space-y-2 text-stone-200 font-medium">
                <li className="flex flex-wrap gap-x-3">
                  <Link href="/shop" className="hover:text-white transition">Christmas</Link>
                  <Link href="/shop/tee-shirts" className="hover:text-white transition">T-Shirts</Link>
                  <Link href="/shop/christian-hoodies-uk" className="hover:text-white transition">Hoodies</Link>
                </li>
                <li className="flex flex-wrap gap-x-3">
                  <Link href="/shop/sweaters" className="hover:text-white transition">Sweaters</Link>
                  <Link href="/shop/christian-bags" className="hover:text-white transition">Tote Bags</Link>
                </li>
                <li><Link href="/church-print-services" className="hover:text-white transition">Church & Ministry Print Services</Link></li>
                <li><Link href="/shop" className="hover:text-white transition">Blaze city Merch</Link></li>
              </ul>
            </div>

            {/* COMPANY Column */}
            <div className="space-y-3.5">
              <h4 className="font-black uppercase tracking-wider text-white text-sm sm:text-base">COMPANY</h4>
              <ul className="space-y-2 text-stone-200 font-medium">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li><Link href="/church-print-services" className="hover:text-white transition">Church & Ministry Print Services</Link></li>
                <li><Link href="/shop" className="hover:text-white transition">Blaze city Merch</Link></li>
              </ul>
            </div>

            {/* INFO Column */}
            <div className="space-y-3.5">
              <h4 className="font-black uppercase tracking-wider text-white text-sm sm:text-base">INFO</h4>
              <ul className="space-y-2 text-stone-200 font-medium">
                <li className="flex flex-wrap gap-x-3">
                  <Link href="/church-print-services" className="hover:text-white transition">Support</Link>
                  <Link href="/church-print-services" className="hover:text-white transition">Contact</Link>
                  <Link href="/shop" className="hover:text-white transition">My account</Link>
                </li>
              </ul>
            </div>

            {/* FOLLOW Column */}
            <div className="space-y-3.5">
              <h4 className="font-black uppercase tracking-wider text-white text-sm sm:text-base">FOLLOW</h4>
              <ul className="space-y-2 text-stone-200 font-medium">
                <li className="flex flex-wrap gap-x-3">
                  <Link href="/shop/christian-bags" className="hover:text-white transition">Tote Bags</Link>
                  <Link href="/shop" className="hover:text-white transition">Christmas</Link>
                  <Link href="/shop/sweaters" className="hover:text-white transition">Sweaters</Link>
                </li>
                <li className="flex flex-wrap gap-x-3">
                  <Link href="/shop/christian-hoodies-uk" className="hover:text-white transition">Hoodies</Link>
                  <Link href="/shop/tee-shirts" className="hover:text-white transition">T-Shirts</Link>
                  <Link href="/church-print-services" className="hover:text-white transition">Contact</Link>
                </li>
                <li className="flex flex-wrap gap-x-3">
                  <Link href="/shop" className="hover:text-white transition">My account</Link>
                  <Link href="/church-print-services" className="hover:text-white transition">Support</Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="pt-8 text-xs sm:text-sm text-stone-300">
            <p>Copyright 2026 AdoptdClothing. All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
