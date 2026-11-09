import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { clearAirtableCache } from '@/lib/airtable';

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
    return NextResponse.json({
      revalidated: true,
      tag: 'products',
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
