const expiresAt = ttl_seconds
  ? createdAt + ttl_seconds * 1000
  : null;

await kv.hset(`paste:${id}`, {
  content,
  maxViews: max_views ?? null,
  views: 0,
  expiresAt
});
