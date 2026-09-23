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
      {/* 1. Teal Green Newsletter Block (#00736a) - Full Width Rectangular Box */}
      <div className="w-full bg-[#00736a] text-white py-16 sm:py-24 rounded-none border-y border-[#005c55]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="space-y-3">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Join Our Newsletter
            </h3>
            <p className="text-teal-50 text-base sm:text-lg leading-relaxed">
              Be part of something brighter. It’s not about sales — it’s about community, connection, and sharing how we spread God’s light.
            </p>
          </div>

          {subscribed ? (
            <div className="flex items-center justify-center space-x-2 text-white bg-teal-800/60 border border-teal-400/40 p-4 rounded-xl max-w-md mx-auto">
              <CheckCircle2 className="w-5 h-5 text-teal-200" />
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

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-grow px-4 py-3.5 bg-white text-stone-900 placeholder-stone-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm shadow-sm font-medium"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-[#030303] text-white hover:bg-stone-800 font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-md disabled:opacity-50"
                >
                  {loading ? '...' : 'Subscribe'}
                </button>
              </div>
              {errorMsg && <p className="text-xs text-rose-200">{errorMsg}</p>}
            </form>
          )}

          {/* Social Follow Links */}
          <div className="flex items-center justify-center space-x-8 pt-4 text-xs font-bold uppercase tracking-wider text-teal-100">
            <a
              href="https://facebook.com/adoptdclothing25/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <Facebook className="w-4 h-4" />
              <span>Follow</span>
            </a>
            <a
              href="https://www.instagram.com/adoptdchristian"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 hover:text-white transition"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow</span>
            </a>
          </div>

          <div className="pt-2">
            <span className="font-extrabold text-xs sm:text-sm tracking-[0.25em] text-teal-200 uppercase">
              @adoptd-CLOTHING
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Dark Footer (#030303) */}
      <div className="bg-[#030303] text-white pt-16 pb-12 border-t border-stone-800">
        <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 space-y-12">
          
          {/* 4 Footer Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
            
            {/* SHOP Column */}
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-wider text-white">SHOP</h4>
              <ul className="space-y-2.5 text-stone-400 font-medium">
                <li><Link href="/shop" className="hover:text-[#00736a] transition">Christmas</Link></li>
                <li><Link href="/shop/tee-shirts" className="hover:text-[#00736a] transition">T-Shirts</Link></li>
                <li><Link href="/shop/christian-hoodies-uk" className="hover:text-[#00736a] transition">Hoodies</Link></li>
                <li><Link href="/shop/sweaters" className="hover:text-[#00736a] transition">Sweaters</Link></li>
                <li><Link href="/shop/christian-bags" className="hover:text-[#00736a] transition">Tote Bags</Link></li>
                <li><Link href="/church-print-services" className="hover:text-[#00736a] transition">Church & Ministry Print Services</Link></li>
                <li><Link href="/shop" className="hover:text-[#00736a] transition">Blaze city Merch</Link></li>
              </ul>
            </div>

            {/* COMPANY Column */}
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-wider text-white">COMPANY</h4>
              <ul className="space-y-2.5 text-stone-400 font-medium">
                <li><Link href="/" className="hover:text-[#00736a] transition">Home</Link></li>
                <li><Link href="/church-print-services" className="hover:text-[#00736a] transition">Church & Ministry Print Services</Link></li>
                <li><Link href="/shop" className="hover:text-[#00736a] transition">Blaze city Merch</Link></li>
              </ul>
            </div>

            {/* INFO Column */}
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-wider text-white">INFO</h4>
              <ul className="space-y-2.5 text-stone-400 font-medium">
                <li><Link href="/church-print-services" className="hover:text-[#00736a] transition">Support</Link></li>
                <li><Link href="/church-print-services" className="hover:text-[#00736a] transition">Contact</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-[#00736a] transition">Privacy Policy & GDPR</Link></li>
              </ul>
            </div>

            {/* FOLLOW Column */}
            <div className="space-y-4">
              <h4 className="font-black uppercase tracking-wider text-white">FOLLOW</h4>
              <ul className="space-y-2.5 text-stone-400 font-medium">
                <li><a href="https://facebook.com/adoptdclothing25/" target="_blank" rel="noopener noreferrer" className="hover:text-[#00736a] transition">Facebook</a></li>
                <li><a href="https://www.instagram.com/adoptdchristian" target="_blank" rel="noopener noreferrer" className="hover:text-[#00736a] transition">Instagram</a></li>
                <li><Link href="/blog" className="hover:text-[#00736a] transition">Blog & Journal</Link></li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
            <p>Copyright 2026 AdoptdClothing. All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
}
