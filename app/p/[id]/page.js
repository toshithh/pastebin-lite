import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PastePage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/pastes/${id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  if (!data || !data.content) {
    notFound();
  }

  return (
    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {data.content}
    </pre>
  );
}
