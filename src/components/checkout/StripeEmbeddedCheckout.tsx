'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useCartStore } from '@/store/useCartStore';
import { ShieldCheck, Lock, AlertCircle } from 'lucide-react';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx';
const stripePromise = loadStripe(publishableKey);

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'Payment failed. Please try another card.');
      setIsProcessing(false);
    } else {
      clearCart();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping Address Element */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
        <h3 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-3">
          1. Delivery Address
        </h3>
        <AddressElement
          options={{
            mode: 'shipping',
            allowedCountries: ['GB', 'US', 'CA', 'IE', 'AU', 'NZ', 'FR', 'DE'],
            defaultValues: {
              address: {
                country: 'GB',
              },
            },
          }}
        />
      </div>

      {/* Payment Element */}
      <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <h3 className="font-serif text-base font-bold text-stone-900">
            2. Payment Details
          </h3>
          <span className="flex items-center text-xs text-stone-500 space-x-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit Encrypted</span>
          </span>
        </div>
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg flex items-center space-x-2 text-rose-700 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-4 px-6 bg-stone-950 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-stone-800 transition disabled:opacity-50 flex items-center justify-center space-x-2 shadow-xl"
      >
        <Lock className="w-4 h-4" />
        <span>{isProcessing ? 'Processing Secure Payment...' : 'Pay & Complete Order'}</span>
      </button>

      <div className="text-center text-[11px] text-stone-500 flex items-center justify-center space-x-1">
        <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
        <span>Guaranteed safe & secure checkout powered by Stripe.</span>
      </div>
    </form>
  );
}

export function StripeEmbeddedCheckout() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { items, getSubtotal } = useCartStore();

  useEffect(() => {
    if (items.length === 0) {
      setLoading(false);
      return;
    }

    async function initPayment() {
      try {
        const res = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((i) => ({
              id: i.productId,
              size: i.size,
              color: i.color,
              quantity: i.quantity,
            })),
          }),
        });

        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError(data.error || 'Failed to initialize payment session');
        }
      } catch (err: any) {
        setError(err.message || 'Network error');
      } finally {
        setLoading(false);
      }
    }

    initPayment();
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-stone-200 p-8">
        <p className="text-sm text-stone-600 mb-4">Your bag is empty.</p>
        <a
          href="/"
          className="inline-block px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold uppercase tracking-wider rounded-lg"
        >
          Return to Shop
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-3 bg-white rounded-xl border border-stone-200">
        <div className="w-8 h-8 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-stone-500 font-medium">Securing payment session...</p>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs">
        <p className="font-semibold mb-1">Could not load checkout:</p>
        <p>{error || 'Missing payment credentials. Please ensure Stripe keys are configured.'}</p>
      </div>
    );
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#1a1a1a',
        colorBackground: '#ffffff',
        colorText: '#1c1917',
        colorDanger: '#dc2626',
        fontFamily: 'Inter, sans-serif',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
}
