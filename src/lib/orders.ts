import { createClient } from '@supabase/supabase-js';
import { kv } from '@vercel/kv';
import { stripe } from '@/lib/stripe';
import { getSupabaseProducts } from '@/lib/supabase';
import { insertOrderPostgres } from '@/lib/vercel-postgres';
import { sendOrderConfirmationEmail } from '@/lib/order-email';
import { OrderItemDetails, OrderRecord, Product } from '@/types';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://twpnniihnevlkxnuysjj.supabase.co';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  'sb_publishable_JX1R7a8qmTADZzcKlcSVXA_YD7FZtQ7';

const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

// In-process deduplication sets to guard against concurrent duplicate requests
const processedPaymentIds = new Set<string>();
const inFlightPaymentIds = new Set<string>();

/**
 * Generates a deterministic or unique human-readable Order Number.
 * If a paymentIntentId is provided, derives a stable suffix so retries always produce the exact same order number.
 */
export function generateOrderNumber(paymentIntentId?: string, createdTimestampSec?: number): string {
  const date = createdTimestampSec ? new Date(createdTimestampSec * 1000) : new Date();
  const yyyy = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');

  if (paymentIntentId) {
    const clean = paymentIntentId.replace(/^pi_/, '').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    const suffix = clean.slice(-6).padStart(6, '0');
    return `ORD-${yyyy}${mm}${dd}-${suffix}`;
  }

  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  return `ORD-${yyyy}${mm}${dd}-${randomSuffix}`;
}

/**
 * Extracts a human-readable payment method label from a Stripe PaymentIntent.
 */
export function extractPaymentMethodLabel(paymentIntent: any): string {
  const charge = paymentIntent?.latest_charge;
  const pmDetails = charge?.payment_method_details || paymentIntent?.payment_method_details;

  if (pmDetails?.type === 'card' && pmDetails.card) {
    const brand = (pmDetails.card.brand || 'Card').toUpperCase();
    const last4 = pmDetails.card.last4 ? ` ending in ${pmDetails.card.last4}` : '';
    const wallet = pmDetails.card.wallet?.type
      ? ` (${pmDetails.card.wallet.type.replace(/_/g, ' ')})`
      : '';
    return `${brand}${last4}${wallet}`;
  }

  const pmObj =
    typeof paymentIntent?.payment_method === 'object' ? paymentIntent.payment_method : null;
  if (pmObj?.type === 'card' && pmObj.card) {
    const brand = (pmObj.card.brand || 'Card').toUpperCase();
    const last4 = pmObj.card.last4 ? ` ending in ${pmObj.card.last4}` : '';
    return `${brand}${last4}`;
  }

  if (pmDetails?.type) {
    return pmDetails.type
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
  }

  if (Array.isArray(paymentIntent?.payment_method_types) && paymentIntent.payment_method_types.length > 0) {
    const primary = paymentIntent.payment_method_types[0];
    if (primary === 'card') return 'Card (Stripe Checkout)';
    return String(primary)
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
  }

  return 'Card (Stripe Checkout)';
}

/**
 * Resolves the design/artwork description for a product.
 */
