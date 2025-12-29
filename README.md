# Pastebin Lite

A small Pastebin-like web application built with Next.js that allows users to create text pastes and share links to view them, with optional expiration and view limits.

## Running the App Locally

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
npm install
```

Create a `.env.local` file with the required KV environment variables:

```env
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
KV_URL=...
KV_REST_API_READ_ONLY_TOKEN=...
VERCEL_PROJECT_PRODUCTION_URL=baseaddress.com
```

### Start the development server
```bash
npm run dev
```

### Build and deploy on your machine
```bash
npm run build
npm run start
```


## Persistence Layer

The application uses **Vercel KV (Upstash Redis)** for persistence. This allows data to survive across requests in a serverless environment and supports TTL-based expiration and atomic counters for view limits.

## Important Design Decisions
- Vercel is used to deploy the application.
- Serverless persistence is used instead of in-memory storage.
- Each successful API fetch of a paste counts as one view, while HTML views do not.
- Deterministic time support is implemented to enable automated testing of TTL behavior.
- Paste content is rendered safely to prevent script execution.
