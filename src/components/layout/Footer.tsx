'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '@/types';

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Hidden honeypot field for spam bots
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
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          honeypot,
          formRenderTime,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setSubscribed(true);
      setEmail('');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section with Anti-Spam Protections */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 sm:p-12 mb-16 shadow-xl">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-stone-400 font-semibold block mb-2">
              Join Our Community
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              Be Part of Something Brighter
            </h3>
            <p className="text-stone-300 text-sm sm:text-base mb-6 leading-relaxed">
              It’s not about sales — it’s about community, connection, and sharing how we spread God’s light.
              Receive encouragement, devotions, and updates on new designs.
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center space-x-2 text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 p-4 rounded-lg">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Thank you for subscribing! Welcome to the family.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                {/* Invisible Honeypot Field (Traps automated spam bots) */}
                <div aria-hidden="true" style={{ display: 'none', position: 'absolute', left: '-9999px' }}>
                  <label htmlFor="website_hp">Leave this field blank</label>
                  <input
                    type="text"
                    id="website_hp"
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
                    placeholder="Enter your email address"
                    required
                    className="flex-grow px-4 py-3 bg-stone-950 border border-stone-700 text-white placeholder-stone-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-white text-stone-950 hover:bg-stone-200 font-semibold text-sm rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
                {errorMsg && <p className="text-xs text-rose-400 text-center">{errorMsg}</p>}
                <p className="text-[11px] text-stone-400 flex items-center justify-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 inline" />
                  <span>We respect your privacy. Unsubscribe at any time. View our <Link href="/privacy-policy" className="underline hover:text-white">Privacy Policy</Link>.</span>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800 text-sm">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif tracking-widest text-2xl font-bold uppercase text-white block">
              ADOPTD
            </span>
            <p className="text-stone-400 text-xs leading-relaxed">
              ADOPTD is an independent Christian clothing brand, created with a simple purpose — to make clothing that carries a message of faith, hope and identity.
            </p>
            <p className="text-stone-500 text-xs italic">
              Small brand. Big message. Jesus at the centre.
            </p>
          </div>

          {/* Shop Categories */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-stone-400 text-xs">
              <li><Link href="/shop/tee-shirts" className="hover:text-white transition">T-Shirts</Link></li>
              <li><Link href="/shop/christian-hoodies-uk" className="hover:text-white transition">Christian Hoodies</Link></li>
              <li><Link href="/shop/sweaters" className="hover:text-white transition">Sweaters</Link></li>
              <li><Link href="/shop/christian-bags" className="hover:text-white transition">Tote Bags</Link></li>
              <li><Link href="/church-print-services" className="hover:text-white transition">Church & Ministry Print Services</Link></li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Company & Info</h4>
            <ul className="space-y-2 text-stone-400 text-xs">
              <li><Link href="/blog" className="hover:text-white transition">Blog & Devotionals</Link></li>
              <li><Link href="/church-print-services" className="hover:text-white transition">Custom Ministry Printing</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy & GDPR</Link></li>
              <li><Link href="/privacy-policy#terms" className="hover:text-white transition">Terms & Shipping</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">Connect</h4>
            <p className="text-stone-400 text-xs">
              Questions or custom ministry bulk inquiries?
            </p>
            <p className="text-stone-200 text-xs font-medium">
              {settings?.contactEmail || "hello@adoptdchristianclothing.co.uk"}
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href={settings?.facebookUrl || "https://facebook.com/adoptdclothing25/"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-lg transition"
                aria-label="Follow on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings?.instagramUrl || "https://www.instagram.com/adoptdchristian"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white rounded-lg transition"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Adoptd Christian Clothing. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Wear The Word. Share The Light.</p>
        </div>
      </div>
    </footer>
  );
}
