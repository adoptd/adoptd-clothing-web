import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { processConfirmedPaymentIntent } from '@/lib/orders';

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: any;

  try {
    if (webhookSecret) {
      if (!sig) {
        return NextResponse.json(
          { error: 'Missing stripe-signature header' },
          { status: 400 }
        );
      }
      event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } else if (process.env.NODE_ENV === 'production') {
      console.error('⚠️ STRIPE_WEBHOOK_SECRET is not configured in production.');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 400 }
      );
    } else {
      // Development / local test mode fallback when STRIPE_WEBHOOK_SECRET is not set
      event = JSON.parse(payload);
    }
  } catch (err: any) {
    console.error(`⚠️ Webhook signature verification failed:`, err.message);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    // Only trigger on confirmed payment events; ignore order updates or non-succeeded events
    if (event.type === 'payment_intent.succeeded') {
      let paymentIntent = event.data.object as any;

      // Expand payment_method and latest_charge from Stripe API if real key is configured
      if (
        paymentIntent?.id &&
        process.env.STRIPE_SECRET_KEY &&
        !process.env.STRIPE_SECRET_KEY.includes('mock_dummy_key') &&
        !paymentIntent.latest_charge?.payment_method_details
      ) {
        try {
          paymentIntent = await stripe.paymentIntents.retrieve(paymentIntent.id, {
            expand: ['payment_method', 'latest_charge'],
          });
        } catch {
          // Proceed with webhook payload object if retrieve fails
        }
      }

      const result = await processConfirmedPaymentIntent(paymentIntent);

      console.log(
        `[Stripe Webhook] Order #${result.order.orderNumber} processed (emailSent=${result.emailSent}, alreadyProcessed=${result.alreadyProcessed}, savedToSupabase=${result.savedToSupabase})`
      );

      return NextResponse.json({
        received: true,
        orderNumber: result.order.orderNumber,
        emailSent: result.emailSent,
        alreadyProcessed: result.alreadyProcessed,
        savedToSupabase: result.savedToSupabase,
      });
    }

    return NextResponse.json({ received: true, ignoredEventType: event.type });
  } catch (error: any) {
    console.error('[Stripe Webhook] Error processing confirmed order:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing error' },
      { status: 500 }
    );
  }
}
