import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';

const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const base = apiKey && baseId ? new Airtable({ apiKey }).base(baseId) : null;

// Fallback SVG placeholder if Airtable is completely unreachable
const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" fill="#f3f4f6">
  <rect width="600" height="600" fill="#f5f5f4"/>
  <path d="M260 280l30 35 45-55 65 80H200z" fill="#d6d3d1"/>
  <circle cx="250" cy="240" r="20" fill="#d6d3d1"/>
  <text x="50%" y="420" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" fill="#a8a29e" text-anchor="middle">Adoptd Clothing</text>
</svg>`;

async function fetchWithTimeout(url: string, timeoutMs = 6000): Promise<Response | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return res;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const url = searchParams.get('url');
  const rec = searchParams.get('rec');
  const field = searchParams.get('field');
  const table = searchParams.get('table') || 'Products';

  let imageRes: Response | null = null;

  // 1. Attempt to fetch directly from the provided URL first
  if (url && (url.startsWith('https://') || url.startsWith('http://'))) {
    imageRes = await fetchWithTimeout(url);
  }

  // 2. If initial fetch failed, expired (e.g. 403 / 410), or returned an error, retrieve a fresh URL via Airtable API
  if ((!imageRes || !imageRes.ok) && rec && base) {
    try {
      const record = await base(table).find(rec);
      if (record) {
        let freshUrl = '';
        if (field && record.fields[field]) {
          const target = record.fields[field];
          if (Array.isArray(target) && target.length > 0 && target[0].url) {
            freshUrl = target[0].url;
          }
        }

        // If field wasn't specified or didn't match, search for any image attachment
        if (!freshUrl) {
          const allKeys = Object.keys(record.fields);
          for (const k of allKeys) {
            const val = record.fields[k];
            if (Array.isArray(val) && val.length > 0 && val[0].url) {
              const mime = val[0].type || '';
              const filename = val[0].filename || '';
              if (mime.startsWith('image/') || /\.(jpe?g|png|webp|avif|gif)$/i.test(filename)) {
                freshUrl = val[0].url;
                break;
              }
            }
          }
        }

        if (freshUrl) {
          imageRes = await fetchWithTimeout(freshUrl);
        }
      }
    } catch (err) {
      console.error('[airtable-image] Failed to refresh attachment from Airtable:', err);
    }
  }

  // 3. Return the cached image binary with permanent edge caching
  if (imageRes && imageRes.ok) {
    const contentType = imageRes.headers.get('content-type') || 'image/jpeg';
    const arrayBuffer = await imageRes.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Cache permanently in Vercel Edge CDN (1 year) and browser
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
      },
    });
  }

  // 4. Return clean SVG placeholder if all attempts fail
  return new NextResponse(FALLBACK_SVG, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=120',
    },
  });
}
