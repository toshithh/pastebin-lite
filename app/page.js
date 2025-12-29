'use client';

import { useState } from 'react';
import './page.css'
import Header from './header';

export default function Home() {
  const [content, setContent] = useState('');
  const [ttl, setTtl] = useState(500);
  const [maxViews, setMaxViews] = useState(10);
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
    <div className='root'>
      <Header />
      <form className='content-wrapper' onSubmit={(e) => {e.preventDefault();submit()}}>
        <textarea
          placeholder='Paste Content'
          value={content}
          onChange={e => setContent(e.target.value)}
          type="text"
        />


        <div className='twin-opt'>
          <input
            placeholder="TTL seconds"
            value={ttl}
            type="number"
            onChange={e => setTtl(e.target.value)}
          />

          <input
            placeholder="Max views"
            value={maxViews}
            type="number"
            onChange={e => setMaxViews(e.target.value)}
          />
        </div>

        <button type='submit' onClick={submit} style={{alignSelf: "center"}}>Generate Link</button>
      </form>

      {url && <p>{url}</p>}
    </div>
  );
}
