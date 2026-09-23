'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Heart } from 'lucide-react';
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

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'T-Shirts', href: '/shop/tee-shirts' },
    { label: 'Hoodies', href: '/shop/christian-hoodies-uk' },
    { label: 'Sweaters', href: '/shop/sweaters' },
    { label: 'Tote Bags', href: '/shop/christian-bags' },
    { label: 'Blog & Faith', href: '/blog' },
    { label: 'Church Print Services', href: '/church-print-services' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top Announcement Bar */}
      {settings?.announcementActive && (
        <div className="bg-stone-900 text-stone-100 text-xs py-2 px-4 text-center font-medium tracking-wide">
          <span>{settings.announcementBanner || "Free UK Delivery on orders over £40"}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-950 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex flex-col items-center">
              <span className="font-serif tracking-widest text-2xl sm:text-3xl font-bold uppercase text-stone-950">
                ADOPTD
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-semibold -mt-1">
                Christian Clothing
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-stone-700 hover:text-stone-950 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-900 transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Header Icons (Cart) */}
          <div className="flex items-center space-x-4">
            <button
              onClick={openCart}
              className="relative p-2 text-stone-800 hover:text-stone-950 transition flex items-center space-x-2 rounded-full hover:bg-stone-100"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {hasMounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-stone-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
              <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-stone-800">
                {hasMounted && totalItems > 0 ? `${totalItems} items` : '0 Items'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-stone-800 hover:text-stone-950 hover:pl-2 transition-all border-b border-stone-100"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openCart();
              }}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-stone-900 text-white rounded-md font-medium text-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Shopping Bag ({hasMounted ? totalItems : 0})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
