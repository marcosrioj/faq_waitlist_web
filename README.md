# FAQ.com.br Landing

Production-ready multi-language landing page for FAQ.com.br built with Next.js (App Router), TypeScript, Tailwind CSS, and Prisma.

## Env Vars

- `DATABASE_URL` - Postgres connection string.
- `NEXT_PUBLIC_APP_URL` - Public base URL for canonical and hreflang (e.g. `https://faq.com.br`).
- `NEXT_PUBLIC_BASE_PATH` - Optional base path for static hosting (e.g. `/faqlandingpage`).
- `NEXT_PUBLIC_STATIC_EXPORT` - Set to `true` for static export builds (GitHub Pages).
- `RATE_LIMIT_SECRET` - Secret used to hash rate-limit keys.

See `.env.example` for a template.

## Local Dev

1) Install dependencies:

```bash
npm install
```

2) Set env vars:

```bash
cp .env.example .env
```

3) Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

4) Start the dev server:

```bash
npm run dev
```

Open the localized route directly if needed:

- `http://localhost:3000/en`
- `http://localhost:3000/pt-br`
- `http://localhost:3000/es`

Root `/` renders the default locale (`/pt-br`). If you see a 404 at `/`, hit a locale path directly.

## API Routes

- `POST /api/leads` - Create or update a lead (includes spam protection and `lead_submitted` event).
- `POST /api/events` - Log events.
- `GET /api/health` - Health check.

## Deployment Notes

- Deployable on Vercel. Set env vars in the project settings.
- If using Prisma in serverless, consider connection pooling.
- Rate limiting uses in-memory storage and resets on cold starts; use a shared store in production if needed.

## GitHub Pages

This project supports static export for GitHub Pages. Note that API routes, middleware, and database features are not available on GitHub Pages.

1) Push to `main` (or update `.github/workflows/gh-pages.yml` to match your default branch).
2) In GitHub repo settings, set Pages source to **GitHub Actions**.
3) The workflow builds and deploys from `out/`.

Local static export test:

```bash
NEXT_PUBLIC_STATIC_EXPORT=true \
NEXT_PUBLIC_BASE_PATH=/faq_waitlist_web \
NEXT_PUBLIC_APP_URL=https://<owner>.github.io/faqlandingpage \
npm run build
```

The workflow sets:
- `NEXT_PUBLIC_STATIC_EXPORT` to `true`.
- `NEXT_PUBLIC_BASE_PATH` to `/<repo-name>`.
- `NEXT_PUBLIC_APP_URL` to `https://<owner>.github.io/<repo-name>`.

If you use a custom domain at the root, set `NEXT_PUBLIC_BASE_PATH` to an empty string and update `NEXT_PUBLIC_APP_URL` accordingly.
