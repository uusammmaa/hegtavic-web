import type { MetadataRoute } from 'next';
import { capabilities } from '@/lib/content/capabilities';
import { publishedCaseStudies } from '@/lib/content/case-studies';
import { siteUrl } from '@/lib/seo/site-url';

/**
 * sitemap.xml
 *
 * Derived from the same content modules the pages render from, so a
 * new capability or case study appears here automatically. A sitemap
 * maintained by hand drifts, and a sitemap that lists a 404 is worse
 * than no sitemap.
 *
 * ⚠️  Only VERIFIED case studies are listed. `publishedCaseStudies`
 * excludes specimens by construction, so a specimen can never be
 * advertised to a search engine even if one were somehow rendered.
 *
 * ⚠️  Retired spam URLs are deliberately absent. They must be
 * crawlable so their 410 is seen, but they must never be advertised.
 *
 * Priorities are relative, not absolute: the homepage and the contact
 * page are what the site exists to lead to.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: ReadonlyArray<[string, number]> = [
    ['', 1],
    ['/expertise', 0.9],
    ['/work', 0.9],
    ['/partnership', 0.8],
    ['/about', 0.8],
    ['/contact', 0.9],
    ['/careers', 0.6],
    ['/privacy', 0.3],
    ['/terms', 0.3],
  ];

  return [
    ...staticPages.map(([path, priority]) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...capabilities.map((capability) => ({
      url: `${siteUrl}/expertise/${capability.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...publishedCaseStudies.map((study) => ({
      url: `${siteUrl}/work/${study.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