export function resolveProductDesignLabel(product?: Product, rawDesign?: string): string {
  if (rawDesign && rawDesign.trim()) return rawDesign.trim();
  if (!product) return 'Standard ADOPTD Design';

  const designTitle = product.name
    .replace(/\b(Christian|Unisex|Heavyweight|Organic|Men's|Women's|Hoodie|T-Shirt|Tee|Sweater|Tote Bag|Bag)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (product.scriptureReference) {
    return `${designTitle || product.name} (${product.scriptureReference})`;
  }
  return designTitle || product.name;
}

/**
 * Reconstructs the full list of OrderItemDetails from Stripe PaymentIntent metadata
 * and enriches against the Supabase `products` catalog.
 */
export async function extractOrderItemsFromPaymentIntent(
  paymentIntent: any
): Promise<OrderItemDetails[]> {
  const metadata = paymentIntent?.metadata || {};
  const products = await getSupabaseProducts();
  const productById = new Map<string, Product>();
  const productBySlug = new Map<string, Product>();
  const productByName = new Map<string, Product>();

  products.forEach((p) => {
    productById.set(String(p.id), p);
    productBySlug.set(p.slug.toLowerCase(), p);
    productByName.set(p.name.toLowerCase(), p);
  });

  const parsedItems: OrderItemDetails[] = [];

  // 1. Parse structured `item_0`, `item_1`, ... metadata keys
  const itemKeys = Object.keys(metadata)
    .filter((k) => /^item_\d+$/.test(k))
    .sort((a, b) => Number(a.split('_')[1]) - Number(b.split('_')[1]));

  for (const key of itemKeys) {
    try {
      const raw = JSON.parse(metadata[key]);
      const product =
        productById.get(String(raw.id || raw.productId || '')) ||
        productBySlug.get(String(raw.slug || raw.id || '').toLowerCase()) ||
        productByName.get(String(raw.name || '').toLowerCase());

      const quantity = Math.max(1, Number(raw.qty ?? raw.quantity ?? 1));
      const unitPrice = Number(raw.price ?? raw.unitPrice ?? product?.price ?? 0);
      const size = String(raw.size || raw.selectedSize || 'One Size').trim();
      const color = String(raw.color || raw.selectedColor || 'Default').trim();
      const productName = String(raw.name || raw.productName || product?.name || 'Product').trim();
      const categoryLabel = product?.categoryName || raw.category || 'Apparel';
      const variant =
        raw.variant ||
        `${categoryLabel} — ${color} / Size ${size}`;
      const design = resolveProductDesignLabel(product, raw.design);

      parsedItems.push({
        productId: String(raw.id || raw.productId || product?.id || ''),
        productName,
        design,
        variant,
        size,
        color,
        quantity,
        unitPrice,
        lineTotal: Number((unitPrice * quantity).toFixed(2)),
        image: raw.image || product?.featuredImage || undefined,
        personalisedText: raw.customText || raw.personalisedText || undefined,
        uploadedArtworkUrl: raw.artworkUrl || raw.uploadedArtworkUrl || undefined,
      });
    } catch (err) {
      console.warn(`[Orders] Failed to parse ${key} from PaymentIntent metadata:`, err);
    }
  }

  // 2. Fallback: If legacy `itemsDescription` exists without `item_N` keys, parse it gracefully
  if (parsedItems.length === 0 && metadata.itemsDescription) {
    const parts = String(metadata.itemsDescription)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    for (const part of parts) {
      // Pattern: "2x He Left the 99 Christian Hoodie (Blue / L)"
      const match = part.match(/^(\d+)x\s+(.+?)(?:\s+\(([^)]+)\))?$/);
      const qty = match ? Math.max(1, parseInt(match[1], 10)) : 1;
      const rawTitle = match ? match[2].trim() : part;
      const detailsPart = match && match[3] ? match[3].trim() : '';
      const [maybeColor, maybeSize] = detailsPart.split('/').map((s) => s.trim());

      const product =
        productByName.get(rawTitle.toLowerCase()) ||
        productById.get(rawTitle) ||
        productBySlug.get(rawTitle.toLowerCase());

      const unitPrice = product?.price || 0;
      const color = maybeColor || product?.colors?.[0]?.name || 'Default';
      const size = maybeSize || product?.availableSizes?.[0] || 'Standard';

      parsedItems.push({
        productId: product?.id || rawTitle,
        productName: product?.name || rawTitle,
        design: resolveProductDesignLabel(product),
        variant: `${product?.categoryName || 'Apparel'} — ${color} / Size ${size}`,
        size,
        color,
        quantity: qty,
        unitPrice,
        lineTotal: Number((unitPrice * qty).toFixed(2)),
        image: product?.featuredImage,
      });
    }
  }

  return parsedItems;
}

/**
 * Builds a complete OrderRecord from a Stripe PaymentIntent.
 */
export async function buildOrderRecordFromPaymentIntent(
  paymentIntent: any
): Promise<OrderRecord> {
  const metadata = paymentIntent?.metadata || {};
  const orderNumber =
    metadata.orderNumber ||
    generateOrderNumber(paymentIntent.id, paymentIntent.created);

  const orderDate = paymentIntent.created
    ? new Date(paymentIntent.created * 1000).toISOString()
    : new Date().toISOString();

  const items = await extractOrderItemsFromPaymentIntent(paymentIntent);

  const shippingPence =
    metadata.shippingPence !== undefined ? Number(metadata.shippingPence) : 395;
  const shippingCost = Number((shippingPence / 100).toFixed(2));
  const totalAmount = Number(((paymentIntent.amount || 0) / 100).toFixed(2));
  const calculatedItemsSubtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const subtotal =
    calculatedItemsSubtotal > 0
      ? Number(calculatedItemsSubtotal.toFixed(2))
      : Number(Math.max(0, totalAmount - shippingCost).toFixed(2));

  const chargeBilling = paymentIntent.latest_charge?.billing_details || {};
  const shipping = paymentIntent.shipping || {};
  const shippingAddr = shipping.address || chargeBilling.address || {};

  const customerName =
    shipping.name ||
    chargeBilling.name ||
    paymentIntent.customer_details?.name ||
    metadata.customerName ||
    'Valued Customer';

  const customerEmail =
    paymentIntent.receipt_email ||
    chargeBilling.email ||
    paymentIntent.customer_details?.email ||
    metadata.customerEmail ||
    'Not provided';

  const customerPhone =
    shipping.phone ||
    chargeBilling.phone ||
    paymentIntent.customer_details?.phone ||
    metadata.customerPhone ||
    undefined;

  const deliveryAddress = {
    line1: shippingAddr.line1 || metadata.addressLine1 || '',
    line2: shippingAddr.line2 || metadata.addressLine2 || '',
    city: shippingAddr.city || metadata.addressCity || '',
    county: shippingAddr.state || metadata.addressCounty || '',
    postcode: shippingAddr.postal_code || metadata.addressPostcode || '',
    country: shippingAddr.country || metadata.addressCountry || 'GB',
  };

  const paymentStatus =
    paymentIntent.status === 'succeeded'
      ? 'Paid (Confirmed)'
      : String(paymentIntent.status || 'Paid');

  const paymentMethod = extractPaymentMethodLabel(paymentIntent);

  return {
    orderNumber,
    orderDate,
    paymentStatus,
    paymentMethod,
    subtotal,
    shippingCost,
    totalAmount,
    currency: String(paymentIntent.currency || 'gbp').toUpperCase(),
    customerName,
    customerEmail,
    customerPhone,
    deliveryAddress,
    items,
    stripePaymentId: paymentIntent.id,
  };
}

