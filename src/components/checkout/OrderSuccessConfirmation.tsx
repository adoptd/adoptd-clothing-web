'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';

/**
 * Automatically clears the cart and triggers idempotent server-side order verification
 * when the customer is redirected back from Stripe to `/checkout/success`.
 */
export function OrderSuccessConfirmation() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (hasTriggeredRef.current) return;

    const paymentIntentId = searchParams.get('payment_intent');
    const redirectStatus = searchParams.get('redirect_status');

    if (redirectStatus === 'succeeded' || paymentIntentId) {
      hasTriggeredRef.current = true;
      clearCart();
    }

    if (paymentIntentId && paymentIntentId.startsWith('pi_')) {
      fetch('/api/orders/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentIntentId }),
      }).catch(() => {
        // Webhook handles confirmation in parallel if client request fails
      });
    }
  }, [searchParams, clearCart]);

  return null;
}
