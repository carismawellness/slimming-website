# CLAUDE.md — Carisma Slimming Website

This repository is **only** the marketing website for **Carisma Slimming** (Malta).
Keep it that way: everything here is website code, content-as-code, or build config.
Do not add business-ops, CRM, finance, scraping, or scratch tooling here.

## ⚠️ This is a customized Next.js

This is a customized **Next.js 16.2.7** — APIs, conventions, and file structure may
differ from your training data. **Read the relevant guide in
`node_modules/next/dist/docs/` before writing any code**, and heed deprecation
notices. See also [AGENTS.md](AGENTS.md).

## Stack

- **Next.js 16.2.7** (App Router, Turbopack) · **React 19** · **TypeScript 5**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- Deploys automatically to **Vercel on push to `main`** → `slimming-seven.vercel.app`
  (production domain: `carismaslimming.com`).

## Project structure

- `app/` — App Router routes. Each route is a folder with `page.tsx` (plus optional
  `layout.tsx`, `route.ts`). Dynamic routes use `[param]` (e.g. `app/packages/[service]`).
- `components/` — shared/presentational React components.
- `lib/` — content-as-code and helpers:
  - data modules: `services.ts`, `packages/`, `reviews.ts`, `redesign/`
  - `lib/seo/` — JSON-LD: `JsonLd.tsx` (sanitized `<script>`) + `schema.ts` (builders)
  - `lib/faq/` — FAQ content as single-source modules
- `public/` — static assets (images, fonts).
- Config: `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`.

## Working rules

1. **Verify before claiming done**: `npm run build` must pass (compile + TypeScript).
   For SEO/schema work, also inspect the prerendered HTML under `.next/server/app/*.html`.
2. **Surgical edits**: preserve `className`/props/inline styles; don't restructure
   layout, copy, or components unless that's the task.
3. Don't run `dev`/`build` from subagents unnecessarily — it's slow and noisy.

## SEO conventions (this is a marketing site — SEO is a first-class concern)

- Exactly **one `<h1>` per page**, containing the page's primary keyword and "Malta"
  where it reads naturally. Logical `H1 → H2 → H3` with no skipped levels. Headings
  must be descriptive and keyword-relevant — never generic, never stuffed.
- Metadata via `export const metadata` / `generateMetadata`: `title`, `description`,
  and `alternates.canonical`.
- Utility pages (thank-you, quiz-results, internal preview) use
  `robots: { index: false, follow: true }`. **Do not also `Disallow` them in
  `app/robots.ts`** — Googlebot must be able to crawl a page to see its `noindex`.
- Crawl/index rules live in `app/robots.ts` and `app/sitemap.ts`.

## Structured data (JSON-LD)

- Build schema with the `lib/seo/schema.ts` builders (`breadcrumbList`, `faqPage`,
  `serviceSchema`, `medicalProcedure`, `medicalWebPage`) and render with
  `<JsonLd data={...} />` from `lib/seo/JsonLd`.
- FAQ / Service / Breadcrumb data **must match the visible content**. Keep FAQ copy in
  a single-source module under `lib/faq/` shared by both the visible component and the
  schema — never hand-duplicate it.
- **Exactly one `FAQPage` per page.** Place page-scoped JSON-LD on the page itself, not
  a shared `layout.tsx`, so it doesn't leak onto nested routes (e.g. `/weight-loss/thank-you`).
- **Never import a data array from a `'use client'` module into a server component** —
  you get a client-reference proxy, not the array. Put shared data in a plain module
  (see `lib/faq/`).

## Typography (brand rules)

- **Trajan Pro is ALWAYS uniform uppercase — never mixed/title case.** It's a
  titling-capitals face (no true lowercase → lowercase renders as small caps), so
  title case ("Carisma Slimming") produces an ugly two-height look. Any element using
  Trajan must have `text-transform: uppercase` (headings are enforced globally via
  `h1–h6` in `globals.css`; for non-heading Trajan spans add `textTransform: 'uppercase'`).
  Only `.font-script` is exempt. See `docs/DESIGN_GUIDELINES.md`.

## Accessibility

- Use the locked **WCAG AA** color tokens: deep sage `#4f7256` for text / icons / CTA
  fills; darkened taupe (`#6f6456` / `#5a5043`) for body text. Bright brand sage
  `#8EB093` is **decorative only** — don't use it as text/icon color on light grounds.

## Brand voice

- Persona **Katya** — compassionate truth-telling, gentle structure, evidence-led,
  shame-free, future-focused. Audience: women 25+ in Malta. Signature feel:
  "#1 voted slimming clinic in Malta."

## Deploy

- Push to `main` → Vercel auto-deploys. Doc/cleanup changes don't affect the build;
  code changes do — always verify `npm run build` first.

### Auto-deploy (no "want me to push?" prompts)

- A Claude Code **Stop hook** runs `.claude/auto-deploy.sh` after every turn: it
  pushes any *committed* changes on the current branch to `main` (→ Vercel deploys
  to production). So **commit your work and it goes live automatically — never ask
  the user before pushing.**
- The hook is **push-only**: it never `git add`/`commit`s, so uncommitted /
  in-progress work is never deployed by surprise. To deploy, just commit.
- Always run `npm run build` before committing — Vercel build-gates production, but
  a green local build keeps the history clean.
- Hook wiring: committed `.claude/settings.json` (fires when this repo is the
  Claude project) + the user's local `…/Carisma AI/.claude/settings.local.json`
  (fires when working from the vault root). Manage/disable via `/hooks`.
