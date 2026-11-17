import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getSupabaseProducts } from '@/lib/supabase';
import { generateOrderNumber, resolveProductDesignLabel } from '@/lib/orders';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, customerEmail, customerName, customerPhone } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    // Fetch verified products from server to prevent client-side price tampering
    const allProducts = await getSupabaseProducts();
    const productById = new Map(allProducts.map((p) => [String(p.id), p]));
    const productBySlug = new Map(allProducts.map((p) => [p.slug.toLowerCase(), p]));

    let subtotalPence = 0;
    const itemMetadataEntries: Record<string, string> = {};
    const summaryParts: string[] = [];

    for (let idx = 0; idx < items.length; idx++) {
      const item = items[idx];
      const lookupId = String(item.id || item.productId || '');
      const product =
        productById.get(lookupId) ||
        productBySlug.get(lookupId.toLowerCase()) ||
        (item.slug ? productBySlug.get(String(item.slug).toLowerCase()) : undefined);

      if (!product) {
        return NextResponse.json({ error: `Product not found: ${lookupId}` }, { status: 400 });
      }

      const itemQty = Math.max(1, parseInt(String(item.quantity), 10) || 1);
      const itemPricePence = Math.round(product.price * 100);
      subtotalPence += itemPricePence * itemQty;

      // Support both `color`/`size` (sent by StripeEmbeddedCheckout) and `selectedColor`/`selectedSize`
      const effectiveColor = String(
        item.color || item.selectedColor || product.colors?.[0]?.name || 'Default'
      ).trim();
      const effectiveSize = String(
        item.size || item.selectedSize || product.availableSizes?.[0] || 'One Size'
      ).trim();

      const designLabel = resolveProductDesignLabel(product, item.design);
      const variantLabel =
        item.variant || `${product.categoryName} — ${effectiveColor} / Size ${effectiveSize}`;
      const customText = String(item.personalisedText || item.customisation || '').trim();
      const artworkUrl = String(item.uploadedArtworkUrl || item.artworkUrl || '').trim();

      summaryParts.push(`${itemQty}x ${product.name} (${effectiveColor} / ${effectiveSize})`);

      // Store up to 40 individual line items in Stripe metadata (each < 500 chars)
      if (idx < 40) {
        const compactItem = {
          id: String(product.id),
          name: product.name.slice(0, 80),
          design: designLabel.slice(0, 80),
          variant: variantLabel.slice(0, 80),
          size: effectiveSize.slice(0, 25),
          color: effectiveColor.slice(0, 35),
          qty: itemQty,
          price: Number(product.price.toFixed(2)),
          ...(customText ? { customText: customText.slice(0, 80) } : {}),
          ...(artworkUrl ? { artworkUrl: artworkUrl.slice(0, 100) } : {}),
        };
        itemMetadataEntries[`item_${idx}`] = JSON.stringify(compactItem);
      }
    }

    // Flat rate UK tracked shipping (£3.95)
    const shippingFeePence = 395;
    const totalAmountPence = subtotalPence + shippingFeePence;
    const orderNumber = generateOrderNumber();

    // Create PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmountPence,
      currency: 'gbp',
      automatic_payment_methods: {
        enabled: true,
      },
      ...(customerEmail && typeof customerEmail === 'string' && customerEmail.includes('@')
        ? { receipt_email: customerEmail.trim() }
        : {}),
      metadata: {
        orderNumber,
        itemCount: items.length.toString(),
        subtotalPence: subtotalPence.toString(),
        shippingPence: shippingFeePence.toString(),
        totalPence: totalAmountPence.toString(),
        itemsDescription: summaryParts.join(', ').slice(0, 490),
        ...(customerName ? { customerName: String(customerName).slice(0, 100) } : {}),
        ...(customerEmail ? { customerEmail: String(customerEmail).slice(0, 100) } : {}),
        ...(customerPhone ? { customerPhone: String(customerPhone).slice(0, 50) } : {}),
        ...itemMetadataEntries,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      orderNumber,
      subtotalPence,
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
