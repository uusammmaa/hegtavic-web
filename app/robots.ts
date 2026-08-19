import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo/site-url';

/**
 * robots.txt
 *
 * ⛔ THE SITE IS CURRENTLY DISALLOWED IN FULL.
 *
 * It is pre-launch, it carries a `noindex` in the root layout, and it
 * is served from a temporary host. Letting a crawler index the staging
 * origin would create duplicates that then compete with the real
 * domain at cutover.
 *
 * ⚠️  AT LAUNCH: flip `allowIndexing` to true, remove `robots` from the
 * metadata in app/layout.tsx, and only then submit the sitemap. Doing
 * it in the other order submits a sitemap of pages you have told
 * Google to ignore.
 *
 * Note this does NOT hide the retired spam URLs. Disallowing a path
 * stops it being crawled, which would prevent Google ever seeing the
 * 410 that removes it. They must stay crawlable until they drop out of
 * the index — see middleware.ts.
 */
const allowIndexing = false;

export default function robots(): MetadataRoute.Robots {
  if (!allowIndexing) {
    return {
      rules: { userAgent: '*', disallow: '/' },
    };
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
