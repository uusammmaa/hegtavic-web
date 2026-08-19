/**
 * The origin used for canonicals, sitemap entries and OG images.
 *
 * ⚠️  Do NOT collapse this into `PRODUCTION_URL ?? VERCEL_URL`.
 * Vercel sets VERCEL_PROJECT_PRODUCTION_URL on EVERY deployment,
 * previews included, so a `??` chain never reaches VERCEL_URL and each
 * preview would describe itself with production's URLs.
 *
 * Extracted from app/layout.tsx so the sitemap and robots routes
 * resolve the origin identically. Two implementations of this drifting
 * apart is how a sitemap ends up advertising localhost.
 */
const vercelHost =
  process.env.VERCEL_ENV === 'production'
    ? process.env.VERCEL_PROJECT_PRODUCTION_URL
    : (process.env.VERCEL_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL);

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelHost ? `https://${vercelHost}` : 'http://localhost:3000');
