import React from 'react';
import { constructMetadata } from '@/lib/seo';
import { ShieldCheck, Lock, Mail } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Privacy Policy & GDPR Compliance | Adoptd Christian Clothing',
  description: 'Our commitment to data privacy, GDPR compliance, and how your information is handled securely.',
  slug: 'privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-stone-200 pb-8">
        <div className="inline-flex items-center space-x-2 text-stone-700 bg-stone-100 px-3 py-1 rounded-full text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-stone-900" />
          <span>UK & EU GDPR Compliant</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-950">
          Privacy Policy & Data Protection
        </h1>
        <p className="text-xs text-stone-500">
          Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Content */}
      <div className="prose-article text-stone-700 text-sm sm:text-base leading-relaxed space-y-8">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">1. Who We Are</h2>
          <p>
            ADOPTD Christian Clothing ("we", "us", or "our") is an independent UK apparel brand operating at <strong>adoptdchristianclothing.co.uk</strong>. We are committed to protecting and respecting your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">2. Information We Collect</h2>
          <p>We only collect personal information that is necessary to fulfill your orders or provide you with updates when you explicitly consent:</p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs sm:text-sm">
            <li><strong>Order Fulfillment Information:</strong> Your name, delivery address, billing address, phone number, and email address when you complete an order.</li>
            <li><strong>Newsletter Data:</strong> Your email address and opt-in timestamp when you voluntarily subscribe to our community newsletter.</li>
            <li><strong>Technical Data:</strong> Essential device and browser data to maintain session security and shopping cart persistence.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">3. Payment Processing & Stripe</h2>
          <p>
            We use <strong>Stripe Payments Europe, Ltd.</strong> as our secure payment gateway. When you make a purchase, your payment card details are collected and processed directly by Stripe using 256-bit SSL encryption.
          </p>
          <p className="text-xs text-stone-500 italic">
            *We never store, log, or have access to your full credit/debit card numbers or security CVV codes on our servers.*
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">4. Third-Party Data Processors</h2>
          <p>We work with vetted processors to operate our storefront:</p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs sm:text-sm">
            <li><strong>Stripe (Ireland / UK):</strong> Payment processing and fraud prevention.</li>
            <li><strong>Airtable (Formagrid, Inc.):</strong> Secure database management for order fulfillment records and subscriber lists.</li>
            <li><strong>Vercel, Inc.:</strong> Web application hosting and global CDN delivery.</li>
            <li><strong>Royal Mail / Courier Services:</strong> Delivering your packages to your specified address.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-stone-900">5. Your GDPR Data Rights</h2>
          <p>Under UK and EU data protection laws, you have the following rights:</p>
          <ul className="list-disc pl-5 space-y-1 text-stone-600 text-xs sm:text-sm">
            <li><strong>Right of Access:</strong> You can request a copy of the personal data we hold about you.</li>
            <li><strong>Right to Rectification:</strong> You can ask us to correct inaccurate or incomplete data.</li>
            <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> You can request the deletion of your personal data.</li>
            <li><strong>Right to Withdraw Consent:</strong> You can unsubscribe from our newsletter at any time via the link in our emails or by contacting us.</li>
          </ul>
        </section>

        <section className="space-y-3 pt-6 border-t border-stone-200">
          <h2 className="font-serif text-xl font-bold text-stone-900">6. Contact Us</h2>
          <p>
            If you have questions about this privacy policy, your personal data, or wish to exercise your rights, please reach out to us at:
          </p>
          <p className="font-medium text-stone-900">
            Email: <a href="mailto:hello@adoptdchristianclothing.co.uk" className="underline">hello@adoptdchristianclothing.co.uk</a>
          </p>
        </section>
      </div>
    </div>
  );
}
