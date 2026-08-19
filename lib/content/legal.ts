/**
 * Privacy and terms content.
 *
 * ⚠️  WHY THIS EXISTS NOW, NOT AT LAUNCH
 * The contact form and the careers application form both collect
 * personal data. The careers form collects a CV, salary expectation
 * and notice period, which is considerably more sensitive than an
 * enquiry. Under UK/EU GDPR and CCPA the site must tell people what
 * is collected, why, on what basis and for how long BEFORE it
 * collects anything. The submit control stays disabled until these
 * pages are live and linked.
 *
 * ⚠️  THIS IS NOT LEGAL ADVICE, AND IT IS DELIBERATELY INCOMPLETE.
 * Everything marked CLIENT_TO_SUPPLY is a fact only the company can
 * confirm — a registered address, a data-protection contact, the
 * actual retention period they intend to honour. Placeholder values
 * are NOT invented for these, because a privacy policy that states
 * something untrue is worse than one that is visibly unfinished.
 *
 * ⛔ BEFORE LAUNCH: every CLIENT_TO_SUPPLY resolved, then reviewed by
 * someone qualified in the jurisdictions being sold into.
 */

export const CLIENT_TO_SUPPLY = '[CLIENT TO SUPPLY]' as const;

export const legalMeta = {
  /** Kept in one place so both pages and the footer agree. */
  lastUpdated: '18 August 2026',
  entity: 'Hegtavic Tech Co (Pvt) Ltd',
  contactEmail: 'info@hegtavic.com',
  /** ⛔ The company must confirm these before launch. */
  registeredAddress: CLIENT_TO_SUPPLY,
  dataProtectionContact: CLIENT_TO_SUPPLY,
} as const;

export type LegalSection = {
  heading: string;
  paragraphs?: readonly string[];
  list?: readonly string[];
  /** Rendered as an unresolved-fact callout rather than as prose. */
  outstanding?: string;
};

export const privacySections: readonly LegalSection[] = [
  {
    heading: 'Who we are',
    paragraphs: [
      `${legalMeta.entity} is a technology and engineering services company. This policy covers this website only — not any system we build or operate for a client, where the client is the data controller and their own policy applies.`,
    ],
    outstanding:
      'Registered address and the named contact for data protection enquiries. Required for GDPR Article 13 transparency.',
  },
  {
    heading: 'What we collect',
    paragraphs: [
      'We collect only what you send us. There is no advertising network on this site, no cross-site tracking, and no profiling.',
    ],
    list: [
      'Enquiry form — your name, work email, and optionally company, country, the area you need help with, an indicative budget, and whatever you write in the message field.',
      'Job applications — the information on the application form, including your CV.',
      'Email — if you write to us directly, we hold that correspondence.',
      'Server logs — your IP address and browser user-agent are processed briefly by our hosting provider to serve the page and to block abuse. We do not use them to identify you.',
    ],
  },
  {
    heading: 'Why we collect it, and on what basis',
    list: [
      'To answer your enquiry. Lawful basis: legitimate interest in responding to someone who asked us to, and steps taken at your request prior to entering a contract.',
      'To assess a job application. Lawful basis: steps taken at your request prior to entering a contract.',
      'To keep the site available and secure. Lawful basis: legitimate interest in operating the service.',
    ],
    paragraphs: [
      'We do not sell personal data, we do not share it with advertisers, and we do not use it to train models.',
    ],
  },
  {
    heading: 'Cookies',
    paragraphs: [
      'This site sets no cookies of its own and uses no analytics or advertising cookies. That is why you are not being asked to consent to any — there is nothing to consent to.',
    ],
  },
  {
    heading: 'Who processes it with us',
    paragraphs: [
      'We use a small number of providers, each doing one job. They act on our instructions and may not use your data for their own purposes.',
    ],
    list: [
      'Vercel — hosting and content delivery.',
      'Resend — delivering form submissions to our inbox.',
      'Cloudflare Turnstile — distinguishing people from automated abuse on our forms.',
      'Our email provider — holding the resulting correspondence.',
    ],
  },
  {
    heading: 'Where your data goes',
    paragraphs: [
      'We are based in Pakistan and our team reads enquiries there. Our providers operate internationally, so if you contact us from the UK, the EU, the United States or elsewhere, your data will be transferred outside your own country.',
      'Pakistan has not been granted an adequacy decision by the UK or the EU. Transfers therefore rely on appropriate safeguards and, for a direct enquiry you choose to send us, on the transfer being necessary to take the steps you asked for.',
    ],
    outstanding:
      'Confirm the safeguard actually relied on for UK/EU transfers — standard contractual clauses with each provider, and whether a transfer risk assessment exists. This matters because the go-to-market is US, Canada, Australia and the UK.',
  },
  {
    heading: 'How long we keep it',
    paragraphs: [
      'Enquiries are kept while we are in contact and for a period afterwards so we can pick up a conversation you may return to. Job applications are kept for the duration of the recruitment process.',
    ],
    outstanding:
      'The company must choose actual retention periods and then honour them. A policy stating a period nobody enforces is a liability, not a protection.',
  },
  {
    heading: 'Your rights',
    paragraphs: [
      'Depending on where you live, you may have the right to ask for a copy of the data we hold about you, to have it corrected or deleted, to object to or restrict how we use it, and to receive it in a portable form. If you are in the UK or EU you may also complain to your data protection authority. If you are in California you may ask what we have collected and ask us to delete it; we do not sell personal information.',
      `To exercise any of these, email ${legalMeta.contactEmail}. We will not charge you and we will not ask you to justify the request.`,
    ],
  },
  {
    heading: 'Changes',
    paragraphs: [
      'If this policy changes materially we will update the date at the top of the page. This site is pre-launch and this policy will be reviewed before it goes live on its production domain.',
    ],
  },
];

export const termsSections: readonly LegalSection[] = [
  {
    heading: 'What these terms cover',
    paragraphs: [
      'These terms govern your use of this website. They do not govern any engagement between us — that is set out in a separate written agreement, and where the two differ, the agreement wins.',
    ],
  },
  {
    heading: 'The content on this site',
    paragraphs: [
      'We describe our capabilities in good faith. Nothing here is an offer, a quotation, a warranty, or professional advice you should act on without talking to us about your particular situation.',
      'Where this site describes work we have done, it describes it accurately or not at all. Any material still marked as a specimen is illustrative and is not a record of real work.',
    ],
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      `The Hegtavic name and logo are registered marks of ${legalMeta.entity}. The text, diagrams and design of this site belong to us. You may read, quote and link to it; you may not present it as your own.`,
    ],
  },
  {
    heading: 'Acceptable use',
    list: [
      'Do not use the forms to send unsolicited commercial messages.',
      'Do not attempt to gain unauthorised access to the site or any connected system.',
      'Do not submit anything unlawful, or anyone else’s personal data without their knowledge.',
    ],
  },
  {
    heading: 'Links to other sites',
    paragraphs: [
      'Where we link out, we do not control what is on the other end and are not responsible for it.',
    ],
  },
  {
    heading: 'Liability',
    paragraphs: [
      'We try to keep this site accurate and available, but we provide it as it is. To the extent the law allows, we are not liable for loss arising from your use of it. Nothing here limits liability that cannot lawfully be limited.',
    ],
  },
  {
    heading: 'Governing law',
    paragraphs: [
      'These terms are governed by the laws of Pakistan.',
    ],
    outstanding:
      'Confirm this is the intended position. Selling into the US, Canada, Australia and the UK, a buyer’s procurement team may push back, and the answer here should match what the company is willing to sign in a contract.',
  },
];
