/**
 * Case studies.
 *
 * ═══════════════════════════════════════════════════════════════
 *  THE VERIFICATION GATE — read before adding anything here
 * ═══════════════════════════════════════════════════════════════
 *
 * The client's brief says: "Do not invent metrics, outcomes or client
 * claims. Use measurable results only where they can be verified."
 *
 * That is enforced by the type system rather than by discipline.
 * `CaseStudy` is a discriminated union with no default:
 *
 *   • { status: 'specimen',  … } — requires `specimenNotice` saying in
 *     prose what is untrue, and is excluded from
 *     `publishedCaseStudies` by construction; or
 *   • { status: 'verified', … } — requires `verifiedOn`,
 *     `verifiedSource` and `namingPermission`: WHO confirmed it, WHEN,
 *     and whether the client may be named.
 *
 * ─────────────────────────────────────────────────────────────
 *  19 August 2026 — the fabricated specimens were DELETED
 * ─────────────────────────────────────────────────────────────
 *
 * Until this date every entry here was invented placeholder content.
 * They are replaced by five real engagements drawn from the delivery
 * record in PROOF-EVIDENCE.md, which is kept outside this repository
 * because this repository is public.
 *
 * ⚠️  EVERY CLIENT IS ANONYMISED, DELIBERATELY. None has given
 * permission to be named, and one was excluded by name at the client's
 * likely objection. Sector and region only. Do not add a client name
 * without written permission recorded in `verifiedSource`.
 *
 * ⚠️  EVERY NUMBER BELOW IS OBSERVED, NOT ESTIMATED. Hours and dates
 * come from the engagement record; counts of workflows, sources,
 * systems and signal channels come from the delivered repositories.
 * Nothing here is a modelled or inferred business outcome. If you
 * cannot point at where a number came from, it does not go in.
 *
 * ⚠️  ONE ENTRY WAS ADDED AFTER A CORRECTION, and the episode is worth
 * keeping. The job-crawler study was first REJECTED from this file:
 * its scope document recorded the production build and the Render
 * deployment as "not started", so on the evidence available it was a
 * proof of concept being described as a shipped service.
 *
 * That scope document was stale. The engineer who built it confirmed
 * on 19 Aug 2026 that it is live and in client use, and it is included
 * on that basis — with the confirmation recorded in `verifiedSource`
 * rather than assumed.
 *
 * The rule that survives: a claim needs a source, and "the README says
 * so" is not one. Where a repository and a person disagree, the person
 * who shipped it decides — and their confirmation gets written down.
 */

export type CaseStudyMetric = {
  label: string;
  before?: string;
  after: string;
  delta?: string;
};

type CaseStudyBase = {
  slug: string;
  title: string;
  /** Short label for cards and breadcrumbs. */
  shortTitle: string;
  client: string;
  industry: string;
  region: string;
  engagement: string;
  duration: string;
  team: string;
  stack: readonly string[];
  summary: string;
  problem: readonly string[];
  constraint: readonly string[];
  built: readonly { title: string; body: string }[];
  metrics: readonly CaseStudyMetric[];
  outcomeNote?: string;
  retrospective: readonly string[];
};

/**
 * Fabricated. Excluded from anything public.
 * `specimenNotice` exists so the author has to write down, in prose,
 * what is untrue — harder to do carelessly than setting a flag.
 */
export type SpecimenCaseStudy = CaseStudyBase & {
  status: 'specimen';
  specimenNotice: string;
};

/** Confirmed against the delivery record. Evidence fields mandatory. */
export type VerifiedCaseStudy = CaseStudyBase & {
  status: 'verified';
  /** ISO date the detail was confirmed. */
  verifiedOn: string;
  /** What it was confirmed against. */
  verifiedSource: string;
  /** Written permission to name the client, where one is named. */
  namingPermission: 'granted' | 'anonymised';
};

export type CaseStudy = SpecimenCaseStudy | VerifiedCaseStudy;

