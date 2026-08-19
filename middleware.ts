import { NextResponse, type NextRequest } from 'next/server';
import gonePaths from '@/lib/seo/gone-paths.json';

/**
 * Returns HTTP 410 Gone for URLs that were injected into the previous
 * site and must never resolve again.
 *
 * ─────────────────────────────────────────────────────────────
 *  WHY THESE ARE HASHED AND NOT LISTED
 * ─────────────────────────────────────────────────────────────
 *
 * This repository is PUBLIC. The paths are the artefacts of a site
 * compromise, and committing them in plain text would publish, in a
 * permanently searchable place, a tidy inventory of what was injected
 * and where. That is a disclosure the company never chose to make, and
 * git history would keep it after any later deletion.
 *
 * So `gone-paths.json` holds truncated SHA-256 digests (128 bits, no
 * collisions across the set) of the lowercased pathname. A request is
 * hashed and compared. The behaviour is identical; the list is not
 * readable. The plaintext inventory stays in the private working
 * directory alongside the planning documents.
 *
 * ─────────────────────────────────────────────────────────────
 *  WHY 410 AND NOT 301 OR 404
 * ─────────────────────────────────────────────────────────────
 *
 * 301 to the homepage would be the instinctive choice and is wrong
 * twice over: it tells search engines these URLs have a legitimate
 * successor, and it passes whatever toxic signal they carry onto the
 * page it points at.
 *
 * 404 would work eventually. 410 states the resource is intentionally
 * and permanently gone, which is both accurate and the stronger signal
 * for removal. Search Console removal requests should still be filed
 * separately — this handles crawlers, not the existing index.
 *
 * ⚠️  Do not add a redirect for any of these. Ever.
 */

const GONE = new Set(gonePaths as string[]);

/** Truncated SHA-256, matching how gone-paths.json was generated. */
async function digest(pathname: string): Promise<string> {
  const bytes = new TextEncoder().encode(pathname.toLowerCase());
  const hash = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash).slice(0, 16))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Compare with a trailing slash, which is how the paths were
  // captured. A request without one must still match.
  const normalised = pathname.endsWith('/') ? pathname : `${pathname}/`;

  const isGone = GONE.has(await digest(normalised));

  // Answer the tombstone BEFORE any normalisation redirect, so a
  // crawler holding the trailing-slash form gets 410 on the first
  // request rather than a 308 that says the opposite.
  if (isGone) {
    return new NextResponse(
      'This page no longer exists and will not return.\n',
      {
        status: 410,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          // Nothing should cache a tombstone for long, but crawlers
          // should not re-request it constantly either.
          'cache-control': 'public, max-age=3600',
          'x-robots-tag': 'noindex',
        },
      },
    );
  }

  // next.config.ts sets skipTrailingSlashRedirect so the check above
  // can run first. That means this file now owns the redirect Next
  // would otherwise have performed. Reproduce it exactly.
  if (pathname.length > 1 && pathname.endsWith('/')) {
    // ⚠️  Build this from request.url, NOT request.nextUrl.clone().
    // Setting .pathname on a NextURL re-applies trailing-slash
    // normalisation, so the redirect target comes back with the slash
    // still on it and the response points at itself — an infinite
    // redirect loop on every real page. A plain URL does not do this.
    const url = new URL(request.url);
    url.pathname = pathname.replace(/\/+$/, '');
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

/**
 * Skip static assets and Next internals. Every injected path was a
 * top-level slug, so this still covers all of them while keeping the
 * hash off the hot path for assets.
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)'],
};
