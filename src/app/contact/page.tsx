'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Clock, HeartHandshake, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Order & Delivery Question');
  const [orderNumber, setOrderNumber] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formRenderTime, setFormRenderTime] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setFormRenderTime(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject,
          orderNumber,
          message,
          honeypot,
          formRenderTime,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send your message. Please try again.');
      }

      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setOrderNumber('');
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while sending your message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1680px] mx-auto px-1 sm:px-1.5 lg:px-2 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 text-[#00736a] bg-[#00736a]/10 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide">
            <HeartHandshake className="w-4 h-4" />
            <span>WE&rsquo;RE HERE FOR YOU</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-stone-950 tracking-tight">
            Support &amp; Contact
          </h1>
          <p className="text-stone-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed">
            Have a question about sizing, your order status, or looking for custom church prints? 
            Our team is always happy to connect and assist you with grace and care.
          </p>
        </div>

        {/* 2-Column Grid: Contact Info Cards + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info & Pastoral Care */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00736a] text-white flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-stone-900 font-serif">Email Us Directly</h3>
                <p className="text-sm text-stone-600">
                  Prefer regular email? Reach out straight to our inbox:
                </p>
                <a
                  href="mailto:hello@adoptdchristianclothing.co.uk"
                  className="inline-block pt-2 text-[#00736a] font-bold text-lg hover:underline underline-offset-4"
                >
                  hello@adoptdchristianclothing.co.uk
                </a>
              </div>
            </div>

            {/* Response Time & Church Help */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0 text-stone-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-stone-900 text-base">Swift Response Times</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    We respond to all inquiries within <strong>24 to 48 hours</strong> (Monday through Friday).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 pt-4 border-t border-stone-100">
                <div className="w-10 h-10 rounded-lg bg-[#00736a]/10 flex items-center justify-center flex-shrink-0 text-[#00736a]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-stone-900 text-base">Church &amp; Ministry Bulk</h4>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    Looking for custom apparel for your worship team or church conference?
                  </p>
                  <Link
                    href="/church-print-services"
                    className="inline-flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-[#00736a] hover:underline pt-1"
                  >
                    <span>View Church Print Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Privacy Promise */}
            <div className="flex items-center space-x-3 text-xs text-stone-500 bg-stone-100/60 p-4 rounded-xl border border-stone-200/60">
              <ShieldCheck className="w-5 h-5 text-stone-700 flex-shrink-0" />
              <span>Your contact details are kept strictly private and handled under UK GDPR principles.</span>
            </div>

          </div>

          {/* Right Column: Interactive Support Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-stone-200 shadow-sm space-y-6">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#00736a]/10 text-[#00736a] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold font-serif text-stone-950">Thank You for Reaching Out!</h3>
                <p className="text-stone-600 max-w-md mx-auto text-base leading-relaxed">
                  Your message has been sent to our customer care team at <strong className="text-stone-900">hello@adoptdchristianclothing.co.uk</strong>. We will get back to you promptly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-sm font-semibold transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Honeypot for Bot Protection */}
                <div aria-hidden="true" style={{ display: 'none', position: 'absolute', left: '-9999px' }}>
                  <input
                    type="text"
                    name="contact_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="border-b border-stone-100 pb-3">
                  <h2 className="text-2xl font-bold font-serif text-stone-900">Send Us a Message</h2>
                  <p className="text-sm text-stone-500">Fill out the form below and we will get right back to you.</p>
                </div>

                {errorMsg && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00736a] focus:outline-none bg-stone-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarah@example.com"
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00736a] focus:outline-none bg-stone-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                      Subject / Topic
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00736a] focus:outline-none bg-stone-50/50"
                    >
                      <option value="Order & Delivery Question">Order &amp; Delivery Question</option>
                      <option value="Sizing & Product Advice">Sizing &amp; Product Advice</option>
                      <option value="Returns & Exchanges">Returns &amp; Exchanges</option>
                      <option value="Church & Ministry Bulk Orders">Church &amp; Ministry Bulk Orders</option>
                      <option value="General Feedback & Encouragement">General Feedback &amp; Encouragement</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                      Order Number <span className="text-stone-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="e.g. #ORD-1042"
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00736a] focus:outline-none bg-stone-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our team help you today?"
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl text-sm sm:text-base focus:ring-2 focus:ring-[#00736a] focus:outline-none bg-stone-50/50 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#00736a] text-white font-bold rounded-xl hover:bg-[#005a53] transition duration-200 shadow-md flex items-center justify-center space-x-2 text-base uppercase tracking-wider disabled:opacity-50"
                >
                  {loading ? (
                    <span>Sending Message...</span>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>

                <p className="text-center text-xs text-stone-500 pt-2">
                  By submitting this form, you agree to our{' '}
                  <Link href="/privacy-policy" className="text-[#00736a] underline underline-offset-2">
                    Privacy Policy
                  </Link>.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
