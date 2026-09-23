import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  // Simple token guard (optional in dev, recommended in prod)
  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    revalidatePath('/', 'layout');
    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch (err: any) {
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}
