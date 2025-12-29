import kv from '@/lib/kv';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await kv.ping();
    return Response.json({ ok: true });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}
