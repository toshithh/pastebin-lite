import { fetchPasteOr404 } from '@/lib/paste';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request, { params }) {
  const id = (await params).id;
  const paste = await fetchPasteOr404(request, id);

  if (!paste) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  return Response.json({
    content: paste.content,
    remaining_views: paste.remainingViews,
    expires_at: paste.expiresAt
  });
}
