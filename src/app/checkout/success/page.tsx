import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ArrowRight, Heart, Mail } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Order Confirmed | Adoptd Christian Clothing',
  description: 'Thank you for your order and for supporting an independent Christian apparel brand.',
});

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 py-20 text-center space-y-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-bold">
            Payment Successful
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-stone-950">
            Thank You For Your Order!
          </h1>
          <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Your payment has been processed securely. A confirmation email with your order summary and tracking number has been sent to your email.
          </p>
        </div>

        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto text-left space-y-4">
          <div className="flex items-center space-x-3 text-stone-900 font-bold text-base border-b border-stone-200 pb-3">
            <Heart className="w-5 h-5 text-rose-600" />
            <span>Supporting Independent Christian Ministry</span>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed">
            Every order helps us continue designing and creating clothing that shares the gospel of Jesus with boldness and grace. We pray this apparel blesses you and sparks conversations wherever you go!
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-stone-950 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-stone-800 transition shadow-lg"
          >
            <span>Continue Exploring</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
