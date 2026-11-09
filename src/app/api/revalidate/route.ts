import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { clearAirtableCache, getProducts } from '@/lib/airtable';

async function handleRevalidation(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  // Simple token guard (optional in dev, recommended in prod)
  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    clearAirtableCache();
    try {
      revalidateTag('products');
    } catch (tagErr) {
      console.warn('[Revalidate] revalidateTag warning:', tagErr);
    }
    revalidatePath('/', 'layout');

    let productsCount = 0;
    let sampleProductName = null;
    let loadError = null;
    let directAirtableError = null;
    let directAirtableCount = 0;

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    if (apiKey && baseId) {
      try {
        const Airtable = require('airtable');
        const testBase = new Airtable({ apiKey }).base(baseId);
        const testRecords = await testBase('Products').select({ maxRecords: 2 }).all();
        directAirtableCount = testRecords.length;
      } catch (e: any) {
        directAirtableError = {
          message: e?.message || String(e),
          statusCode: e?.statusCode || null,
        };
      }
    }

    try {
      const prods = await getProducts();
      productsCount = prods.length;
      sampleProductName = prods[0]?.name || null;
    } catch (e: any) {
      loadError = e?.message || String(e);
    }

    return NextResponse.json({
      revalidated: true,
      tag: 'products',
      productsCount,
      sampleProductName,
      directAirtableCount,
      directAirtableError,
      loadError,
      hasAirtableKey: Boolean(process.env.AIRTABLE_API_KEY),
      hasBaseId: Boolean(process.env.AIRTABLE_BASE_ID),
      hasKvUrl: Boolean(process.env.KV_REST_API_URL),
      hasKvToken: Boolean(process.env.KV_REST_API_TOKEN),
      vercelEnv: process.env.VERCEL_ENV || process.env.NODE_ENV,
      timestamp: Date.now(),
    });
  } catch (err: any) {
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return handleRevalidation(req);
}

export async function GET(req: NextRequest) {
  return handleRevalidation(req);
}
