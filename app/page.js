'use client';

import { useState } from 'react';

export default function Home() {
  const [content, setContent] = useState('');
  const [ttl, setTtl] = useState('');
  const [maxViews, setMaxViews] = useState('');
  const [url, setUrl] = useState(null);

  async function submit() {
    const res = await fetch('/api/pastes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: maxViews ? Number(maxViews) : undefined
      })
    });

    const data = await res.json();
    setUrl(data.url);
  }

  return (
    <div>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <input
        placeholder="TTL seconds"
        value={ttl}
        onChange={e => setTtl(e.target.value)}
      />

      <input
        placeholder="Max views"
        value={maxViews}
        onChange={e => setMaxViews(e.target.value)}
      />

      <button onClick={submit}>Create Paste</button>

      {url && <p>{url}</p>}
    </div>
  );
}
