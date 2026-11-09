import { put } from '@vercel/blob';

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
