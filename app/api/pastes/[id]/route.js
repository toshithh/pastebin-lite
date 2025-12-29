import { fetchPasteOr404 } from '@/lib/paste';

export const runtime = 'nodejs';

export async function GET(request, { params }) {
  const paste = await fetchPasteOr404(request, params.id);

  if (!paste) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return Response.json({
    content: paste.content,
    remaining_views: paste.remainingViews,
    expires_at: paste.expiresAt
  });
}
