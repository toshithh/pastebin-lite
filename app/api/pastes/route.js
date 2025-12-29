import kv from '@/lib/kv';
import { nanoid } from 'nanoid';
import { nowMs } from '@/lib/time';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const content = body.content;
  const ttlSeconds = body.ttl_seconds;
  const maxViews = body.max_views;

  if (typeof content !== 'string' || content.trim() === '') {
    return Response.json({ error: 'Invalid content' }, { status: 400 });
  }

  if (ttlSeconds !== undefined && (!Number.isInteger(ttlSeconds) || ttlSeconds < 1)) {
    return Response.json({ error: 'Invalid ttl_seconds' }, { status: 400 });
  }

  if (maxViews !== undefined && (!Number.isInteger(maxViews) || maxViews < 1)) {
    return Response.json({ error: 'Invalid max_views' }, { status: 400 });
  }

  const id = nanoid();
  const createdAt = nowMs(request);

  const expiresAt =
    typeof ttlSeconds === 'number'
      ? createdAt + ttlSeconds * 1000
      : null;

  await kv.hset(`paste:${id}`, {
    content,
    maxViews: maxViews ?? null,
    views: 0,
    expiresAt
  });

  return Response.json({
    id,
    url: `${process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : ''}/p/${id}`
  });
}
