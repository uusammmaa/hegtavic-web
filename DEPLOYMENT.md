# Deploying this site

Everything needed to run this site on your own infrastructure. No prior
knowledge of the project is assumed.

---

## What this is

A statically generated [Next.js](https://nextjs.org) site. Almost every
page is HTML built ahead of time, so it is fast and there is very little
that can break in production.

There is **no database**, **no CMS** and **no admin panel** to maintain.
Content lives in the repository as TypeScript files, so changing it is a
code change and a redeploy.

That is a deliberate decision. The previous site was a WordPress install
that was compromised through an unmaintained admin surface. This one has
no equivalent surface to attack.

---

## ⚠️ One hard requirement before you choose a host

**The host must support Next.js middleware.**

`middleware.ts` returns HTTP `410 Gone` for 108 URLs that were injected
into the previous site by an attacker. Those responses are what tell
Google to drop the pages from its index.

On a host that cannot run middleware — most shared/cPanel hosting, or a
plain static file server — those URLs will not return 410, and the spam
pages will linger in search results for the domain far longer.

**Hosts that work:** Vercel (what it is built for), Netlify,
Cloudflare Pages, or any Node.js server you control.
**Hosts that do not:** shared cPanel hosting, plain static file hosting,
anything that only serves files from a folder.

---

## 1. Requirements

- **Node.js 20 or newer**
- **pnpm** — `npm install -g pnpm`

Check what you have:

```bash
node --version    # v20.x or higher
pnpm --version
```

---

## 2. Run it locally first

Do this before deploying. If it works here it will work on a host.

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

To check the real production output rather than the development server:

```bash
pnpm build
pnpm start
```

---

## 3. Environment variables

Copy `.env.example` to `.env.local` and fill it in. **The contact form
needs all three of the first group** — with any one missing it accepts a
message and then shows an error, and the only record is a server log.

| Variable | Required | What it is |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | At launch | The live address, e.g. `https://hegtavic.com`. Used for canonical URLs, the sitemap and social images. On Vercel it is detected automatically; **set it explicitly anywhere else.** |
| `RESEND_API_KEY` | Yes | Sends the contact form. Create at [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL` | Yes | Where enquiries arrive, e.g. `info@hegtavic.com` |
| `CONTACT_FROM_EMAIL` | Yes | Must be on a domain verified in Resend |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Recommended | Spam protection, free from [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) |
| `TURNSTILE_SECRET_KEY` | Recommended | The matching secret |

Without the Turnstile keys the form still works, but **spam protection
fails closed in production** — set them before launch.

> ⛔ Never commit `.env.local`. It is already ignored by git.
> ⛔ Never set `NEXT_PUBLIC_SHOW_SPECIMEN` in production.

---

## 4. Deploy

### Vercel — recommended

1. Sign in at [vercel.com](https://vercel.com) and connect the GitHub account that owns this repository.
2. **Add New → Project**, pick this repository, and accept the detected settings.
3. Add the environment variables from section 3 under **Settings → Environment Variables**.
4. Deploy.

Every push to `main` then redeploys automatically, and every pull
request gets its own preview URL.

### Any Node.js server

```bash
pnpm install
pnpm build
pnpm start          # serves on port 3000
```

Put nginx or similar in front of it, and use a process manager such as
`pm2` or a systemd unit so it restarts on reboot.

---

## 5. Pointing the domain at it

At your domain registrar (wherever `hegtavic.com` is managed):

- **On Vercel:** add the domain under **Settings → Domains** and create
  the DNS records it shows you. Usually an `A` record for the apex and a
  `CNAME` for `www`.
- **On your own server:** an `A` record pointing at the server's IP.

DNS changes can take up to 48 hours to propagate, though it is usually
much faster.

---

## 6. ⛔ The launch checklist

The site is currently **hidden from search engines on purpose.** It is
pre-launch and served from a temporary address; letting Google index
that address would create duplicate pages competing with the real
domain.

Do these **in this order** when going live:

1. **`app/robots.ts`** — change `allowIndexing` from `false` to `true`.
2. **`app/layout.tsx`** — remove the `robots: { index: false, follow: false }` line from `metadata`.
3. **Set `NEXT_PUBLIC_SITE_URL`** to the live domain.
4. Deploy, then confirm <https://hegtavic.com/robots.txt> no longer says `Disallow: /`.
5. **Only now** submit `https://hegtavic.com/sitemap.xml` in
   [Google Search Console](https://search.google.com/search-console).

Submitting the sitemap before step 1 submits pages you have told Google
to ignore.

### After launch — clearing the old spam

In Search Console, use **Removals** to request removal of the injected
URLs. The 410 responses do the work over time; the removal requests make
it faster. The list of affected URLs is held by the project owner and is
deliberately not stored in this repository.

---

## 7. Changing content

Content is TypeScript, under `lib/content/`:

| File | What it holds |
|---|---|
| `company.ts` | Process, differentiators, philosophy, vision, mission, values, who we help |
| `capabilities.ts` | The six capability areas and their pages |
| `case-studies.ts` | Case studies |
| `team.ts` | Team members |
| `roles.ts` | Open jobs |
| `legal.ts` | Privacy policy and terms |

Edit, then `pnpm build` to confirm nothing broke, then commit and push.

### ⛔ Two rules enforced by the tests

**1. Case studies and team members must be marked `verified` or `specimen`.**
A `specimen` is placeholder content and can never be published — the
build excludes it. A `verified` entry must record who confirmed it and
when. There is no third option, and this is checked when you build.

**2. No client names in published content.**
Clients are described by sector and region because none has given
permission to be named. A test fails the build if a known client name
appears. If permission is granted in writing, record it in the entry's
`verifiedSource` field first.

Both rules exist because this site's credibility depends on everything
on it being true.

---

## 8. Checks before you push

```bash
pnpm typecheck    # types
pnpm lint         # code style
pnpm test         # content rules and colour contrast
pnpm build        # the real thing
```

All four run automatically on every pull request.

---

## 9. If something breaks

**Build fails after a content change** — read the error; the content
tests name the file and the rule. Most failures are a missing
`verified`/`specimen` marker or a client name that slipped in.

**Contact form says something went wrong** — one of `RESEND_API_KEY`,
`CONTACT_TO_EMAIL` or `CONTACT_FROM_EMAIL` is missing or wrong. The
server log says which.

**Spam URLs return 404 instead of 410** — the host is not running
middleware. See the requirement at the top.

**A page 404s that should not** — routes come from the content files. A
page only exists if its entry does, and specimens do not produce pages
in production.
