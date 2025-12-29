import kv from '@/lib/kv';
import { nowMs } from '@/lib/time';

export async function fetchPasteOr404(request, id) {
  const key = `paste:${id}`;
  const now = nowMs(request);

  const paste = await kv.hgetall(key);
  if (!paste || !paste.content) return null;

  if (paste.expiresAt && now > Number(paste.expiresAt)) {
    return null;
  }

  // atomic increment
  const views = await kv.hincrby(key, 'views', 1);

  if (paste.maxViews && views > Number(paste.maxViews)) {
    return null;
  }

  return {
    content: paste.content,
    remainingViews: paste.maxViews
      ? Math.max(0, paste.maxViews - views)
      : null,
    expiresAt: paste.expiresAt
      ? new Date(Number(paste.expiresAt)).toISOString()
      : null
  };
}
