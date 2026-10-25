import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Layers3, Palette, Shirt, Zap, ShieldCheck, Truck, Users, MessageCircle, Sparkles } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'DTF Printing & Bulk Garment Printing | Adoptd Print Co.',
  description: 'Custom DTF printing for clothing brands, businesses, schools, clubs, churches and events. Flexible bulk garment printing from Adoptd Print Co. in Loughborough, with UK delivery.',
  slug: 'dtf-printing',
});

const teal = '#00736a';

const features = [
  { icon: Palette, title: 'Full-colour artwork', text: 'Detailed logos, bold graphics and multi-colour designs, without charging by the number of colours.' },
  { icon: Layers3, title: 'Flexible garment choices', text: 'A practical option for many cotton, polyester and blended garments. Tell us what you are printing on and we will check suitability.' },
  { icon: Users, title: 'Orders for your organisation', text: 'From staff uniforms and club kit to event T-shirts and clothing-brand runs, we can discuss the right setup for your batch.' },
  { icon: ShieldCheck, title: 'Quality checked', text: 'We review artwork and garment requirements with you before production, so expectations are clear from the start.' },
  { icon: Zap, title: 'A straightforward process', text: 'Share your design, quantities and deadline. We will come back with the options and a quote before you commit.' },
  { icon: Truck, title: 'UK-wide enquiries', text: 'Based in Loughborough, we welcome enquiries from local organisations and customers around the UK.' },
];

const steps = [
  ['01', 'Tell us what you need', 'Send your design, garment type, quantity, sizes and the date you need the order by.'],
  ['02', 'Receive a quote', 'We will review your brief and confirm pricing, artwork requirements and an estimated turnaround.'],
  ['03', 'Approve the details', 'We agree the artwork, garment choices and order details with you before production begins.'],
  ['04', 'Print and prepare', 'Your order is produced, checked and arranged for collection or delivery as agreed.'],
];

const audiences = [
  ['Clothing brands', 'Small collections, merchandise drops and repeat branded orders.'],
  ['Businesses & workwear', 'Staff T-shirts, uniforms, trade clothing and promotional garments.'],
  ['Schools & sports clubs', 'Team kit, leavers’ shirts, club apparel and fundraiser merchandise.'],
  ['Churches & charities', 'Volunteer clothing, youth events, ministry merchandise and community campaigns.'],
  ['Events & organisations', 'Festival shirts, group orders, conferences and one-off campaigns.'],
  ['Trade & resellers', 'Production enquiries from designers and businesses ordering on behalf of clients.'],
];

const faqs = [
  ['What is DTF printing?', 'DTF means direct-to-film printing. Artwork is printed onto a special film, then transferred to a garment using heat and pressure. It is suited to many full-colour designs and can work across a range of fabric types, subject to the garment and transfer specifications.'],
  ['What is your minimum order?', 'Minimum quantities can depend on the design, garment and type of order. Tell us what you have in mind and we will confirm what is practical before you commit.'],
  ['Can I supply my own garments?', 'Please mention this in your enquiry. We will confirm whether the garments are suitable and agree the process before accepting the order.'],
  ['How much does bulk printing cost?', 'Pricing depends on garment type, print size and placement, number of colours, quantity, artwork and delivery. Larger quantities may change the unit price. We provide a quote based on your specific brief.'],
  ['How quickly can you print an order?', 'Turnaround depends on order size, garment availability and artwork approval. Include your deadline in the enquiry so we can confirm what is achievable before you place an order.'],
  ['Do you deliver across the UK?', 'We welcome enquiries from across the UK. Collection or delivery options and costs will be confirmed with your quote.'],
];