/**
 * Checks if an order confirmation email has already been sent for this Stripe PaymentIntent ID.
 */
async function hasEmailAlreadyBeenSent(paymentIntent: any): Promise<boolean> {
  const paymentId = paymentIntent?.id;
  if (!paymentId) return false;

  // 1. In-memory check
  if (processedPaymentIds.has(paymentId)) {
    return true;
  }

  // 2. Stripe PaymentIntent metadata check
  if (paymentIntent?.metadata?.order_email_sent === 'true') {
    processedPaymentIds.add(paymentId);
    return true;
  }

  // 3. Vercel KV check (if configured)
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const kvSent = await kv.get(`order-email-sent:${paymentId}`);
      if (kvSent) {
        processedPaymentIds.add(paymentId);
        return true;
      }
    } catch {
      // Ignore KV errors
    }
  }

  // 4. Supabase `orders` table check (if created)
  try {
    const { data, error } = await supabaseServer
      .from('orders')
      .select('id, order_number, email_notification_sent')
      .eq('stripe_payment_id', paymentId)
      .maybeSingle();

    if (!error && data && data.email_notification_sent === true) {
      processedPaymentIds.add(paymentId);
      return true;
    }
  } catch {
    // Table may not exist yet; safe fallback
  }

  return false;
}

/**
 * Saves the confirmed order and its line items to Supabase (`orders` and `order_items` tables)
 * as well as Vercel Postgres if configured.
 */
export async function saveOrderToDatabase(
  order: OrderRecord,
  emailSent: boolean
): Promise<{ savedToSupabase: boolean; supabaseError?: string }> {
  // 1. Mirror to Vercel Postgres if POSTGRES_URL is configured
  if (process.env.POSTGRES_URL) {
    try {
      await insertOrderPostgres({
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        totalAmount: order.totalAmount,
        items: order.items,
        shippingAddress: order.deliveryAddress,
        stripePaymentId: order.stripePaymentId,
      });
    } catch (pgErr) {
      console.warn('[Vercel Postgres] Non-fatal error saving order:', pgErr);
    }
  }

  // 2. Save to Supabase `orders` and `order_items`
  try {
    const { data: orderRow, error: orderError } = await supabaseServer
      .from('orders')
      .upsert(
        {
          order_number: order.orderNumber,
          stripe_payment_id: order.stripePaymentId,
          order_date: order.orderDate,
          payment_status: order.paymentStatus,
          payment_method: order.paymentMethod,
          subtotal: order.subtotal,
          shipping_cost: order.shippingCost,
          total_amount: order.totalAmount,
          currency: order.currency,
          customer_name: order.customerName,
          customer_email: order.customerEmail,
          customer_phone: order.customerPhone || null,
          address_line1: order.deliveryAddress.line1 || null,
          address_line2: order.deliveryAddress.line2 || null,
          town_city: order.deliveryAddress.city || null,
          county: order.deliveryAddress.county || null,
          postcode: order.deliveryAddress.postcode || null,
          country: order.deliveryAddress.country || null,
          shipping_address: order.deliveryAddress,
          items: order.items,
          email_notification_sent: emailSent,
          email_notification_sent_at: emailSent ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'stripe_payment_id' }
      )
      .select('id')
      .single();

    if (orderError) {
      return {
        savedToSupabase: false,
        supabaseError: orderError.message,
      };
    }

    if (orderRow?.id && order.items.length > 0) {
      // Ensure we don't duplicate order_items on upsert
      await supabaseServer.from('order_items').delete().eq('order_id', orderRow.id);

      const itemRows = order.items.map((item) => ({
        order_id: orderRow.id,
        order_number: order.orderNumber,
        product_id: item.productId || null,
        product_name: item.productName,
        product_design: item.design || null,
        product_variant: item.variant || null,
        size: item.size || null,
        colour: item.color || null,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        line_total: item.lineTotal,
        personalised_text: item.personalisedText || null,
        uploaded_artwork_url: item.uploadedArtworkUrl || null,
        image_url: item.image || null,
      }));

      const { error: itemsError } = await supabaseServer.from('order_items').insert(itemRows);
      if (itemsError) {
        console.warn('[Supabase] Saved order row, but order_items insert returned:', itemsError.message);
      }
    }

    return { savedToSupabase: true };
  } catch (err: any) {
    return {
      savedToSupabase: false,
      supabaseError: err?.message || 'Unknown Supabase error',
    };
  }
}

