# FAQ.com.br Landing

Production-ready multi-language landing page for FAQ.com.br built with Next.js (App Router), TypeScript, Tailwind CSS, and Google Forms for lead capture.

## Env Vars

- `NEXT_PUBLIC_APP_URL` - Public base URL for canonical and hreflang (e.g. `https://faq.com.br`).
- `NEXT_PUBLIC_BASE_PATH` - Optional base path for static hosting (e.g. `/faqlandingpage`).
- `NEXT_PUBLIC_STATIC_EXPORT` - Set to `true` for static export builds (GitHub Pages).
- `NEXT_PUBLIC_GOOGLE_FORM_ACTION` - Google Forms `formResponse` endpoint.
- `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_EMAIL` - Entry ID for Email.
- `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_NAME` - Entry ID for Name.
- `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_BUDGET` - Entry ID for Budget.
- `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_LOCALE` - Entry ID for Locale.
- `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UTM_SOURCE` - Entry ID for utm_source.
- `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UTM_MEDIUM` - Entry ID for utm_medium.
- `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UTM_CAMPAIGN` - Entry ID for utm_campaign.
- `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UTM_CONTENT` - Entry ID for utm_content.
- `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_UTM_TERM` - Entry ID for utm_term.

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

3) Start the dev server:

```bash
npm run dev
```

Open the localized route directly if needed:

- `http://localhost:3000/en`
- `http://localhost:3000/pt-br`
- `http://localhost:3000/es`

Root `/` renders the default locale (`/pt-br`). If you see a 404 at `/`, hit a locale path directly.

## Google Forms Setup

Create a Google Form with short-answer fields for the following inputs (mark Email as required):

1) Email
2) Name (optional)
3) Budget (optional)
4) Locale (optional)
5) utm_source (optional)
6) utm_medium (optional)
7) utm_campaign (optional)
8) utm_content (optional)
9) utm_term (optional)

Get the `entry.xxxxx` IDs:

- Open the form, click **⋮ → Get pre-filled link**, fill sample values, and submit.
- The pre-filled URL contains `entry.<id>=...` for each field.
- Copy each `entry.<id>` into `.env` as the matching `NEXT_PUBLIC_GOOGLE_FORM_ENTRY_*` value.

Set the form action URL:

- Use the form URL and replace `/viewform` with `/formResponse`.
- Example: `https://docs.google.com/forms/d/e/FORM_ID/formResponse`

Submissions are sent via `fetch` with `no-cors`, so the UI treats successful requests as submitted.
Budget is submitted as the localized label shown in the UI.

## Deployment Notes

- Deployable on Vercel or GitHub Pages (static export).
- Google Forms handles lead storage; no internal API routes are used.

## GitHub Pages

This project supports static export for GitHub Pages. Note that API routes, middleware, and database features are not available on GitHub Pages.

1) Push to `main` (or update `.github/workflows/gh-pages.yml` to match your default branch).
2) In GitHub repo settings, set Pages source to **GitHub Actions**.
3) Add Actions secrets for `NEXT_PUBLIC_GOOGLE_FORM_*` values.
4) The workflow builds and deploys from `out/`.

Local static export test:

```bash
NEXT_PUBLIC_STATIC_EXPORT=true \
NEXT_PUBLIC_BASE_PATH=/<repo-name> \
NEXT_PUBLIC_APP_URL=https://<owner>.github.io/<repo-name> \
npm run build
```

The workflow sets:
- `NEXT_PUBLIC_STATIC_EXPORT` to `true`.
- `NEXT_PUBLIC_BASE_PATH` to `/<repo-name>`.
- `NEXT_PUBLIC_APP_URL` to `https://<owner>.github.io/<repo-name>`.
- `NEXT_PUBLIC_GOOGLE_FORM_*` from GitHub Actions secrets.

If you use a custom domain at the root, set `NEXT_PUBLIC_BASE_PATH` to an empty string and update `NEXT_PUBLIC_APP_URL` accordingly.
