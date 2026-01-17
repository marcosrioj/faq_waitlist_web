# FAQ.com.br Landing

Production-ready multi-language landing page for FAQ.com.br built with Next.js (App Router), TypeScript, Tailwind CSS, and Prisma.

## Env Vars

- `DATABASE_URL` - Postgres connection string.
- `NEXT_PUBLIC_APP_URL` - Public base URL for canonical and hreflang (e.g. `https://faq.com.br`).
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

Root `/` redirects to the default locale (`/en`). If you see a 404 at `/`, hit a locale path directly.

## API Routes

- `POST /api/leads` - Create or update a lead (includes spam protection and `lead_submitted` event).
- `POST /api/events` - Log events.
- `GET /api/health` - Health check.

## Deployment Notes

- Deployable on Vercel. Set env vars in the project settings.
- If using Prisma in serverless, consider connection pooling.
- Rate limiting uses in-memory storage and resets on cold starts; use a shared store in production if needed.
