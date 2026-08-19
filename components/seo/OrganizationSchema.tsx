import { siteUrl } from '@/lib/seo/site-url';

/**
 * `Organization` structured data.
 *
 * ⚠️  ONLY VERIFIABLE FACTS. Structured data is a machine-readable
 * claim about the company; anything wrong here is wrong in a form
 * search engines act on directly.
 *
 * Deliberately ABSENT, and each for a reason:
 *
 *   • Any Australian location. Settled 19 Aug 2026 — the overseas
 *     entity is not registered under the Hegtavic name and the owner
 *     asked that it not be claimed. Do not add it back.
 *   • Employee count. The company's own public listings disagree with
 *     each other, so there is no number that can be stated honestly.
 *   • Street address, telephone. Not confirmed.
 *   • aggregateRating / review. Third-party reviews exist, but a
 *     company publishing its own aggregate rating in its own markup is
 *     self-serving structured data, and Google discounts or penalises
 *     self-issued review snippets. The reviews stay on the page as
 *     attributed quotations instead.
 *
 * Founding year is from the company's own public business listing.
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hegtavic Tech Co (Pvt) Ltd',
    alternateName: 'Hegtavic',
    url: siteUrl,
    /**
     * ⚠️  Must be the square mark, NOT the 1200x630 social banner.
     * Google uses Organization.logo for knowledge-panel and rich
     * results and crops toward square, so a wide banner renders badly
     * or is rejected outright. og-default.png belongs in
     * openGraph.images and nowhere else.
     */
    logo: `${siteUrl}/icon.png`,
    description:
      'AI and software engineering company building intelligent systems, custom software and data platforms for international clients.',
    foundingDate: '2019',
    slogan: 'Build Smarter. Scale Faster.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'info@hegtavic.com',
      availableLanguage: ['en'],
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Generative AI',
      'Software Engineering',
      'Data Engineering',
      'Cloud Modernization',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
