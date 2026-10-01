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

      {/* Inquiry Form Section - Full Width Spread */}
      <div className="w-full bg-[#efefef] rounded-[28px] p-6 sm:p-10 lg:p-14 border border-stone-200/80 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Context & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#00736a] font-bold block">
                Custom Ministry Production
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 leading-tight">
                Request A Ministry Quote
              </h2>
              <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
                Fill out your event and garment requirements. Our dedicated production team will get back to you within 24–48 hours with tiered volume discounts, digital mockups, and fabric recommendations.
              </p>
            </div>

            {/* Value Props List */}
            <div className="space-y-3.5 pt-2 border-t border-stone-300/80">
              <div className="flex items-start space-x-3 text-stone-800 text-sm sm:text-base font-medium">
                <CheckCircle className="w-5 h-5 text-[#00736a] flex-shrink-0 mt-0.5" />
                <span>Free digital mockups & artwork proofing before printing</span>
              </div>
              <div className="flex items-start space-x-3 text-stone-800 text-sm sm:text-base font-medium">
                <CheckCircle className="w-5 h-5 text-[#00736a] flex-shrink-0 mt-0.5" />
                <span>Premium organic ringspun cottons & cozy heavyweight fleece</span>
              </div>
              <div className="flex items-start space-x-3 text-stone-800 text-sm sm:text-base font-medium">
                <CheckCircle className="w-5 h-5 text-[#00736a] flex-shrink-0 mt-0.5" />
                <span>Transparent tiered volume pricing for UK church budgets</span>
              </div>
              <div className="flex items-start space-x-3 text-stone-800 text-sm sm:text-base font-medium">
                <CheckCircle className="w-5 h-5 text-[#00736a] flex-shrink-0 mt-0.5" />
                <span>Tracked Royal Mail & courier delivery direct to your church</span>
              </div>
            </div>

            {/* Direct Email Callout */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 space-y-1 text-sm">
              <p className="text-stone-500 font-medium">Need immediate advice or have ready artwork?</p>
              <p className="font-bold text-[#00736a]">
                <a href="mailto:adoptdclothing@gmail.com" className="hover:underline">
                  adoptdclothing@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Expanded High-Usability Quote Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Pastor / Leader Name"
                    className="w-full px-4 py-3.5 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00736a] focus:outline-none bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Church / Ministry Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grace Church London"
                    className="w-full px-4 py-3.5 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00736a] focus:outline-none bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="leader@church.co.uk"
                    className="w-full px-4 py-3.5 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00736a] focus:outline-none bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Phone / Contact Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 07123 456789"
                    className="w-full px-4 py-3.5 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00736a] focus:outline-none bg-stone-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Garment Types Needed
                  </label>
                  <select className="w-full px-4 py-3.5 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00736a] focus:outline-none bg-stone-50/50 text-stone-800">
                    <option>T-Shirts (Organic Ringspun Cotton)</option>
                    <option>Hoodies (Heavyweight Fleece)</option>
                    <option>Sweaters / Crewnecks</option>
                    <option>Canvas Tote Bags</option>
                    <option>Mixed Apparel Package</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Estimated Quantity
                  </label>
                  <select className="w-full px-4 py-3.5 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00736a] focus:outline-none bg-stone-50/50 text-stone-800">
                    <option>25 - 50 items (Small Group / Staff)</option>
                    <option>50 - 100 items (Youth Camp / Team)</option>
                    <option>100 - 250 items (Church Event)</option>
                    <option>250+ items (Conference / Large Ministry)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                  Project Details, Event Date & Design Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about the event or purpose, required delivery date, preferred garment colors, and whether you already have church logos or scripture artwork..."
                  className="w-full px-4 py-3.5 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00736a] focus:outline-none bg-stone-50/50"
                />
              </div>

              <button
                type="button"
                className="w-full py-5 bg-[#00736a] text-white rounded-xl font-black text-base uppercase tracking-wider hover:bg-[#005c55] transition flex items-center justify-center space-x-2 shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>Send Ministry Inquiry</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
