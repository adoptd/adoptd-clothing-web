import { head, put } from '@vercel/blob';

/**
 * Uploads a file buffer (e.g. image extracted from .docx or product photo) to Vercel Blob.
 */
export async function uploadToVercelBlob({
  filename,
  buffer,
  contentType = 'image/jpeg',
}: {
  filename: string;
  buffer: Buffer;
  contentType?: string;
}) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn('[Vercel Blob] BLOB_READ_WRITE_TOKEN not set. Running in local fallback mode.');
    return {
      url: `https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800`,
      pathname: filename,
    };
  }

  try {
    const blob = await put(`adoptd/${Date.now()}-${filename}`, buffer, {
      access: 'public',
      contentType,
    });
    return blob;
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    throw error;
  }
}

const airtableImageUploads = new Map<string, Promise<string>>();

function safePathPart(value: string) {
  return value.replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-').slice(0, 120) || 'image';
}

/**
 * Airtable API attachment URLs expire after a short period. Copy each image to
 * Vercel Blob and reuse its stable public URL instead of exposing the temporary
 * Airtable URL to site visitors.
 */
export async function persistAirtableImage({
  url,
  recordId,
  attachmentId,
  filename,
  contentType,
}: {
  url: string;
  recordId: string;
  attachmentId: string;
  filename?: string;
  contentType?: string;
}): Promise<string> {
  if (!url) return '';

  // A Blob store must be connected to the Vercel project. BLOB_STORE_ID also
  // supports Vercel's OIDC-based authentication where available.
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    console.error('[Vercel Blob] No Blob store is configured. Add BLOB_READ_WRITE_TOKEN (or connect a Blob store) in Vercel project settings.');
    return url;
  }

  const originalName = filename || 'image';
  const extension = originalName.match(/\.[a-zA-Z0-9]{2,8}$/)?.[0] || '';
  const pathname = `adoptd/airtable/${safePathPart(recordId)}/${safePathPart(attachmentId)}${extension}`;
  const cached = airtableImageUploads.get(pathname);
  if (cached) return cached;

  const upload = (async () => {
    try {
      const existing = await head(pathname);
      return existing.url;
    } catch {
      // Not uploaded yet; fetch the fresh Airtable URL and persist it below.
    }

    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Airtable image download failed (${response.status}) for ${recordId}/${attachmentId}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const blob = await put(pathname, buffer, {
      access: 'public',
      addRandomSuffix: false,
      contentType: contentType || response.headers.get('content-type') || 'application/octet-stream',
      cacheControlMaxAge: 60 * 60 * 24 * 30,
    });
    return blob.url;
  })();

  airtableImageUploads.set(pathname, upload);
  try {
    return await upload;
  } catch (error) {
    airtableImageUploads.delete(pathname);
    // A parallel server instance may have uploaded the same attachment first.
    try {
      const existing = await head(pathname);
      return existing.url;
    } catch {
      console.error('[Vercel Blob] Could not persist Airtable image; temporarily using its source URL.', error);
      return url;
    }
  }
}
