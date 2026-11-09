import Airtable from 'airtable';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_TABLES = new Set(['Products', 'Blog', 'Blog Posts', 'Journal', 'Articles']);
const recordCache = new Map<string, { expiresAt: number; promise: Promise<any> }>();

async function getCachedAirtableRecord(airtableBase: any, tableName: string, recordId: string) {
  const key = `${tableName}:${recordId}`;
  const cached = recordCache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.promise;
  }

  const promise = airtableBase(tableName).find(recordId);
  recordCache.set(key, { expiresAt: Date.now() + 30_000, promise });
  try {
    return await promise;
  } catch (error) {
    recordCache.delete(key);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tableName = searchParams.get('table') || '';
  const recordId = searchParams.get('recordId') || '';
  const attachmentId = searchParams.get('attachmentId') || '';

  if (!ALLOWED_TABLES.has(tableName) || !recordId || !attachmentId) {
    return NextResponse.json({ error: 'Invalid image reference.' }, { status: 400 });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) {
    return NextResponse.json({ error: 'Image service is not configured.' }, { status: 503 });
  }

  try {
    const airtableBase = new Airtable({ apiKey }).base(baseId);
    const record = await getCachedAirtableRecord(airtableBase, tableName, recordId);
    if (tableName === 'Products' && record.fields['Published'] !== true) {
      return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
    }
    if (tableName !== 'Products' && (record.fields['Published'] === false || record.fields['Status'] === 'Draft')) {
      return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
    }

    const attachment = Object.values(record.fields)
      .flatMap((value: any) => Array.isArray(value) ? value : [])
      .find((item: any) => item?.id === attachmentId);

    if (!attachment?.url) {
      return NextResponse.json({ error: 'Image not found.' }, { status: 404 });
    }

    // Airtable's API download URLs expire, so resolve the current URL on the
    // server each time this cached image endpoint needs to fetch the asset.
    const imageResponse = await fetch(attachment.url, { cache: 'no-store' });
    if (!imageResponse.ok) {
      console.error('[Airtable image proxy] Upstream image request failed:', imageResponse.status);
      return NextResponse.json({ error: 'Unable to retrieve image.' }, { status: 502 });
    }

    const contentType = imageResponse.headers.get('content-type') || attachment.type || '';
    if (!contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'Attachment is not an image.' }, { status: 415 });
    }

    const imageBuffer = await imageResponse.arrayBuffer();
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('[Airtable image proxy] Failed to retrieve attachment:', error);
    return NextResponse.json({ error: 'Unable to retrieve image.' }, { status: 502 });
  }
}
