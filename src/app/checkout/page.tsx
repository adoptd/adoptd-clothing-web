'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { StripeEmbeddedCheckout } from '@/components/checkout/StripeEmbeddedCheckout';
import { ArrowLeft, ShoppingBag, ShieldCheck, Lock, Truck } from 'lucide-react';

export default function CheckoutPage() {
  const { items, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const shippingFee = subtotal >= 40 || items.length === 0 ? 0 : 3.95;
  const total = subtotal + shippingFee;

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-stone-600 hover:text-stone-950 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Stripe Elements Payment & Delivery Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold block mb-1">
                Final Step
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-black text-stone-950">
                Secure Checkout
              </h1>
            </div>

            <StripeEmbeddedCheckout />
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 sticky top-28">
              <h2 className="font-serif text-xl font-bold text-stone-950 border-b border-stone-100 pb-4">
                Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
              </h2>

              {/* Items List */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-2 divide-y divide-stone-100">
                {items.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex space-x-3 items-center">
                    <div className="relative w-16 h-18 rounded-md overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-semibold text-stone-900 line-clamp-1">{item.name}</p>
                      <p className="text-stone-500 text-xs mt-0.5">
                        {item.color} • Size {item.size} • Qty {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-sm text-stone-900">
                      £{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Totals */}
              <div className="pt-4 border-t border-stone-200 space-y-2.5 text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tracked UK Shipping</span>
                  <span className="font-semibold text-stone-900">
                    {shippingFee === 0 ? 'FREE' : `£${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-950 pt-2 border-t border-stone-100">
                  <span>Total Due</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badges */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-stone-600 text-xs space-y-2">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-[#00736a] flex-shrink-0" />
                  <span>Stripe 256-bit SSL encrypted checkout</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-stone-900 flex-shrink-0" />
                  <span>Dispatched with tracked Royal Mail delivery</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
