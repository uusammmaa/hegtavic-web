import { capabilities as capabilityContent } from '@/lib/content/capabilities';

/**
 * Site navigation, derived from lib/content/capabilities.ts.
 *
 * Nothing here restates a slug, label or description. The content
 * module is the single source of truth, so renaming a slug moves
 * the route, the nav link, the mega-menu entry and the footer entry
 * together. Previously these were three hand-maintained copies and
 * a rename would have produced a 404 with a green build.
 *
 * `available: false` marks a route that is planned but not yet
 * built. Those links are filtered out of every rendered list rather
 * than deleted, so enabling one later is a one-word change and
 * nothing 404s in the meantime. The filter is applied by the
 * exports below — never render the raw arrays.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  /** Defaults to true. Set false while the route does not exist. */
  available?: boolean;
};

const isAvailable = (link: NavLink) => link.available !== false;

const toNavLink = (capability: (typeof capabilityContent)[number]): NavLink => ({
  label: capability.navLabel,
  href: `/expertise/${capability.slug}`,
  description: capability.navDescription,
});

/** The six headline capabilities, for the mega-menu and drawer. */
export const capabilities: NavLink[] = capabilityContent
  .filter((c) => !c.demoted)
  .map(toNavLink)
  .filter(isAvailable);

/** Everything, including demoted services, for the footer. */
export const allCapabilities: NavLink[] = capabilityContent.map(toNavLink).filter(isAvailable);

/** The expertise index. Linked explicitly because the desktop header's
 *  "Expertise" control is a menu trigger, not a link — without this the
 *  index page is unreachable from the site chrome, and completely
 *  unreachable on mobile. */
export const expertiseIndex: NavLink = { label: 'All expertise', href: '/expertise' };

const primaryNavAll: NavLink[] = [
  { label: 'Expertise', href: '/expertise' },
  { label: 'Work', href: '/work' },
  { label: 'Partnership', href: '/partnership' },
  { label: 'About', href: '/about' },
  // Careers needs the role details, benefits and hiring process
  // before it can be published. Phase 3.
  { label: 'Careers', href: '/careers', available: false },
];

const footerNavAll: { heading: string; links: NavLink[] }[] = [
  { heading: 'Expertise', links: allCapabilities },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Selected Work', href: '/work' },
      { label: 'Partnership', href: '/partnership' },
      { label: 'Careers', href: '/careers', available: false },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      // ⛔ Both need legal review before publication (Phase 4). The
      // contact form must not accept a submission until the privacy
      // policy is published and linked — see app/(marketing)/contact.
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export const primaryNav = primaryNavAll.filter(isAvailable);

export const footerNav = footerNavAll
  .map((group) => ({ ...group, links: group.links.filter(isAvailable) }))
  .filter((group) => group.links.length > 0);

export const CTA_LABEL = "LET'S TALK";
export const CTA_HREF = '/contact';
