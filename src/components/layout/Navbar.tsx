'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { SiteSettings } from '@/types';

interface NavbarProps {
  settings?: SiteSettings;
}

export function Navbar({ settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);

  useEffect(() => {
    setHasMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <header className="sticky top-0 z-40 transition-all">
      {/* Top Teal Green Accent Bar */}
      <div className="bg-[#00736a] text-white text-xs py-2 px-4 text-center font-medium tracking-wide">
        <span>{settings?.announcementBanner || "Wear The Word. Share The Light."}</span>
      </div>

      {/* Main Black Header Bar */}
      <div className="bg-[#030303] text-white border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            
            {/* Brand Logo - Local Static Image */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="block relative w-48 sm:w-60 h-14 sm:h-16">
                <Image
                  src="/images/logo.png"
                  alt="Adoptd Christian Clothing Logo"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 200px, 240px"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className="text-sm font-semibold tracking-wide text-white hover:text-[#00736a] transition"
              >
                Home
              </Link>
              <Link
                href="/church-print-services"
                className="text-sm font-semibold tracking-wide text-stone-200 hover:text-[#00736a] transition"
              >
                Church & Ministry Print Services
              </Link>
              <Link
                href="/shop"
                className="text-sm font-semibold tracking-wide text-stone-200 hover:text-[#00736a] transition"
              >
                Blaze city Merch
              </Link>
            </nav>

            {/* Right Header: Cart button & Shop Now Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={openCart}
                className="relative p-2 text-white hover:text-[#00736a] transition flex items-center space-x-2"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-5 h-5 text-white" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  {hasMounted && totalItems > 0 ? `${totalItems} Items` : '0 Items'}
                </span>
              </button>

              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-[#00736a] text-white text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#005c55] transition shadow-md"
              >
                Shop Now
              </Link>

              {/* Mobile Menu Toggle */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-white"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-[#0a0a0a] text-white px-6 pt-4 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-white border-b border-stone-800"
          >
            Home
          </Link>
          <Link
            href="/shop/tee-shirts"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-300 border-b border-stone-800"
          >
            T-Shirts
          </Link>
          <Link
            href="/shop/christian-hoodies-uk"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-300 border-b border-stone-800"
          >
            Hoodies
          </Link>
          <Link
            href="/shop/sweaters"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-300 border-b border-stone-800"
          >
            Sweaters
          </Link>
          <Link
            href="/shop/christian-bags"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-300 border-b border-stone-800"
          >
            Tote Bags
          </Link>
          <Link
            href="/church-print-services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-300 border-b border-stone-800"
          >
            Church & Ministry Print Services
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-300 border-b border-stone-800"
          >
            Blog
          </Link>
          <div className="pt-2">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-5 py-3 bg-[#00736a] text-white text-xs font-bold uppercase tracking-wider rounded-md"
            >
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
