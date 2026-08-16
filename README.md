# Hegtavic — Corporate Website

Marketing and content site for Hegtavic, a technology and AI engineering company. Next.js 15 App Router, Payload CMS, TypeScript and Tailwind v4, built static-first for performance and a minimal production attack surface.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Payload](https://img.shields.io/badge/Payload-3-000000)](https://payloadcms.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![pnpm](https://img.shields.io/badge/pnpm-package%20manager-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)

> **Status:** in active development. Replaces a legacy CMS site, with a full URL migration map.

---

## Why it is built this way

A corporate marketing site is an easy thing to build badly. The constraints that shaped this one:

- **Static-first.** Every marketing page is generated at build time. There is no CMS runtime on the public origin, no admin login exposed to the internet and no plugin surface — the editing interface and the delivered site are separate concerns.
- **Content integrity is enforced by CI, not by discipline.** Placeholder content used during design cannot reach production; the build fails instead. See [Content integrity](#content-integrity) — this is the most unusual part of the codebase and the part most worth reading.
- **Accessibility and performance are budgets, not aspirations.** Both are checked in CI and both block a merge.
- **The brand is fixed; the system around it is not.** The palette and mark are registered assets. Everything else — type scale, spacing, colour roles, contrast handling — is derived and documented.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, React Server Components), React 19, TypeScript 5 |
| CMS | Payload 3, embedded in the Next.js app |
| Database | PostgreSQL 16 (Neon) — CMS content only |
| Styling | Tailwind CSS 4 with CSS custom properties for brand tokens |
| Forms | React Server Actions + Resend + Cloudflare Turnstile |
| Analytics | Vercel Analytics (cookieless) |
| Hosting | Vercel |
| Package manager | **pnpm** |

---

## Architecture

```
app/
  (marketing)/          statically generated public pages
  (payload)/admin/      CMS, excluded from the public sitemap
  api/                  route handlers — forms, revalidation, OG images
components/
  primitives/           Button, Card, Section, Container, Grid, Input …
  marketing/            Hero, CapabilityGrid, ProcessSteps, CTABanner …
  case-study/           CaseStudyHeader, OutcomeMetrics, ArchitectureDiagram
  diagrams/             hand-authored SVG system, theme-aware
lib/
  seo/                  metadata, JSON-LD emitters, sitemap
  redirects/            legacy URL migration map (301 / 410)
  content-integrity/    specimen gate — see below
payload/
  collections/          CaseStudies, Projects, Services, Team, Jobs
styles/
  tokens.css            brand tokens, single source of truth
```

### Rendering

Marketing pages are fully static. CMS-driven collections use incremental static regeneration with on-demand revalidation from a Payload `afterChange` hook, so an editor's save invalidates exactly the affected routes rather than the whole site.

### Legacy URL migration

The site it replaces had a large, partly obsolete URL surface. `lib/redirects/` holds a typed map applied at the edge:

- **301** — retained pages remapped to their new equivalents
- **410 Gone** — retired URLs that must be de-indexed rather than forwarded

410 is deliberate. Redirecting retired URLs into live pages passes their signals along with them; `410` tells crawlers the resource is permanently gone and de-indexes fastest. The map is a build-time constant and is covered by tests.

---

## Design system

Brand assets are fixed and are not redesigned here: the registered mark, the `EMBRACE TECHNOLOGY` lock-up and the green/graphite palette.

```css
--brand-green:  #6CBD4D;  /* registered brand green, sampled from the mark */
--brand-ground: #16181A;  /* graphite */
```

**The interesting constraint:** `#6CBD4D` on white measures **2.33:1**, well below the WCAG AA threshold of 4.5:1 for text. The brand green is therefore treated strictly as a *surface and accent* colour, never as text on a light ground:

| Role | Token | Contrast |
|---|---|---|
| Brand green on graphite | `--color-brand-green` | 7.65:1 ✅ AAA |
| Graphite text on brand green (CTA) | `--color-graphite` | 7.65:1 ✅ AAA |
| Green text on white | `--color-green-ink` `#3F7529` | 5.54:1 ✅ AA |
| ~~Brand green as text on white~~ | — | 2.33:1 ❌ never used |

Every colour pairing in `tokens.css` is annotated with its measured ratio, and a unit test asserts the contrast of each documented pair so a future palette edit cannot silently break AA.

**Typography** — Geist Sans for display and body, Geist Mono for technical labelling (stack names, metric labels, process numbering). Both self-hosted variable fonts.

**Motion** — entrance transitions under 250ms and nothing else. No parallax, no scroll-jacking, no animated counters. All motion respects `prefers-reduced-motion`.

---

## Content integrity

Realistic placeholder content is necessary to design a case study template — an empty box cannot be reviewed, and `Lorem ipsum` cannot be judged for rhythm or length. It is also the kind of thing that reaches production by accident.

Every content document therefore carries a required status field:

```ts
status: 'specimen' | 'draft' | 'published'   // defaults to 'specimen'
```

- **`specimen`** — placeholder written for design review. Rendered only outside production, always behind a persistent watermark that cannot be disabled per page.
- The production build **fails** if any `specimen` document is publishable, and the check is a required status check on `main`.

The result is that placeholder content is impossible to ship, rather than merely discouraged. Specimen content lives outside this repository entirely.

---

## Quality gates

Enforced in CI; all block a merge.

| Gate | Threshold |
|---|---|
| Lighthouse — LCP | < 2.0s |
| Lighthouse — CLS | < 0.05 |
| Lighthouse — INP | < 200ms |
| Accessibility | WCAG 2.2 AA, zero axe violations |
| Colour contrast | every documented token pair asserted |
| Content integrity | no publishable `specimen` documents |
| Types · lint | `tsc --noEmit`, ESLint, Prettier |

---

## Local setup

**Prerequisites** — [Node.js](https://nodejs.org/) 20+, [pnpm](https://pnpm.io/installation), and a PostgreSQL connection string ([Neon](https://neon.tech/)'s free tier is sufficient).

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Set `DATABASE_URI`, `PAYLOAD_SECRET`, and — if you are working on forms — `RESEND_API_KEY` and the Turnstile keys. Never commit real secrets.

3. **Run migrations and start**

   ```bash
   pnpm payload migrate
   pnpm dev
   ```

   Site at `http://localhost:3000`, CMS at `http://localhost:3000/admin`.

## Scripts

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build, including the content-integrity gate |
| `pnpm lint` · `pnpm typecheck` | ESLint · `tsc --noEmit` |
| `pnpm test` | Unit tests, including contrast assertions |
| `pnpm test:a11y` | axe accessibility pass |
| `pnpm payload migrate` | Apply database migrations |

---

## Roadmap

- [x] Brand tokens, contrast model, type scale
- [ ] Primitives and layout system
- [ ] SVG diagram system
- [ ] Homepage
- [ ] Capability and about pages
- [ ] Payload collections and case study template
- [ ] SEO, URL migration map, structured data
- [ ] Performance and accessibility passes

## Licence

Source released under the [MIT Licence](LICENSE). The Hegtavic name, logo, `EMBRACE TECHNOLOGY` lock-up and brand assets are the property of Hegtavic Tech Co and are **not** covered by that licence.
