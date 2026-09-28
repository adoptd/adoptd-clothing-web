'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '@/types';

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const [name, setName] = useState('');
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
        body: JSON.stringify({ email, name, honeypot, formRenderTime }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to subscribe');

      setSubscribed(true);
      setEmail('');
      setName('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Error subscribing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-white text-stone-900">
      {/* 1. Teal Green Newsletter Block (#00736a) - Full Width 2-Column */}
      <div className="w-full bg-[#00736a] text-white py-12 sm:py-16">
        <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Column: Heading & Subtitle */}
            <div className="space-y-2 text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white">
                JOIN OUR NEWSLETTER
              </h3>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-xl">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First Name (optional)"
                      className="w-full px-4 py-2.5 bg-transparent border border-white/80 text-white placeholder-white/80 rounded-sm focus:outline-none focus:ring-1 focus:ring-white text-sm"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      required
                      className="w-full px-4 py-2.5 bg-transparent border border-white/80 text-white placeholder-white/80 rounded-sm focus:outline-none focus:ring-1 focus:ring-white text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-white text-[#00736a] hover:bg-stone-100 font-bold text-xs uppercase tracking-widest rounded-full transition shadow-sm disabled:opacity-50 text-center"
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
      <div className="bg-[#424242] text-white pt-14 pb-20">
        <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 space-y-12">
          
          {/* Top Row: Social Icons */}
          <div className="flex items-center space-x-5 text-white">
            <a
              href={settings?.facebookUrl || "https://www.facebook.com/adoptdclothing25/"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6 fill-current" />
            </a>
            <a
              href={settings?.instagramUrl || "https://www.instagram.com/adoptdchristian"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>

          {/* Large Brand Heading */}
          <div>
            <a
              href={settings?.instagramUrl || "https://www.instagram.com/adoptdchristian"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-90 transition"
            >
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
                @ADOPTD-CLOTHING
              </h3>
            </a>
          </div>

          {/* 3 Equilateral Footer Columns Across Full Width with Enlarged Typography */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 text-base sm:text-lg">
            
            {/* SHOP Column */}
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-wider text-white text-base sm:text-lg lg:text-xl">SHOP</h4>
              <ul className="space-y-2.5 text-stone-200 font-medium">
                <li className="flex flex-wrap gap-x-4">
                  <Link href="/shop" className="hover:text-white transition">Christmas</Link>
                  <Link href="/shop/tee-shirts" className="hover:text-white transition">T-Shirts</Link>
                  <Link href="/shop/christian-hoodies-uk" className="hover:text-white transition">Hoodies</Link>
                  <Link href="/shop/christian-bags" className="hover:text-white transition">Tote Bags</Link>
                </li>
                <li><Link href="/church-print-services" className="hover:text-white transition whitespace-nowrap">Church & Ministry Print Services</Link></li>
                <li><Link href="/shop" className="hover:text-white transition">Blaze city Merch</Link></li>
              </ul>
            </div>

            {/* COMPANY Column */}
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-wider text-white text-base sm:text-lg lg:text-xl">COMPANY</h4>
              <ul className="space-y-2.5 text-stone-200 font-medium">
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              </ul>
            </div>

            {/* INFO Column */}
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-wider text-white text-base sm:text-lg lg:text-xl">INFO</h4>
              <ul className="space-y-2.5 text-stone-200 font-medium">
                <li className="flex flex-wrap gap-x-4">
                  <Link href="/blog" className="hover:text-white transition">Blog</Link>
                  <Link href="/church-print-services" className="hover:text-white transition">Support</Link>
                  <Link href="/church-print-services" className="hover:text-white transition">Contact</Link>
                </li>
                <li className="flex flex-wrap gap-x-4">
                  <Link href="/shop" className="hover:text-white transition">My account</Link>
                  <Link href="/sitemap" className="hover:text-white transition">Sitemap</Link>
                  <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-stone-600/40 text-sm sm:text-base text-stone-300">
            <p>Copyright 2026 AdoptdClothing. All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