/**
 * Idempotently processes a confirmed Stripe PaymentIntent:
 * 1. Verifies payment status is `succeeded`
 * 2. Prevents duplicate email dispatch across retries, refreshes, and concurrent calls
 * 3. Builds complete order record with all customer, address, and per-item details
 * 4. Sends the formatted confirmation email to the business email address
 * 5. Records the order and idempotency state in Supabase, Stripe metadata, and KV
 */
export async function processConfirmedPaymentIntent(paymentIntent: any): Promise<{
  order: OrderRecord;
  emailSent: boolean;
  alreadyProcessed: boolean;
  emailId?: string;
  savedToSupabase: boolean;
  error?: string;
}> {
  const paymentId = paymentIntent?.id;
  if (!paymentId) {
    throw new Error('Missing Stripe PaymentIntent ID');
  }

  // Only process confirmed/succeeded payments
  if (paymentIntent.status && paymentIntent.status !== 'succeeded') {
    const order = await buildOrderRecordFromPaymentIntent(paymentIntent);
    return {
      order,
      emailSent: false,
      alreadyProcessed: false,
      savedToSupabase: false,
      error: `PaymentIntent status is '${paymentIntent.status}', not 'succeeded'.`,
    };
  }

  // Guard against concurrent duplicate calls for the same paymentId
  if (inFlightPaymentIds.has(paymentId)) {
    const order = await buildOrderRecordFromPaymentIntent(paymentIntent);
    return {
      order,
      emailSent: false,
      alreadyProcessed: true,
      savedToSupabase: false,
    };
  }

  inFlightPaymentIds.add(paymentId);

  try {
    const alreadySent = await hasEmailAlreadyBeenSent(paymentIntent);
    const order = await buildOrderRecordFromPaymentIntent(paymentIntent);

    if (alreadySent) {
      console.log(
        `[Orders] Duplicate notification prevented for Order #${order.orderNumber} (${paymentId}).`
      );
      return {
        order,
        emailSent: false,
        alreadyProcessed: true,
        savedToSupabase: true,
      };
    }

    // Send the confirmation email via Resend
    const emailResult = await sendOrderConfirmationEmail(order);

    if (emailResult.sent) {
      processedPaymentIds.add(paymentId);

      // Persist idempotency flag in Vercel KV if configured (30 days TTL)
      if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
        try {
          await kv.set(`order-email-sent:${paymentId}`, order.orderNumber, { ex: 60 * 60 * 24 * 30 });
        } catch {
          // Ignore KV errors
        }
      }

      // Persist idempotency flag on the Stripe PaymentIntent metadata (when using real Stripe key)
      if (
        process.env.STRIPE_SECRET_KEY &&
        !process.env.STRIPE_SECRET_KEY.includes('mock_dummy_key') &&
        paymentId.startsWith('pi_')
      ) {
        try {
          await stripe.paymentIntents.update(paymentId, {
            metadata: {
              ...(paymentIntent.metadata || {}),
              orderNumber: order.orderNumber,
              order_email_sent: 'true',
              order_email_sent_at: new Date().toISOString(),
            },
          });
        } catch (stripeUpdateErr) {
          console.warn('[Orders] Could not update PaymentIntent metadata flag:', stripeUpdateErr);
        }
      }
    }

    // Save order and line items to Supabase (and Vercel Postgres if configured)
    const dbResult = await saveOrderToDatabase(order, emailResult.sent);

    return {
      order,
      emailSent: emailResult.sent,
      alreadyProcessed: false,
      emailId: emailResult.emailId,
      savedToSupabase: dbResult.savedToSupabase,
      error: emailResult.error,
    };
  } finally {
    inFlightPaymentIds.delete(paymentId);
  }
}
