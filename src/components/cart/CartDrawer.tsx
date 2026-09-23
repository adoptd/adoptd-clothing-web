'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal, getTotalItems } = useCartStore();

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const totalItems = getTotalItems();
  const freeShippingThreshold = 40.0;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-6 h-6 text-stone-900" />
              <h2 className="font-serif text-xl font-bold text-stone-950">
                Your Shopping Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-stone-500 hover:text-stone-950 rounded-full hover:bg-stone-100 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-stone-50 p-4 border-b border-stone-200 text-sm">
            <div className="flex items-center space-x-2 mb-2 text-stone-700">
              <Truck className="w-4 h-4 text-stone-900" />
              <span>
                {remainingForFreeShipping === 0 ? (
                  <strong className="text-emerald-700 font-semibold">🎉 You have unlocked Free UK Delivery!</strong>
                ) : (
                  <>
                    Add <strong>£{remainingForFreeShipping.toFixed(2)}</strong> more for <strong>Free UK Delivery</strong>
                  </>
                )}
              </span>
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-stone-900 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">Your bag is empty</h3>
                <p className="text-sm text-stone-500 max-w-xs mb-6">
                  Explore our latest Christian hoodies, tees, and tote bags carrying God's word.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-3 bg-stone-900 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex space-x-4 pb-6 border-b border-stone-100">
                  <div className="w-20 h-24 relative rounded-md overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-bold text-base text-stone-900 hover:underline line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition ml-2"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Color: <span className="text-stone-700 font-medium">{item.color}</span> | Size: <span className="text-stone-700 font-medium">{item.size}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-bold text-base text-stone-950">
                        £{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50/50 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-stone-600">
                  <span className="text-base">Subtotal</span>
                  <span className="font-bold text-lg text-stone-900">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-stone-500">
                  <span>Shipping</span>
                  <span>{subtotal >= freeShippingThreshold ? 'Free' : 'Calculated at checkout'}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full py-4 px-6 bg-stone-950 text-white rounded-lg font-bold text-sm tracking-wide uppercase flex items-center justify-center space-x-2 hover:bg-stone-800 transition shadow-lg"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