const VERIFIED_ON = '2026-08-19';
const SOURCE =
  'Engagement record and delivered repository, reviewed against PROOF-EVIDENCE.md on 19 Aug 2026.';

export const caseStudies: readonly CaseStudy[] = [
  {
    status: 'verified',
    verifiedOn: VERIFIED_ON,
    verifiedSource: SOURCE,
    namingPermission: 'anonymised',
    slug: 'events-platform-automation',
    title: 'Six internal systems for an events platform, orchestrated end to end',
    shortTitle: 'Events platform automation',
    client: 'A Dubai-based events and ticketing platform',
    industry: 'Events & Ticketing',
    region: 'Dubai, UAE',
    engagement: 'Ongoing retainer',
    duration: '12 months, ongoing',
    team: '1 engineer, embedded with the client’s internal team',
    stack: ['n8n', 'Python', 'OpenAI', 'Vector search', 'Slack API', 'Google Workspace', 'Docker'],
    summary:
      'A long-running engagement building internal automation across news aggregation, event data synchronisation, a customer support assistant and vector-based catalogue checks — with a dry-run mode on every destructive operation.',
    problem: [
      'The platform ran a growing number of internal processes by hand: aggregating news and social content, reconciling event records between systems, answering repetitive customer questions, and checking whether listings were genuinely exclusive.',
      'Each was individually small and collectively enormous. None justified a dedicated product team, and every one that stayed manual quietly capped how fast the company could add events.',
    ],
    constraint: [
      'These systems write to live catalogue and event data. A bad sync does not fail loudly — it silently corrupts records the commercial team then works from, and nobody notices for days.',
      'So the interesting constraint was not building the automations. It was making them safe to run repeatedly against production data, by someone who was not their author.',
    ],
    built: [
      {
        title: 'Orchestration in n8n',
        body: 'Fourteen workflows covering content aggregation, event synchronisation, batched pushes and scheduled cleanups — so the client’s own team can see and adjust a pipeline without reading code.',
      },
      {
        title: 'A dry run for every destructive operation',
        body: 'Cleanup, delete-sync and vector updates each ship as a matched pair: a dry run that reports exactly what would change, and the operation itself. Nothing that can destroy data runs without a preview first.',
      },
      {
        title: 'Vector-based catalogue checks',
        body: 'Embedding-backed comparison to establish whether a listing is genuinely exclusive, replacing an exact-match check that missed anything phrased differently.',
      },
      {
        title: 'A support assistant on the channel customers actually use',
        body: 'Handles repetitive inbound questions on social, and escalates to a person rather than guessing when confidence is low.',
      },
      {
        title: 'Tested where this class of system fails',
        body: 'Automated tests cover fuzzy matching, normalisation of model output and trigger conditions — the three places this kind of pipeline fails silently rather than loudly.',
      },
    ],
    metrics: [
      { label: 'Internal systems delivered', after: '6' },
      { label: 'Automation workflows in production', after: '14' },
      { label: 'Destructive operations with a dry-run mode', after: '100%' },
      { label: 'Engineering hours delivered', after: '225+' },
      { label: 'Engagement length', before: 'Single workflow', after: '12 months, ongoing' },
    ],
    outcomeNote:
      'The relationship has run continuously for over a year and expanded from one workflow to six internal systems. That expansion is the outcome: the client extended the scope repeatedly rather than replacing it.',
    retrospective: [
      'The dry-run pattern was not in the original scope. It was added after a sync did something unexpected in staging, and it is the single change that made the rest of the work safe to hand over.',
      'It should have been there from the first workflow. On anything that writes to live data we now build the preview before the operation, not after it.',
    ],
  },
  {
    status: 'verified',
    verifiedOn: VERIFIED_ON,
    verifiedSource: SOURCE,
    namingPermission: 'anonymised',
    slug: 'tender-to-vacancy-pipeline',
    title: 'Turning public tender documents into publishable vacancies',
    shortTitle: 'Tender-to-vacancy pipeline',
    client: 'A Netherlands recruitment firm',
    industry: 'Recruitment',
    region: 'Netherlands',
    engagement: 'Project-based',
    duration: 'Delivered',
    team: '1 engineer',
    stack: ['Python', 'Playwright', 'Claude', 'HTML'],
    summary:
      'An automation that signs in to a Dutch public procurement portal, reads a municipal tender and rewrites it as a ready-to-review Dutch vacancy post.',
    problem: [
      'Dutch public-sector staffing opportunities are published as tenders on a procurement portal: long, formal, and structured for compliance rather than for candidates.',
      'Turning one into a vacancy post a person would actually read was manual work, done repeatedly, in a second language, under time pressure — the deadline is the same for every firm that saw the same tender.',
    ],
    constraint: [
      'The output is published in Dutch to candidates, so a fluent-sounding mistranslation is worse than no automation at all.',
      'The portal offers no API and requires an authenticated session, so retrieval had to work through the same interface a person uses.',
    ],
    built: [
      {
        title: 'Authenticated retrieval',
        body: 'A browser session signs in and reaches a specific tender by reference, handling the portal’s own navigation rather than depending on an API that does not exist.',
      },
      {
        title: 'Structured extraction before generation',
        body: 'The tender is reduced to the fields a vacancy actually needs — role, scope, requirements, dates — before any generation happens, so the model rewrites known values instead of interpreting a wall of text.',
      },
      {
        title: 'Generation into candidate-facing Dutch',
        body: 'The extracted content is rewritten as a vacancy post in Dutch, in the register a candidate expects rather than the register a procurement document is written in.',
      },
      {
        title: 'A preview a human signs off',
        body: 'Output is written as a standalone HTML file for review before anything is published. The pipeline stops where a person should be making the decision.',
      },
    ],
    metrics: [
      {
        label: 'Producing a draft',
        before: 'Read, extract, translate, format by hand',
        after: 'One command',
      },
      { label: 'Human review before publication', after: 'Always required' },
      { label: 'Output', after: 'Dutch, candidate-facing register' },
    ],
    outcomeNote:
      'The pipeline deliberately stops at a reviewable draft. Publishing straight to candidates was possible and was not built — the value is in removing the mechanical work, not the judgement.',
    retrospective: [
      'The first version passed the whole tender to the model and asked for a vacancy. It produced fluent output that quietly dropped requirements buried in the middle of the document.',
      'Extracting to a structured shape first, then generating from that, took longer to build and is the reason the output can be trusted.',
    ],
  },
  {
    status: 'verified',
    verifiedOn: VERIFIED_ON,
    verifiedSource: SOURCE,
    namingPermission: 'anonymised',
    slug: 'resilient-price-monitoring',
    title: 'Seven data sources that keep working when they would rather not be read',
    shortTitle: 'Resilient price monitoring',
    client: 'A travel client',
    industry: 'Travel',
    region: 'International',
    engagement: 'Project-based',
    duration: 'Delivered',
    team: '1 engineer',
    stack: ['Python', 'Playwright', 'Amadeus API', 'Google Sheets API', 'Docker'],
    summary:
      'Continuous price monitoring across seven sources — two APIs and five sites that actively resist automated reading — consolidated into one comparable view.',
    problem: [
      'Prices for the same route differ across booking sites and move constantly. Comparing them by hand means checking seven places repeatedly and still missing the window.',
      'Two of the seven offer an API. The other five do not, and are built to discourage exactly this.',
    ],
    constraint: [
      'Anything that hammers a booking site is blocked within hours, and a blocked source is not a degraded feature — it is a silently missing input that makes every comparison wrong.',
      'So the design problem was never extraction. It was running indefinitely without becoming unwelcome.',
    ],
    built: [
      {
        title: 'API first, always',
        body: 'Where an official API exists it is used. Scraping is the fallback for sources that offer nothing, never the default approach.',
      },
      {
        title: 'One source per cycle, on a jittered interval',
        body: 'Sources are rotated rather than polled together, with randomised gaps and automatic backoff when a site pushes back. The system is deliberately slower than it could be.',
      },
      {
        title: 'Interception before parsing',
        body: 'Where a site loads its own data over the network, that response is read directly, with DOM parsing as the fallback — fewer assumptions about markup that changes weekly.',
      },
      {
        title: 'Explicit merge rules',
        body: 'A result with the same booking link and price is skipped; the same link at a new price updates in place. Without this the output becomes thousands of near-duplicate rows within days.',
      },
      {
        title: 'Delivered where the client already works',
        body: 'Results land in Google Sheets — one tab per source plus a combined view of the cheapest across all of them. No new tool for anyone to learn.',
      },
    ],
    metrics: [
      { label: 'Sources monitored', after: '7' },
      { label: 'Sources offering an official API', after: '2 of 7' },
      { label: 'Consolidated view', after: 'Top 30 across all sources' },
      { label: 'Deployment', after: 'Dockerised, runs unattended' },
    ],
    retrospective: [
      'The first version polled every source on a fixed schedule and was blocked by two of them inside a day.',
      'Rotation, jitter and backoff made each cycle slower and are the reason it still runs. On this kind of work the constraint is not how fast you can read a page once.',
    ],
  },
  {
    status: 'verified',
    verifiedOn: VERIFIED_ON,
    verifiedSource: SOURCE,
    namingPermission: 'anonymised',
    slug: 'physiological-monitoring-interface',
    title: 'A real-time physiological monitoring interface in the browser',
    shortTitle: 'Monitoring interface',
    client: 'A medical training client',
    industry: 'Healthcare & Training',
    region: 'International',
    engagement: 'Project-based',
    duration: 'Delivered',
    team: '1 engineer',
    stack: ['Next.js', 'React', 'TypeScript', 'Canvas', 'Zustand', 'Framer Motion'],
    summary:
      'A browser-based instrument interface rendering live breathing, skin-conductance and pulse traces on a rolling buffer, with interactive markers and operator controls.',
    problem: [
      'Physiological monitoring interfaces are normally tied to hardware, which makes them awkward to use for training, demonstration or interface development.',
      'The requirement was an instrument that behaves like the real thing in a browser — continuous, responsive, and convincing to someone who has used the physical equivalent.',
    ],
    constraint: [
      'Three signals redraw continuously against a moving time window. Built as ordinary interface updates this stutters, and a monitoring trace that stutters is immediately wrong to anyone familiar with one.',
      'It has to hold a steady frame rate while staying interactive.',
    ],
    built: [
      {
        title: 'Canvas rendering on a rolling buffer',
        body: 'Three channels drawn to canvas against a continuously moving sixty-second window rather than as interface nodes, so the traces stay smooth as they scroll.',
      },
      {
        title: 'Interactive markers',
        body: 'Column markers can be placed and moved against the live trace — the interaction an operator actually performs on this class of instrument.',
      },
      {
        title: 'Operator signal controls',
        body: 'Hold-to-distort applies live distortion to a running signal, so a scenario can be demonstrated on demand rather than waited for.',
      },
      {
        title: 'Predictable state',
        body: 'Signal generation, buffer and interaction state kept in one store, so what is on screen is always derived from one source rather than several components disagreeing.',
      },
    ],
    metrics: [
      { label: 'Signal channels rendered live', after: '3' },
      { label: 'Rolling time window', after: '60 seconds' },
      { label: 'Hardware required', before: 'Dedicated instrument', after: 'A browser' },
    ],
    retrospective: [
      'The first implementation updated component state on every animation frame — the obvious approach and the wrong one, since it re-rendered the tree sixty times a second.',
      'Moving the signal path onto the canvas directly, keeping the component layer for the interface around it, is what made it hold frame rate.',
    ],
  },
  {
    status: 'verified',
    verifiedOn: VERIFIED_ON,
    verifiedSource:
      'Confirmed live and in client use by the engineer who built and delivered it, 19 Aug 2026. Note: the repository scope document was out of date and understated delivery.',
    namingPermission: 'anonymised',
    slug: 'multi-source-job-api',
    title: 'One schema for job listings that live on platforms without APIs',
    shortTitle: 'Multi-source job API',
    client: 'An Austrian digital agency',
    industry: 'Recruitment Technology',
    region: 'Austria',
    engagement: 'Project-based',
    duration: 'Delivered, in production use',
    team: '1 engineer',
    stack: ['Python', 'FastAPI', 'Playwright', 'JSON Schema', 'Render'],
    summary:
      'A crawler that pulls public job listings from recruitment platforms with no API, normalises every source to one identical schema, and serves them from an authenticated endpoint on a schedule.',
    problem: [
      'The listings the client needed were published on recruitment platforms built for candidates to browse, not for systems to read. No REST API, no export, no feed.',
      'Each platform structures its listings differently, so consuming two of them meant writing and maintaining two integrations — and a third platform would mean a third.',
    ],
    constraint: [
      'One platform runs on software that holds an authenticated session and paginates over POST requests with CSRF protection. It cannot be read by requesting a URL.',
      'The output feeds another system, so the schema mattered more than the extraction: a consumer should integrate once and never care how many sources sit behind it.',
    ],
    built: [
      {
        title: 'One schema, many sources',
        body: 'Every source returns the identical job record regardless of where it came from. Adding a platform is a new source module, not a new integration for whoever consumes the data.',
      },
      {
        title: 'Session, CSRF and POST pagination handled',
        body: 'The primary platform is read the way a signed-in person reads it — session established, tokens carried, pages walked — because there is no other route in.',
      },
      {
        title: 'An authenticated endpoint',
        body: 'Results are served over HTTP behind an API key, with the source selectable per request, so the consumer asks for what it needs rather than receiving a dump.',
      },
      {
        title: 'Scheduled, not on demand',
        body: 'Listings refresh on a schedule rather than on every request, so the platforms see a predictable, modest pattern of traffic and the consumer gets an instant response.',
      },
    ],
    metrics: [
      { label: 'Sources behind one schema', after: '2, extensible' },
      { label: 'Integrations required by the consumer', before: 'One per platform', after: '1' },
      { label: 'Listings from the primary source', after: '100+' },
      { label: 'Access', after: 'API key required' },
    ],
    outcomeNote:
      'Crawling was agreed with the platform owner rather than assumed. The listings are public and the client had permission — worth stating, because the alternative is a capability that cannot be discussed openly.',
    retrospective: [
      'The first version modelled each source close to its own structure, which was faster to write and pushed the difference onto whoever consumed it.',
      'Normalising to one schema at the source boundary was the right call and should have been the starting point.',
    ],
  },
];

/**
 * Anything the public site may render.
 *
 * ⛔ Do not widen this to include specimens.
 */
export const publishedCaseStudies: readonly VerifiedCaseStudy[] = caseStudies.filter(
  (study): study is VerifiedCaseStudy => study.status === 'verified',
);

export const specimenCaseStudies: readonly SpecimenCaseStudy[] = caseStudies.filter(
  (study): study is SpecimenCaseStudy => study.status === 'specimen',
);

export { specimensVisible } from './specimen';
import { specimensVisible } from './specimen';

export const visibleCaseStudies: readonly CaseStudy[] = specimensVisible
  ? caseStudies
  : publishedCaseStudies;

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return visibleCaseStudies.find((study) => study.slug === slug);
}

export function isSpecimen(study: CaseStudy): study is SpecimenCaseStudy {
  return study.status === 'specimen';
}
