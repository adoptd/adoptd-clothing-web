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
    <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 py-16 space-y-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-stone-200 pb-8">
          <div className="inline-flex items-center space-x-2 text-stone-700 bg-stone-100 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-stone-900" />
            <span>UK & EU GDPR Compliant</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-stone-950">
            Privacy Policy & Data Protection
          </h1>
          <p className="text-sm text-stone-500">
            Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose-article text-stone-700 text-base sm:text-lg leading-relaxed space-y-10">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">1. Who We Are</h2>
            <p>
              ADOPTD Christian Clothing (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is an independent UK apparel brand operating at <strong>adoptdchristianclothing.co.uk</strong>. We are committed to protecting and respecting your personal data in accordance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">2. Information We Collect</h2>
            <p>We only collect personal information that is necessary to fulfill your orders, respond to your inquiries, or provide you with updates when you explicitly consent:</p>
            <ul className="list-disc pl-6 space-y-2 text-stone-600 text-sm sm:text-base">
              <li><strong>Order Fulfillment Information:</strong> Your name, delivery address, billing address, phone number, and email address when you complete an order.</li>
              <li><strong>Customer Support &amp; Contact Inquiries:</strong> Your name, email address, topic/inquiry category, order number (if applicable), and message content when you submit an inquiry through our Support/Contact form or via email. This data is used exclusively to assist you with your inquiry and provide customer care.</li>
              <li><strong>Newsletter Data:</strong> Your email address, optional first name, and opt-in timestamp when you voluntarily subscribe to our community newsletter.</li>
              <li><strong>Technical Data:</strong> Essential device and browser data to maintain session security, prevent spam/abuse, and ensure shopping cart persistence.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">3. Payment Processing &amp; Stripe</h2>
            <p>
              We use <strong>Stripe Payments Europe, Ltd.</strong> as our secure payment gateway. When you make a purchase, your payment card details are collected and processed directly by Stripe using 256-bit SSL encryption.
            </p>
            <p className="text-sm text-stone-500 italic">
              *We never store, log, or have access to your full credit/debit card numbers or security CVV codes on our servers.*
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">4. Third-Party Data Processors</h2>
            <p>We work with vetted processors to operate our storefront securely:</p>
            <ul className="list-disc pl-6 space-y-2 text-stone-600 text-sm sm:text-base">
              <li><strong>Stripe (Ireland / UK):</strong> Payment processing and fraud prevention.</li>
              <li><strong>Airtable (Formagrid, Inc.):</strong> Secure cloud database management for order fulfillment records, subscriber lists, and customer support logs.</li>
              <li><strong>Vercel, Inc.:</strong> Web application hosting, serverless routing, and global CDN delivery.</li>
              <li><strong>Royal Mail / Courier Services:</strong> Delivering your packages to your specified address.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">5. Your GDPR Data Rights</h2>
            <p>Under UK and EU data protection laws, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 text-stone-600 text-sm sm:text-base">
              <li><strong>Right of Access:</strong> You can request a copy of the personal data we hold about you.</li>
              <li><strong>Right to Rectification:</strong> You can ask us to correct inaccurate or incomplete data.</li>
              <li><strong>Right to Erasure (&ldquo;Right to be Forgotten&rdquo;):</strong> You can request the deletion of your personal data.</li>
              <li><strong>Right to Withdraw Consent:</strong> You can unsubscribe from our newsletter at any time via the link in our emails or by contacting us.</li>
            </ul>
          </section>

          <section className="space-y-4 pt-6 border-t border-stone-200">
            <h2 className="font-serif text-2xl font-bold text-stone-900">6. Contact Us</h2>
            <p>
              If you have questions about this privacy policy, your personal data, or wish to exercise your rights, please reach out to us:
            </p>
            <div className="space-y-2 text-base sm:text-lg">
              <p className="font-medium text-stone-900">
                Email: <a href="mailto:adoptdclothing@gmail.com" className="underline hover:text-[#00736a] text-[#00736a]">adoptdclothing@gmail.com</a>
              </p>
              <p className="text-stone-600 text-sm">
                Or submit a message via our <a href="/contact" className="underline hover:text-[#00736a] text-[#00736a] font-medium">Support &amp; Contact Form</a>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