export default function DtfPrintingPage() {
  return (
    <main className="bg-white text-stone-900">
      <div className="bg-[#375357] text-white">
        <div className="mx-auto max-w-7xl px-5 py-3 text-center text-xs sm:text-sm font-medium tracking-wide">
          BULK GARMENT PRINTING · LOUGHBOROUGH · UK-WIDE ENQUIRIES
        </div>
      </div>

      <section className="relative overflow-hidden bg-[#375357] text-white">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute -right-20 -top-24 h-96 w-96 rounded-full border-[44px] border-white/20" />
          <div className="absolute -bottom-44 right-1/4 h-[28rem] w-[28rem] rounded-full border-[1px] border-white/30" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em]">
              <Sparkles className="h-4 w-4" /> Adoptd Print Co.
            </div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[.22em] text-teal-100">Custom DTF & bulk garment printing</p>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Your design.<br /><span className="text-[#bfe5dc]">Printed to stand out.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
              Custom garment printing for businesses, clothing brands, schools, clubs, churches and events. Tell us what you’re making and how many you need — we’ll help you find the right print solution.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-[#375357] transition hover:bg-[#e9f3f0]">
                Request a quote <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#how-it-works" className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
                How it works
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/85">
              {['Full-colour designs', 'Bulk order enquiries', 'Friendly, direct service'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#bfe5dc]" />{item}</span>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-sm sm:p-6">
            <div className="rounded-[1.5rem] bg-white p-5 text-stone-900 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-[#00736a]">Made for your team</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">One order. Your whole look.</h2>
                </div>
                <div className="rounded-2xl bg-[#e8f3f0] p-3 text-[#00736a]"><Shirt className="h-7 w-7" /></div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#f4f7f6] p-4"><div className="mb-3 h-3 w-16 rounded-full bg-[#375357]" /><div className="text-sm font-bold">Teamwear</div><div className="mt-1 text-xs text-stone-500">Clubs & groups</div></div>
                <div className="rounded-2xl bg-[#f4f7f6] p-4"><div className="mb-3 h-3 w-16 rounded-full bg-[#00736a]" /><div className="text-sm font-bold">Workwear</div><div className="mt-1 text-xs text-stone-500">Business & trade</div></div>
                <div className="rounded-2xl bg-[#f4f7f6] p-4"><div className="mb-3 h-3 w-16 rounded-full bg-[#000000]" /><div className="text-sm font-bold">Brand merch</div><div className="mt-1 text-xs text-stone-500">Your own label</div></div>
                <div className="rounded-2xl bg-[#f4f7f6] p-4"><div className="mb-3 h-3 w-16 rounded-full bg-[#bfe5dc]" /><div className="text-sm font-bold">Event prints</div><div className="mt-1 text-xs text-stone-500">One-off or repeat</div></div>
              </div>
              <p className="mt-5 rounded-xl border border-stone-200 p-4 text-sm leading-6 text-stone-600">Need T-shirts, sweatshirts, hoodies or another garment? Tell us your requirements and we’ll discuss the options.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#00736a]">Printing that fits your project</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">A flexible option for custom garments</h2>
          <p className="mt-4 text-stone-600 leading-7">DTF printing (direct-to-film) lets detailed, full-colour artwork be transferred to many garment types. The right approach depends on the fabric, design and intended use, so we confirm suitability before production.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({icon: Icon, title, text}) => <article key={title} className="rounded-2xl border border-stone-200 p-6 transition hover:-translate-y-1 hover:border-[#00736a]/40 hover:shadow-lg"><div className="mb-4 inline-flex rounded-xl bg-[#00736a]/10 p-3 text-[#00736a]"><Icon className="h-5 w-5" /></div><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{text}</p></article>)}
        </div>
      </section>

      <section className="bg-[#f4f7f6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#00736a]">Who we work with</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">From local teams to growing brands</h2><p className="mt-4 leading-7 text-stone-600">We welcome a wide mix of bulk printing enquiries. Whether you have a clear brief or are still choosing garments, start with a conversation.</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              {audiences.map(([title, text]) => <div key={title} className="rounded-2xl bg-white p-5 shadow-sm"><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{text}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#00736a]">Simple from start to finish</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">How your print order works</h2><p className="mt-4 leading-7 text-stone-600">Clear steps, agreed details and a quote before work gets underway.</p></div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([number,title,text]) => <article key={number} className="rounded-2xl border border-stone-200 p-6"><div className="text-sm font-black tracking-widest text-[#00736a]">{number}</div><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-stone-600">{text}</p></article>)}
        </div>
      </section>

      <section className="bg-[#375357] py-14 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-[1fr_auto] md:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#bfe5dc]">Need a larger run?</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Let’s talk quantities and options.</h2><p className="mt-3 max-w-2xl leading-7 text-white/80">Send the basics and we’ll work through garment choices, print placement, quantities and timing with you.</p></div>
          <a href="#quote" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-[#375357] transition hover:bg-[#e9f3f0]">Get a quote <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#00736a]">DTF printing explained</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Is DTF right for your design?</h2><p className="mt-4 leading-7 text-stone-600">DTF can be useful for full-colour graphics, mixed garment orders and designs with fine detail. Other methods may be a better fit for some projects, especially depending on quantity, fabric and how the garment will be used. We’ll help you weigh up the options.</p></div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 p-6"><h3 className="font-bold">DTF printing</h3><p className="mt-2 text-sm leading-6 text-stone-600">Flexible for colourful artwork and different garment types.</p></div>
          <div className="rounded-2xl border border-stone-200 p-6"><h3 className="font-bold">Screen printing</h3><p className="mt-2 text-sm leading-6 text-stone-600">Worth considering for larger runs and bold, simpler designs.</p></div>
          <div className="rounded-2xl border border-stone-200 p-6"><h3 className="font-bold">Other methods</h3><p className="mt-2 text-sm leading-6 text-stone-600">The best choice depends on your garment, artwork, quantity and budget.</p></div>
        </div>
      </section>

      <section className="bg-[#f4f7f6] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="text-center"><p className="text-xs font-bold uppercase tracking-[.22em] text-[#00736a]">A few common questions</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">DTF printing FAQs</h2></div>
          <div className="mt-8 divide-y divide-stone-200 rounded-2xl bg-white px-5 sm:px-8">
            {faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-bold marker:hidden">{question}<span className="float-right text-[#00736a] transition group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-7 text-stone-600">{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <div className="grid gap-10 rounded-[2rem] bg-[#375357] p-6 text-white sm:p-10 lg:grid-cols-[.85fr_1.15fr] lg:p-14">
          <div><p className="text-xs font-bold uppercase tracking-[.22em] text-[#bfe5dc]">Start your enquiry</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Tell us about your order</h2><p className="mt-4 leading-7 text-white/80">For the most useful quote, include the garments, quantity, print positions and your deadline.</p><div className="mt-8 space-y-4 text-sm text-white/90"><p className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#bfe5dc]" />No obligation to proceed until the quote and details are agreed.</p><p className="flex items-start gap-3"><MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#bfe5dc]" />We can discuss artwork and garment suitability before production.</p></div><a href="mailto:adoptdclothing@gmail.com?subject=Bulk%20printing%20quote" className="mt-8 inline-flex items-center gap-2 font-bold text-white underline underline-offset-4">Or email us directly <ArrowRight className="h-4 w-4" /></a></div>
          <form action="mailto:adoptdclothing@gmail.com" method="post" encType="text/plain" className="space-y-4 rounded-2xl bg-white p-5 text-stone-900 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">Your name *<input required name="Name" autoComplete="name" className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 font-normal outline-none transition focus:border-[#00736a] focus:ring-2 focus:ring-[#00736a]/15" placeholder="Name" /></label>
              <label className="text-sm font-semibold">Business or organisation<input name="Organisation" className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 font-normal outline-none transition focus:border-[#00736a] focus:ring-2 focus:ring-[#00736a]/15" placeholder="Company, club, school..." /></label>
              <label className="text-sm font-semibold">Email address *<input type="email" required name="Email" autoComplete="email" className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 font-normal outline-none transition focus:border-[#00736a] focus:ring-2 focus:ring-[#00736a]/15" placeholder="you@example.com" /></label>
              <label className="text-sm font-semibold">Phone number<input type="tel" name="Phone" autoComplete="tel" className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 font-normal outline-none transition focus:border-[#00736a] focus:ring-2 focus:ring-[#00736a]/15" placeholder="Optional" /></label>
              <label className="text-sm font-semibold">What are you printing? *<select required name="Product" defaultValue="" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal outline-none focus:border-[#00736a]"><option value="" disabled>Select a product</option><option>T-shirts</option><option>Hoodies / sweatshirts</option><option>Workwear / uniforms</option><option>Sportswear / teamwear</option><option>Mixed garments</option><option>Other</option></select></label>
              <label className="text-sm font-semibold">Approximate quantity *<select required name="Quantity" defaultValue="" className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-normal outline-none focus:border-[#00736a]"><option value="" disabled>Select quantity</option><option>10–24</option><option>25–49</option><option>50–99</option><option>100–249</option><option>250+</option><option>Not sure yet</option></select></label>
              <label className="text-sm font-semibold sm:col-span-2">Print details & deadline<textarea name="Details" rows={4} className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 font-normal outline-none focus:border-[#00736a]" placeholder="Print placement, artwork, garment colours, sizes and date needed..." /></label>
            </div>
            <p className="text-xs leading-5 text-stone-500">This opens an email draft in your email app with your enquiry details. Please check the draft and send it to us.</p>
            <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00736a] px-6 py-3.5 font-bold text-white transition hover:bg-[#005e57]">Prepare my quote request <ArrowRight className="h-4 w-4" /></button>
          </form>
        </div>
      </section>
      <div className="border-t border-stone-200 bg-white px-5 py-8 text-center text-sm text-stone-500">Adoptd Print Co. · Bulk garment printing enquiries · Loughborough, UK</div>
    </main>
  );
}
