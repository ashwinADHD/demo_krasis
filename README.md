# KRASIS Demo — Astro

Modern stack demo for the KRASIS scroll prototype.

## Tech

| Layer | Choice |
|-------|--------|
| Framework | [Astro](https://astro.build) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Interactivity | React islands (`client:load`) |
| Icons | Lucide React |
| Forms | Formspree (or swap to Resend API route) |
| Analytics | Plausible or Cloudflare Web Analytics |
| Deploy | Vercel or Cloudflare Pages |
| Lint / format | ESLint + Prettier |

## React islands (interactive only)

- `ThemeToggle` — light/dark mode
- `ScrollNav` — section dots + horizontal wheel scroll
- `ExploreButton` — scroll to contact
- `ContactForm` — Formspree submission

Everything else is static Astro/HTML for performance.

## Setup

```bash
cd demo
npm install
cp .env.example .env
# Edit .env with your Formspree endpoint and analytics domain
npm run dev
```

Open http://localhost:4321

## Scripts

```bash
npm run dev          # local dev server
npm run build        # production build → dist/
npm run preview      # preview production build
npm run lint         # ESLint
npm run format       # Prettier write
```

## Deploy

### Vercel

1. Push `demo/` to GitHub
2. Import repo in Vercel (root: `demo`)
3. Add env vars from `.env.example`

### Cloudflare Pages

1. Connect GitHub repo
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add env vars in dashboard

## Environment variables

| Variable | Purpose |
|----------|---------|
| `PUBLIC_FORMSPREE_ENDPOINT` | Formspree form URL |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Plausible analytics domain |
| `PUBLIC_CF_BEACON_TOKEN` | Cloudflare Web Analytics (optional) |

## Legacy prototype

The original static HTML prototype remains in `../prototype/` for reference.
