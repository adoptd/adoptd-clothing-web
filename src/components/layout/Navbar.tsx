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
      {/* Top Teal Green Accent Bar (+35% Size, Uppercase) */}
      <div className="bg-[#00736a] text-white text-sm sm:text-base py-3 sm:py-3.5 px-4 text-center font-black uppercase tracking-wider">
        <span>{settings?.announcementBanner || "WEAR THE WORD. SHARE THE LIGHT."}</span>
      </div>

      {/* Main Black Header Bar */}
      <div className="bg-[#030303] text-white border-b border-stone-800">
        <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2">
          <div className="flex items-center justify-between py-5 sm:py-6 lg:py-8">
            
            {/* Brand Logo - Scaled +25% in Depth with Preserved Vertical Ratio */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="block relative h-20 sm:h-24 lg:h-[120px] w-56 sm:w-80 lg:w-[380px] focus:outline-none transition-transform hover:opacity-95"
                aria-label="Adoptd Christian Clothing Home"
              >
                <Image
                  src="/images/logo.png"
                  alt="Adoptd Christian Clothing Logo"
                  fill
                  priority
                  className="object-contain object-left"
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 340px, 400px"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-12">
              <Link
                href="/"
                className="text-base xl:text-lg font-bold tracking-wide text-white hover:text-[#00736a] transition"
              >
                Home
              </Link>
              <Link
                href="/church-print-services"
                className="text-base xl:text-lg font-bold tracking-wide text-stone-200 hover:text-[#00736a] transition"
              >
                Church & Ministry Print Services
              </Link>
            </nav>

            {/* Right Header: Cart button & Shop Now Button */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              <button
                onClick={openCart}
                className="relative p-2.5 text-white hover:text-[#00736a] transition flex items-center space-x-2 rounded-lg hover:bg-stone-900/80"
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-6 h-6 text-white" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  {hasMounted && totalItems > 0 ? `${totalItems} Items` : '0 Items'}
                </span>
              </button>

              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center justify-center px-6 py-3 bg-[#00736a] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg hover:bg-[#005c55] transition shadow-md"
              >
                Shop Now
              </Link>

              {/* Mobile Menu Toggle */}
              <div className="flex lg:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-white hover:text-[#00736a] transition"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
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
            href="/shop/christian-bags"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-300 border-b border-stone-800"
          >
            Tote Bags
          </Link>
          <Link
            href="/shop/christmas"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-stone-300 border-b border-stone-800"
          >
            Christmas
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
