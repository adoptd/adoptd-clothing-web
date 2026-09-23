import React from 'react';
import Image from 'next/image';
import { Church, CheckCircle, ShieldCheck, Mail, Sparkles, Send } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Church & Ministry Print Services | Custom Christian Apparel',
  description: 'Custom screen printing and embroidery for UK churches, youth ministries, worship teams, and Christian conferences.',
  slug: 'church-print-services',
});

export default function ChurchPrintServicesPage() {
  return (
    <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-5xl lg:max-w-6xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-stone-100 text-stone-800 px-4 py-1.5 rounded-full text-xs font-semibold">
          <Church className="w-4 h-4 text-stone-900" />
          <span>Custom Ministry Solutions</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-stone-950 whitespace-normal sm:whitespace-nowrap">
          Church & Ministry Print Services
        </h1>
        <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
          Premium, ethically sourced custom t-shirts, hoodies, and tote bags for your church staff, youth camps, worship ministries, and outreach events.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#00736a] text-white rounded-2xl p-8 sm:p-10 space-y-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-white text-[#00736a] rounded-xl flex items-center justify-center font-black text-xl shadow-sm">
              1
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Heavyweight Quality</h3>
            <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal">
              We supply high-grade organic ringspun cotton and cozy heavyweight fleece that your congregation will genuinely love wearing weekly.
            </p>
          </div>
        </div>

        <div className="bg-[#00736a] text-white rounded-2xl p-8 sm:p-10 space-y-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-white text-[#00736a] rounded-xl flex items-center justify-center font-black text-xl shadow-sm">
              2
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Bulk Ministry Pricing</h3>
            <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal">
              Tiered volume discounts designed for church budgets, youth groups, and conference merchandise without compromising quality.
            </p>
          </div>
        </div>

        <div className="bg-[#00736a] text-white rounded-2xl p-8 sm:p-10 space-y-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-white text-[#00736a] rounded-xl flex items-center justify-center font-black text-xl shadow-sm">
              3
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">Custom Design Support</h3>
            <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal">
              Need help polishing your church logo, event theme typography, or choosing color combinations? We help guide you from concept to delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-white border border-stone-300 rounded-3xl p-8 sm:p-12 shadow-lg max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif text-2xl font-bold text-stone-950">
            Request A Ministry Quote
          </h2>
          <p className="text-xs text-stone-500">
            Fill out the details below and we will get back to you within 24–48 hours with sample pricing and mockups.
          </p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="Pastor / Leader Name"
                className="w-full px-4 py-3 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-stone-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                Church / Ministry Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Grace Church London"
                className="w-full px-4 py-3 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-stone-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="leader@church.co.uk"
                className="w-full px-4 py-3 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-stone-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
                Estimated Quantity
              </label>
              <select className="w-full px-4 py-3 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-stone-900 focus:outline-none bg-white">
                <option>25 - 50 items</option>
                <option>50 - 100 items</option>
                <option>100 - 250 items</option>
                <option>250+ items</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-stone-700 mb-1">
              Project Details & Garment Types Needed
            </label>
            <textarea
              rows={4}
              placeholder="Tell us about the event, required delivery date, and whether you need hoodies, t-shirts, or tote bags..."
              className="w-full px-4 py-3 border border-stone-300 rounded-lg text-xs focus:ring-2 focus:ring-stone-900 focus:outline-none"
            />
          </div>

          <button
            type="button"
            className="w-full py-4 bg-stone-950 text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-stone-800 transition flex items-center justify-center space-x-2 shadow-lg"
          >
            <Send className="w-4 h-4" />
            <span>Send Ministry Inquiry</span>
          </button>
        </form>
      </div>
    </div>
  );
}
