/**
 * Site navigation.
 *
 * The six headline capabilities come from the brand brief. Note
 * that "Digital & E-Commerce Platforms" is deliberately absent
 * from this list: it is a retained service but it is demoted out
 * of the primary nav so the positioning is not diluted on the
 * pages that matter. It remains reachable from the services
 * index and the footer.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const capabilities: NavLink[] = [
  {
    label: 'AI & Machine Learning',
    href: '/expertise/ai-machine-learning',
    description: 'Machine learning, NLP, computer vision and predictive systems.',
  },
  {
    label: 'Generative AI & Intelligent Automation',
    href: '/expertise/generative-ai',
    description: 'LLMs, RAG, AI agents, document intelligence and workflow automation.',
  },
  {
    label: 'Software & Product Engineering',
    href: '/expertise/software-product-engineering',
    description: 'Web applications, SaaS platforms, APIs and custom software.',
  },
  {
    label: 'Data Engineering & Analytics',
    href: '/expertise/data-engineering',
    description: 'Pipelines, warehouses and analytics that decisions can rest on.',
  },
  {
    label: 'Cloud & Modernization',
    href: '/expertise/cloud-modernization',
    description: 'Modernising existing systems for scale, reliability and maintainability.',
  },
  {
    label: 'Dedicated Engineering Teams',
    href: '/expertise/dedicated-teams',
    description: 'Skilled engineers working as an extension of your team.',
  },
];

export const primaryNav: NavLink[] = [
  { label: 'Expertise', href: '/expertise' },
  { label: 'Work', href: '/work' },
  { label: 'Partnership', href: '/partnership' },
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Expertise',
    links: [
      ...capabilities.map(({ label, href }) => ({ label, href })),
      { label: 'Digital & E-Commerce Platforms', href: '/expertise/digital-platforms' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Selected Work', href: '/work' },
      { label: 'Partnership', href: '/partnership' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export const CTA_LABEL = "LET'S TALK";
export const CTA_HREF = '/contact';
