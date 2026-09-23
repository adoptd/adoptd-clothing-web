import { sql } from '@vercel/postgres';

/**
 * Initializes the Postgres database tables if they do not already exist.
 */
export async function initPostgresTables() {
  if (!process.env.POSTGRES_URL) {
    return;
  }

  try {
    // Orders table
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(64) UNIQUE NOT NULL,
        customer_name VARCHAR(255),
        customer_email VARCHAR(255) NOT NULL,
        total_amount NUMERIC(10, 2) NOT NULL,
        currency VARCHAR(8) DEFAULT 'GBP',
        items JSONB NOT NULL,
        shipping_address JSONB,
        stripe_payment_id VARCHAR(255),
        fulfillment_status VARCHAR(64) DEFAULT 'unfulfilled',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Newsletter subscribers table
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        consent_given BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('[Vercel Postgres] Tables initialized successfully.');
  } catch (error) {
    console.error('[Vercel Postgres] Error initializing tables:', error);
  }
}

/**
 * Inserts an order into Postgres.
 */
export async function insertOrderPostgres({
  orderNumber,
  customerName,
  customerEmail,
  totalAmount,
  items,
  shippingAddress,
  stripePaymentId,
}: {
  orderNumber: string;
  customerName?: string;
  customerEmail: string;
  totalAmount: number;
  items: any[];
  shippingAddress?: any;
  stripePaymentId?: string;
}) {
  if (!process.env.POSTGRES_URL) {
    return null;
  }

  try {
    const result = await sql`
      INSERT INTO orders (
        order_number,
        customer_name,
        customer_email,
        total_amount,
        items,
        shipping_address,
        stripe_payment_id
      ) VALUES (
        ${orderNumber},
        ${customerName || null},
        ${customerEmail},
        ${totalAmount},
        ${JSON.stringify(items)},
        ${JSON.stringify(shippingAddress || {})},
        ${stripePaymentId || null}
      )
      RETURNING *;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('[Vercel Postgres] Error inserting order:', error);
    return null;
  }
}
