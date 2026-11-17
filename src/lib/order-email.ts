import { OrderRecord, OrderItemDetails } from '@/types';

const COUNTRY_NAMES: Record<string, string> = {
  GB: 'United Kingdom',
  UK: 'United Kingdom',
  US: 'United States',
  CA: 'Canada',
  IE: 'Ireland',
  AU: 'Australia',
  NZ: 'New Zealand',
  FR: 'France',
  DE: 'Germany',
};

export function escapeHtml(value?: string | number | null): string {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatCountryName(codeOrName?: string): string {
  if (!codeOrName || !codeOrName.trim()) return 'United Kingdom';
  const clean = codeOrName.trim();
  const upper = clean.toUpperCase();
  if (COUNTRY_NAMES[upper]) {
    return `${COUNTRY_NAMES[upper]} (${upper})`;
  }
  return clean;
}

export function formatOrderDateTime(isoOrDate?: string): string {
  const dateObj = isoOrDate ? new Date(isoOrDate) : new Date();
  const validDate = isNaN(dateObj.getTime()) ? new Date() : dateObj;
  return validDate.toLocaleString('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  });
}

export function buildOrderEmailSubject(orderNumber: string): string {
  const cleanOrderNum = orderNumber.replace(/^#/, '').trim();
  return `NEW WEBSITE ORDER – Order #${cleanOrderNum}`;
}

export function buildOrderConfirmationEmail(order: OrderRecord): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = buildOrderEmailSubject(order.orderNumber);
  const formattedDate = formatOrderDateTime(order.orderDate);
  const houseAndStreet = [order.deliveryAddress.line1, order.deliveryAddress.line2]
    .map((s) => (s || '').trim())
    .filter(Boolean)
    .join(', ') || 'Not provided';
  const townCity = (order.deliveryAddress.city || '').trim() || 'Not provided';
  const county = (order.deliveryAddress.county || '').trim() || 'Not provided';
  const postcode = (order.deliveryAddress.postcode || '').trim() || 'Not provided';
  const country = formatCountryName(order.deliveryAddress.country);
  const customerPhone = (order.customerPhone || '').trim() || 'Not provided';

  const itemsTextBlocks = order.items
    .map((item: OrderItemDetails, index: number) => {
      const customText =
        item.personalisedText && item.personalisedText.trim()
          ? item.personalisedText.trim()
          : 'None';
      const artworkFile =
        item.uploadedArtworkUrl && item.uploadedArtworkUrl.trim()
          ? item.uploadedArtworkUrl.trim()
          : 'None';

      return [
        `Item #${index + 1}: ${item.productName}`,
        `  - Product Name: ${item.productName}`,
        `  - Design / Artwork Selected: ${item.design || item.productName}`,
        `  - Product Variant: ${item.variant || `${item.color} / ${item.size}`}`,
        `  - Size: ${item.size || 'Standard'}`,
        `  - Colour: ${item.color || 'Default'}`,
        `  - Quantity: ${item.quantity}`,
        `  - Individual Price: £${item.unitPrice.toFixed(2)}`,
        `  - Line Subtotal: £${item.lineTotal.toFixed(2)}`,
        `  - Personalised Text / Customisation: ${customText}`,
        `  - Uploaded Artwork / Design Files: ${artworkFile}`,
      ].join('\n');
    })
    .join('\n\n');

  const text = [
    `NEW WEBSITE ORDER – Order #${order.orderNumber}`,
    `============================================================`,
    ``,
    `1. ORDER SUMMARY`,
    `------------------------------------------------------------`,
    `Order Number / Reference: ${order.orderNumber}`,
    `Order Date & Time: ${formattedDate}`,
    `Payment Status: ${order.paymentStatus}`,
    `Payment Method: ${order.paymentMethod}`,
    `Total Order Value: £${order.totalAmount.toFixed(2)}`,
    `Postage / Delivery Cost: £${order.shippingCost.toFixed(2)}`,
    `Stripe Payment Reference: ${order.stripePaymentId}`,
    ``,
    `2. CUSTOMER INFORMATION`,
    `------------------------------------------------------------`,
    `Customer Full Name: ${order.customerName}`,
    `Customer Email Address: ${order.customerEmail}`,
    `Customer Telephone Number: ${customerPhone}`,
    ``,
    `3. DELIVERY ADDRESS`,
    `------------------------------------------------------------`,
    `House Number and Street: ${houseAndStreet}`,
    `Town / City: ${townCity}`,
    `County: ${county}`,
    `Postcode: ${postcode}`,
    `Country: ${country}`,
    ``,
    `4. ITEMS ORDERED (${order.items.length} ${order.items.length === 1 ? 'Product' : 'Products'})`,
    `------------------------------------------------------------`,
    itemsTextBlocks,
    ``,
    `5. PAYMENT AND TOTAL`,
    `------------------------------------------------------------`,
    `Items Subtotal: £${order.subtotal.toFixed(2)}`,
    `Postage / Delivery Cost: £${order.shippingCost.toFixed(2)}`,
    `Total Order Value: £${order.totalAmount.toFixed(2)}`,
    `Payment Status: ${order.paymentStatus}`,
    `Payment Method: ${order.paymentMethod}`,
  ].join('\n');

  const itemsHtml = order.items
    .map((item: OrderItemDetails, index: number) => {
      const customText =
        item.personalisedText && item.personalisedText.trim()
          ? escapeHtml(item.personalisedText.trim())
          : '<span style="color: #78716c;">None</span>';
      const artworkHtml =
        item.uploadedArtworkUrl && item.uploadedArtworkUrl.trim()
          ? `<a href="${escapeHtml(item.uploadedArtworkUrl.trim())}" style="color: #00736a; text-decoration: underline;" target="_blank" rel="noopener noreferrer">${escapeHtml(item.uploadedArtworkUrl.trim())}</a>`
          : '<span style="color: #78716c;">None</span>';

      return `
        <div style="border: 1px solid #e7e5e4; border-radius: 10px; padding: 16px; margin-bottom: 14px; background-color: #fafaf9;">
          <div style="border-bottom: 1px solid #e7e5e4; padding-bottom: 10px; margin-bottom: 12px;">
            <span style="display: inline-block; background-color: #00736a; color: #ffffff; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding: 3px 8px; border-radius: 4px; margin-bottom: 6px;">
              Item #${index + 1}
            </span>
            <h3 style="margin: 4px 0 0 0; font-size: 17px; font-weight: 700; color: #1c1917;">
              ${escapeHtml(item.productName)}
            </h3>
          </div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-size: 14px; color: #1c1917;">
            <tr>
              <td style="padding: 5px 8px 5px 0; color: #57534e; width: 42%; vertical-align: top;"><strong>Product Name:</strong></td>
              <td style="padding: 5px 0; font-weight: 600; vertical-align: top;">${escapeHtml(item.productName)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px 5px 0; color: #57534e; vertical-align: top;"><strong>Design / Artwork Selected:</strong></td>
              <td style="padding: 5px 0; vertical-align: top;">${escapeHtml(item.design || item.productName)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px 5px 0; color: #57534e; vertical-align: top;"><strong>Product Variant:</strong></td>
              <td style="padding: 5px 0; vertical-align: top;">${escapeHtml(item.variant || `${item.color} / ${item.size}`)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px 5px 0; color: #57534e; vertical-align: top;"><strong>Size:</strong></td>
              <td style="padding: 5px 0; font-weight: 700; color: #00736a; vertical-align: top;">${escapeHtml(item.size || 'Standard')}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px 5px 0; color: #57534e; vertical-align: top;"><strong>Colour:</strong></td>
              <td style="padding: 5px 0; font-weight: 700; color: #1c1917; vertical-align: top;">${escapeHtml(item.color || 'Default')}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px 5px 0; color: #57534e; vertical-align: top;"><strong>Quantity:</strong></td>
              <td style="padding: 5px 0; font-weight: 700; vertical-align: top;">${escapeHtml(item.quantity)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px 5px 0; color: #57534e; vertical-align: top;"><strong>Individual Price:</strong></td>
              <td style="padding: 5px 0; vertical-align: top;">&pound;${item.unitPrice.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px 5px 0; color: #57534e; vertical-align: top;"><strong>Line Subtotal:</strong></td>
              <td style="padding: 5px 0; font-weight: 700; vertical-align: top;">&pound;${item.lineTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px 5px 0; color: #57534e; vertical-align: top;"><strong>Personalised Text / Customisation:</strong></td>
              <td style="padding: 5px 0; vertical-align: top;">${customText}</td>
            </tr>
            <tr>
              <td style="padding: 5px 8px 5px 0; color: #57534e; vertical-align: top;"><strong>Uploaded Artwork / Design Files:</strong></td>
              <td style="padding: 5px 0; vertical-align: top;">${artworkHtml}</td>
            </tr>
          </table>
        </div>
      `;
    })
    .join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1c1917; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f4; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; background-color: #ffffff; border-radius: 14px; overflow: hidden; border: 1px solid #e7e5e4;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #00736a; padding: 28px 24px; color: #ffffff;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; color: #d1fae5;">
                ADOPTD Christian Clothing &bull; Automatic Order Notification
              </p>
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; line-height: 1.25; color: #ffffff;">
                NEW WEBSITE ORDER &ndash; Order #${escapeHtml(order.orderNumber)}
              </h1>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 24px;">
              
              <!-- Section 1: Order Summary -->
              <div style="margin-bottom: 26px;">
                <h2 style="margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #00736a; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #00736a;">
                  1. Order Summary
                </h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e; width: 42%;"><strong>Order Number / Reference:</strong></td>
                    <td style="padding: 6px 0; font-weight: 700; color: #1c1917;">#${escapeHtml(order.orderNumber)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e;"><strong>Order Date &amp; Time:</strong></td>
                    <td style="padding: 6px 0; color: #1c1917;">${escapeHtml(formattedDate)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e;"><strong>Payment Status:</strong></td>
                    <td style="padding: 6px 0;">
                      <span style="display: inline-block; background-color: #dcfce7; color: #166534; font-weight: 700; font-size: 12px; padding: 3px 10px; border-radius: 999px;">
                        ${escapeHtml(order.paymentStatus)}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e;"><strong>Payment Method:</strong></td>
                    <td style="padding: 6px 0; color: #1c1917;">${escapeHtml(order.paymentMethod)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e;"><strong>Postage / Delivery Cost:</strong></td>
                    <td style="padding: 6px 0; color: #1c1917;">&pound;${order.shippingCost.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e;"><strong>Total Order Value:</strong></td>
                    <td style="padding: 6px 0; font-size: 16px; font-weight: 800; color: #00736a;">&pound;${order.totalAmount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e;"><strong>Stripe Payment ID:</strong></td>
                    <td style="padding: 6px 0; font-family: monospace; font-size: 12px; color: #57534e;">${escapeHtml(order.stripePaymentId)}</td>
                  </tr>
                </table>
              </div>

              <!-- Section 2: Customer Information -->
              <div style="margin-bottom: 26px;">
                <h2 style="margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #00736a; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #00736a;">
                  2. Customer Information
                </h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e; width: 42%;"><strong>Customer Full Name:</strong></td>
                    <td style="padding: 6px 0; font-weight: 600; color: #1c1917;">${escapeHtml(order.customerName)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e;"><strong>Email Address:</strong></td>
                    <td style="padding: 6px 0;">
                      <a href="mailto:${escapeHtml(order.customerEmail)}" style="color: #00736a; text-decoration: underline; font-weight: 600;">
                        ${escapeHtml(order.customerEmail)}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e;"><strong>Telephone Number:</strong></td>
                    <td style="padding: 6px 0; color: #1c1917;">${escapeHtml(customerPhone)}</td>
                  </tr>
                </table>
              </div>

              <!-- Section 3: Delivery Address -->
              <div style="margin-bottom: 26px;">
                <h2 style="margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #00736a; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #00736a;">
                  3. Delivery Address
                </h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e; width: 42%;"><strong>House Number &amp; Street:</strong></td>
                    <td style="padding: 6px 0; font-weight: 600; color: #1c1917;">${escapeHtml(houseAndStreet)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e;"><strong>Town / City:</strong></td>
                    <td style="padding: 6px 0; color: #1c1917;">${escapeHtml(townCity)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e;"><strong>County:</strong></td>
                    <td style="padding: 6px 0; color: #1c1917;">${escapeHtml(county)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e;"><strong>Postcode:</strong></td>
                    <td style="padding: 6px 0; font-weight: 700; color: #1c1917;">${escapeHtml(postcode)}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 8px 6px 0; color: #57534e;"><strong>Country:</strong></td>
                    <td style="padding: 6px 0; color: #1c1917;">${escapeHtml(country)}</td>
                  </tr>
                </table>
              </div>

              <!-- Section 4: Items Ordered -->
              <div style="margin-bottom: 26px;">
                <h2 style="margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #00736a; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #00736a;">
                  4. Items Ordered (${order.items.length} ${order.items.length === 1 ? 'Item' : 'Items'})
                </h2>
                ${itemsHtml}
              </div>

              <!-- Section 5: Payment and Total -->
              <div style="margin-bottom: 12px;">
                <h2 style="margin: 0 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #00736a; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #00736a;">
                  5. Payment and Total
                </h2>
                <div style="background-color: #f5f5f4; border-radius: 10px; padding: 16px; border: 1px solid #e7e5e4;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-size: 14px;">
                    <tr>
                      <td style="padding: 5px 0; color: #57534e;">Items Subtotal:</td>
                      <td align="right" style="padding: 5px 0; font-weight: 600; color: #1c1917;">&pound;${order.subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style="padding: 5px 0; color: #57534e;">Postage / Delivery Cost (Tracked UK Delivery):</td>
                      <td align="right" style="padding: 5px 0; font-weight: 600; color: #1c1917;">&pound;${order.shippingCost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0 6px 0; border-top: 1px solid #d6d3d1; font-size: 16px; font-weight: 800; color: #1c1917;">Total Order Value:</td>
                      <td align="right" style="padding: 10px 0 6px 0; border-top: 1px solid #d6d3d1; font-size: 18px; font-weight: 800; color: #00736a;">&pound;${order.totalAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 0 2px 0; color: #57534e; font-size: 13px;">Payment Status:</td>
                      <td align="right" style="padding: 6px 0 2px 0; font-weight: 700; color: #166534; font-size: 13px;">${escapeHtml(order.paymentStatus)}</td>
                    </tr>
                    <tr>
                      <td style="padding: 2px 0; color: #57534e; font-size: 13px;">Payment Method:</td>
                      <td align="right" style="padding: 2px 0; font-weight: 600; color: #1c1917; font-size: 13px;">${escapeHtml(order.paymentMethod)}</td>
                    </tr>
                  </table>
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #fafaf9; border-top: 1px solid #e7e5e4; padding: 16px 24px; text-align: center; font-size: 12px; color: #78716c;">
              Automated order confirmation dispatched by ADOPTD Christian Clothing.<br />
              Order Reference: #${escapeHtml(order.orderNumber)} &bull; Stripe Payment ID: ${escapeHtml(order.stripePaymentId)}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}

export async function sendOrderConfirmationEmail(order: OrderRecord): Promise<{
  sent: boolean;
  emailId?: string;
  recipient: string;
  subject: string;
  error?: string;
}> {
  const recipient =
    process.env.ORDER_NOTIFICATION_EMAIL ||
    process.env.BUSINESS_EMAIL ||
    'adoptdclothing@gmail.com';
  const fromAddress =
    process.env.RESEND_FROM_EMAIL || 'ADOPTD Orders <onboarding@resend.dev>';
  const resendApiKey = process.env.RESEND_API_KEY;

  const { subject, html, text } = buildOrderConfirmationEmail(order);

  if (!resendApiKey) {
    console.warn(
      `[Order Email] RESEND_API_KEY is not configured. Order #${order.orderNumber} email was prepared for ${recipient} but not dispatched over HTTP.`
    );
    return {
      sent: false,
      recipient,
      subject,
      error: 'RESEND_API_KEY is not configured in environment variables.',
    };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`,
      // Native Resend idempotency key guarantees no duplicate emails for the same PaymentIntent
      'Idempotency-Key': `order-confirmation-${order.stripePaymentId}`,
    },
    body: JSON.stringify({
      from: fromAddress,
      to: [recipient],
      ...(order.customerEmail && order.customerEmail.includes('@')
        ? { reply_to: order.customerEmail }
        : {}),
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Resend API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return {
    sent: true,
    emailId: data?.id,
    recipient,
    subject,
  };
}
