import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getProducts } from '@/lib/airtable';

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Fetch verified products from server to prevent client-side price tampering
    const allProducts = await getProducts();
    const productMap = new Map(allProducts.map((p) => [p.id, p]));

    let totalAmountPence = 0;

    for (const item of items) {
      const product = productMap.get(item.id);
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.id}` }, { status: 400 });
      }

      const itemQty = Math.max(1, parseInt(item.quantity, 10) || 1);
      const itemPricePence = Math.round(product.price * 100);
      totalAmountPence += itemPricePence * itemQty;
    }

    // Add shipping if under £40 threshold (standard UK shipping £3.95)
    const freeShippingThresholdPence = 4000;
    const shippingFeePence = totalAmountPence >= freeShippingThresholdPence ? 0 : 395;
    totalAmountPence += shippingFeePence;

    const itemsSummary = items.map((item) => {
      const p = productMap.get(item.id);
      const title = p?.name || item.id;
      const details = [item.selectedColor, item.selectedSize].filter(Boolean).join(' / ');
      const qty = item.quantity || 1;
      return `${qty}x ${title}${details ? ` (${details})` : ''}`;
    }).join(', ');

    // Create PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmountPence,
      currency: 'gbp',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        itemCount: items.length.toString(),
        itemsDescription: itemsSummary.slice(0, 500),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      totalAmountPence,
      shippingFeePence,
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
