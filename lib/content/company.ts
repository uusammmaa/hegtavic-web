/**
 * Company content — process, differentiators, partnership models,
 * philosophy, vision, mission and values.
 *
 * All headings and most body copy come from the brand brief.
 *
 * ⚠️  Nothing in this file asserts a client outcome, a metric, a
 * headcount, an office location or an award. Every such claim is
 * still unverified and is deliberately absent rather than
 * approximated — see the notes in the components that would
 * otherwise display them.
 */

export const process = [
  {
    step: '01',
    title: 'Discover',
    body: 'Understand your business, users, requirements and objectives.',
  },
  {
    step: '02',
    title: 'Define',
    body: 'Establish scope, architecture, priorities and technical approach.',
  },
  {
    step: '03',
    title: 'Build',
    body: 'Develop using modern engineering practices and technologies.',
  },
  {
    step: '04',
    title: 'Validate',
    body: 'Test, review and refine before production.',
  },
  {
    step: '05',
    title: 'Deploy',
    body: 'Launch and establish the required production environment.',
  },
  {
    step: '06',
    title: 'Evolve',
    body: 'Optimize, improve and scale as your business grows.',
  },
] as const;

export const differentiators = [
  {
    title: 'Engineering That Solves Business Problems',
    body: 'We build technology around real business needs, not technology for its own sake.',
  },
  {
    title: 'AI With Practical Purpose',
    body: 'We focus on AI that can improve decisions, automate workflows and create measurable value.',
  },
  {
    title: 'Built for the Long Term',
    body: 'We design solutions for maintainability, scalability and continuous evolution.',
  },
  {
    title: 'Collaborative by Design',
    body: 'We work alongside clients as an extension of their team and objectives.',
  },
  {
    title: 'Value Beyond Delivery',
    body: 'Our goal is not simply to complete a project, but to create technology that continues delivering value.',
  },
] as const;

export const partnershipModels = [
  {
    title: 'Dedicated Engineering Teams',
    body: 'Add experienced technical talent to your existing team, working as an extension of it.',
    fits: 'Ongoing product work where continuity matters more than flexibility.',
    href: '/expertise/dedicated-teams',
  },
  {
    title: 'Project-Based Development',
    body: "Bring us a defined challenge and we'll help take it from concept to production.",
    fits: 'A well-understood problem with a real boundary around it.',
    href: '/expertise/software-product-engineering',
  },
  {
    title: 'Technology Partnership',
    body: 'Work with Hegtavic as an extended technology capability for your organization.',
    fits: 'Long-term capability, including ongoing maintenance and support.',
    href: '/partnership',
  },
] as const;

/**
 * Brand story.
 *
 * ⚠️  RESOLVING A CONFLICT between the owner's two instructions,
 * 18 Aug 2026.
 *
 *  • The revision document says, under "What Should NOT Change":
 *    "Do not remove 'Technology With Purpose'", and lists it as
 *    KEEP / PRIORITY — "an important differentiator".
 *  • His message afterwards asked for "Technology That Touches Lives"
 *    to be inserted "somewhere in brand story".
 *
 * The body text he sent with the new heading is word-for-word the
 * body already attached to `philosophy` below. So the two are not
 * alternatives to choose between — one is the philosophy heading the
 * document protects, the other is a line he wants in the story.
 *
 * Both are therefore kept: "Technology With Purpose" remains the
 * philosophy section, unchanged, and "Technology That Touches Lives"
 * opens the brand story on /about. Neither instruction is overridden.
 *
 * ⛔ If he actually meant to REPLACE the philosophy heading, this is
 * the one thing in the revision round that needs confirming — the
 * document explicitly forbids that reading, so it is not a change to
 * make on inference.
 *
 * Only the line is stored. He asked to "put this line ... in the brand
 * story", and the paragraph he sent with it is character-for-character
 * `philosophy.body` below, which already renders on /about. Storing it
 * twice would print the same paragraph twice on one page.
 */
export const brandStory = {
  line: 'Technology That Touches Lives',
} as const;

/**
 * Who we help.
 *
 * From the revision document, "Who We Help — CONSIDER ADDING": show
 * that Hegtavic supports businesses at different stages "without
 * unnecessarily restricting the market to large corporations".
 *
 * Describes fit, not client claims — nothing here asserts that a
 * client of any given size exists.
 */
export const whoWeHelp = [
  {
    title: 'Startups',
    body: 'Getting a first version into production without building something that has to be thrown away at the second round of funding.',
  },
  {
    title: 'Growing businesses',
    body: 'Adding engineering capacity, or the specific capability — usually AI or data — that a small team does not have and does not need permanently.',
  },
  {
    title: 'Established organizations',
    body: 'Modernizing systems that still run the business, without a rewrite and without stopping the business to do it.',
  },
] as const;

export const philosophy = {
  title: 'Technology With Purpose',
  body: 'We believe technology is most powerful when it creates meaningful progress — helping businesses grow, enabling people to achieve more and creating lasting value for the communities we serve.',
} as const;

export const vision = {
  title: 'Our Vision',
  body: 'To become a trusted global technology partner helping businesses build intelligent products, modern software and AI-powered systems.',
} as const;

export const mission = {
  title: 'Our Mission',
  body: 'To help businesses solve meaningful problems through intelligent technology, combining AI, software engineering and data expertise to create lasting value.',
} as const;

export const values = [
  'Innovation',
  'Client Success',
  'Engineering Excellence',
  'Transparency',
  'Integrity',
  'Collaboration',
  'Continuous Learning',
] as const;

export const journey = {
  title: 'Our Journey',
  body: 'From software development to AI and advanced engineering, Hegtavic continues to evolve with technology while remaining focused on one principle: creating meaningful value for the people and businesses we serve.',
} as const;

export const aboutIntro = {
  title: 'Technology Built Around Your Business',
  body: 'We believe technology should solve real problems, create measurable value and evolve with your business. Hegtavic combines AI, software engineering and data expertise to build reliable, scalable solutions tailored to each client’s needs.',
} as const;

/**
 * Selected work.
 *
 * ⚠️  Project names come from the brand brief. Descriptions state
 * only the sector and the type of system — they are NOT outcome
 * claims, and no metrics are attached to any of them, because none
 * have been verified.
 *
 * Four are shown rather than the full list: a thin, well-presented
 * selection reads better than an exhaustive grid, and these carry
 * the most substance.
 *
 * ⛔ BEFORE LAUNCH: confirm with the client what each project
 * actually involved, and confirm permission to name them. Until
 * then these remain descriptive only.
 */
export const selectedWork = [
  {
    name: 'Accounts4All',
    sector: 'Professional Services',
    body: 'A web platform for an accounting services provider.',
  },
  {
    name: 'SWSITSERVICES',
    sector: 'Technology Services',
    body: 'A business platform for an IT services company.',
  },
  {
    name: 'CarePlus Pharmacy',
    sector: 'Healthcare',
    body: 'A digital presence and information platform for a pharmacy group.',
  },
  {
    name: 'Stars Valley School System',
    sector: 'Education',
    body: 'A web platform for a school system, covering public information and admissions.',
  },
] as const;

export const industries = [
  {
    name: 'Retail & FMCG',
    body: 'Consumer brands and distributors, from digital presence to operational systems.',
  },
  {
    name: 'Education',
    body: 'Schools and training providers, including admissions and information platforms.',
  },
  {
    name: 'Healthcare',
    body: 'Pharmacy and care providers, with the compliance and privacy that implies.',
  },
  {
    name: 'Professional Services',
    body: 'Accounting, consulting and services firms with document-heavy operations.',
  },
] as const;
