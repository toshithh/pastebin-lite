import { fetchPasteOr404 } from '@/lib/paste';
import { notFound } from 'next/navigation';

export default async function PastePage({ params }) {
  const paste = await fetchPasteOr404(
    { headers: new Headers() },
    params.id
  );

  if (!paste) notFound();

  return (
    <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {paste.content}
    </pre>
  );
}
