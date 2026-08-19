/**
 * Client testimonials.
 *
 * ─────────────────────────────────────────────────────────────
 *  WHY THESE MAY BE PUBLISHED WHEN CASE STUDY CLIENTS MAY NOT
 * ─────────────────────────────────────────────────────────────
 *
 * Every client in case-studies.ts is anonymised, because none has
 * given permission to be named. These are different: each review was
 * given by the client to Clutch, a third-party B2B review platform
 * that verifies reviewers directly, and each is published there under
 * the client's own name and role.
 *
 * So this is not the company publishing claims about its clients. It
 * is the company quoting what clients said publicly, attributed, and
 * citable. A buyer can check every one.
 *
 * ⚠️  RULES
 *   • Quote verbatim. Do not tidy grammar, do not strengthen a claim,
 *     do not merge two sentences into a better one.
 *   • `outcome` must be the client's own words about the result, or be
 *     omitted. It is not a place to characterise the work.
 *   • Never add a testimonial that is not publicly verifiable. If it
 *     came by email or WhatsApp, get written permission first and
 *     record it here.
 *
 * ⚠️  These are earlier web and SEO engagements, not the AI and
 * automation work the company now leads with. They are presented as
 * client feedback rather than as case studies precisely so they
 * evidence track record and delivery without pulling the positioning
 * back toward "web development agency" — which the owner's own brief
 * warns against repeatedly.
 */

export type Testimonial = {
  /** The client organisation, as published on the review platform. */
  client: string;
  /** The reviewer's role, as published. */
  role: string;
  industry: string;
  /** What the engagement was. */
  project: string;
  year: string;
  /** Verbatim. */
  quote: string;
  /** The client's own words about the result. Omit rather than paraphrase. */
  outcome?: string;
};

export const testimonialSource = {
  platform: 'Clutch',
  url: 'https://clutch.co/profile/hegtavic-tech-co-private',
  note: 'Reviews are collected and verified independently by Clutch.',
} as const;

export const testimonials: readonly Testimonial[] = [
  {
    client: 'Esprala Drinks',
    role: 'Director',
    industry: 'Manufacturing · United Kingdom',
    project: 'E-commerce development',
    year: '2021',
    quote: 'They accommodated the UK time zone, which was extremely helpful and timely.',
    outcome: 'Scope of work met our requirements and led to increased traffic to our page.',
  },
  {
    client: 'Al Shalal Pure Drinking Water',
    role: 'Owner',
    industry: 'Consumer Goods',
    project: 'Website and search visibility',
    year: '2020',
    quote: 'They were professional with good communication and flexible approach.',
    outcome:
      'Organic SEO ranking on the first page of Google in some main keywords, which has led to regular enquiries and orders.',
  },
  {
    client: 'Stars Valley School System',
    role: 'Owner',
    industry: 'Education',
    project: 'School platform with online admissions',
    year: '2021',
    quote:
      'They gave us complete details, information about the features, and how to use the WordPress dashboard.',
    outcome:
      'User friendly interface helped in better reviews by parents and students and online admission feature helped in easing the procedure.',
  },
  {
    client: 'Accounts4All',
    role: 'Owner',
    industry: 'Professional Services',
    project: 'Web application with booking and payments',
    year: '2023',
    quote: 'We were fully satisfied with the results of the partnership.',
    outcome:
      'It gave us proper visibility and identity world wide.',
  },
];
