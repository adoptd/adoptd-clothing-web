import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { processConfirmedPaymentIntent } from '@/lib/orders';

/**
 * Server-side order confirmation endpoint called on `/checkout/success` redirect.
 * Retrieves the PaymentIntent directly from Stripe using the server secret key,
 * verifies `status === 'succeeded'`, and runs the idempotent order processor.
 * Guarantees the order email is sent even if Stripe webhooks are delayed, while
 * never sending duplicate emails if the webhook also fires or the page is refreshed.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const paymentIntentId = typeof body?.paymentIntentId === 'string' ? body.paymentIntentId.trim() : '';

    if (!paymentIntentId || !paymentIntentId.startsWith('pi_')) {
      return NextResponse.json(
        { error: 'Valid Stripe paymentIntentId is required' },
        { status: 400 }
      );
    }

    if (
      !process.env.STRIPE_SECRET_KEY ||
      process.env.STRIPE_SECRET_KEY.includes('mock_dummy_key')
    ) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY is not configured' },
        { status: 503 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['payment_method', 'latest_charge'],
    });

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        {
          confirmed: false,
          status: paymentIntent.status,
          message: 'Payment has not succeeded yet.',
        },
        { status: 202 }
      );
    }

    const result = await processConfirmedPaymentIntent(paymentIntent);

    return NextResponse.json({
      confirmed: true,
      orderNumber: result.order.orderNumber,
      emailSent: result.emailSent,
      alreadyProcessed: result.alreadyProcessed,
      savedToSupabase: result.savedToSupabase,
    });
  } catch (error: any) {
    console.error('[Order Confirm API] Error verifying order:', error);
    return NextResponse.json(
      { error: error.message || 'Unable to confirm order status' },
      { status: 500 }
    );
  }
}
