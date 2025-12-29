import Header from '@/app/header';
import { notFound } from 'next/navigation';
import '../../page.css'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PastePage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ''}/api/pastes/${id}`,
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
    <div className='root'>
      <Header />

      <div className='content-wrapper'>
        <pre>
          {data.content}
        </pre>

        <a href={`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` ?? '/'} style={{all: "unset", alignSelf: "center"}} className='pointer'><button>Paste and Share Text</button></a>
      </div>
    </div>
  );
}
