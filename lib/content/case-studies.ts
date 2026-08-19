/**
 * Case studies.
 *
 * ═══════════════════════════════════════════════════════════════
 *  ⛔  THE SPECIMEN GATE — read before adding anything here
 * ═══════════════════════════════════════════════════════════════
 *
 * The client's own brief says: "Do not invent metrics, outcomes or
 * client claims. Use measurable results only where they can be
 * verified." Every case study currently in this file is FABRICATED
 * placeholder material written to prove the template. None of it is
 * true. None of it may be published.
 *
 * That instruction is enforced by the type system rather than by
 * discipline. `CaseStudy` is a discriminated union: a study is either
 *
 *   • { status: 'specimen',  … } — requires `specimenNotice`, and is
 *     excluded from `publishedCaseStudies` by construction; or
 *   • { status: 'verified', … } — requires `verifiedOn` and
 *     `verifiedSource`, i.e. someone recorded WHO confirmed the
 *     numbers and WHEN.
 *
 * There is no third state and no default. A new case study cannot be
 * added without the author choosing one, and choosing 'verified'
 * cannot be done casually because the evidence fields are required.
 *
 * This replaced a CMS field in the original plan (PLAN.md R7). A
 * database field is checked at runtime; this is checked by `tsc`, so
 * an unverified study cannot reach a production build at all.
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
 * what is untrue — which is harder to do carelessly than setting a flag.
 */
export type SpecimenCaseStudy = CaseStudyBase & {
  status: 'specimen';
  specimenNotice: string;
};

/** Confirmed with the client. Evidence fields are mandatory. */
export type VerifiedCaseStudy = CaseStudyBase & {
  status: 'verified';
  /** ISO date the figures were confirmed. */
  verifiedOn: string;
  /** Who confirmed them, and against what. */
  verifiedSource: string;
  /** Written permission to name the client, where the client is named. */
  namingPermission: 'granted' | 'anonymised';
};

export type CaseStudy = SpecimenCaseStudy | VerifiedCaseStudy;

const SPECIMEN_NOTICE =
  'Fabricated placeholder. The client, the figures and the quotation are invented to demonstrate the template. Replace with verified material before launch.';

export const caseStudies: readonly CaseStudy[] = [
  {
    status: 'specimen',
    specimenNotice: SPECIMEN_NOTICE,
    slug: 'claims-triage-automation',
    title: 'Cutting claims triage from days to minutes',
    shortTitle: 'Claims triage automation',
    client: 'A mid-market property insurance carrier',
    industry: 'Insurance',
    region: 'Midwest, USA',
    engagement: 'Fixed scope, then ongoing retainer',
    duration: '14 weeks, ongoing since',
    team: '3 — one ML engineer, two full-stack',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Claude API', 'React', 'AWS', 'Textract'],
    summary:
      'A triage service that reads unstructured claim packets and produces a routing recommendation in which every assertion is cited back to its source document.',
    problem: [
      'First-notice-of-loss claims arrived as unstructured attachments — adjuster emails, call transcripts, PDF reports and policyholder photographs. Every one was read by a human before it could be routed, and routing decided severity, adjuster assignment and whether an inspection was needed.',
      'Two people did this full time. Median time from arrival to routing was 31 hours, rising past three days after storm events — precisely when speed mattered most to the policyholder and to the loss ratio.',
      'An existing vendor had quoted a rules engine requiring every claim category to be enumerated in advance. The carrier had tried that before; the rules became unmaintainable within a year.',
    ],
    constraint: [
      'Insurance claim routing cannot be a black box. Every automated decision had to be explainable to a regulator and reversible by a human, with compliance holding veto over the design.',
      'That ruled out a fine-tuned classifier emitting a bare label. They needed the reasoning, cited against the source documents.',
    ],
    built: [
      {
        title: 'Ingestion',
        body: 'Documents normalised through Textract, photographs captioned, call transcripts segmented by speaker — reduced to one timestamped document with stable per-span identifiers.',
      },
      {
        title: 'Retrieval',
        body: "Underwriting guidelines, policy wordings and historical routing decisions indexed in pgvector, so recommendations are grounded in this carrier's practice rather than general knowledge.",
      },
      {
        title: 'Recommendation',
        body: 'A severity band, recommended adjuster specialisation, inspection flag and written rationale — in which every factual assertion carries a span identifier pointing back to source. The interface renders these as inline citations.',
      },
      {
        title: 'Human control',
        body: 'Nothing routes automatically above a configurable severity threshold. Every override is recorded with the reviewer’s reason, and those overrides feed the evaluation set.',
      },
      {
        title: 'Evaluation',
        body: 'A held-out set of historically routed claims, re-scored on every deployment. A regression in agreement rate blocks the release.',
      },
    ],
    metrics: [
      { label: 'Median time to route', before: '31 hours', after: '19 minutes', delta: '↓ 97%' },
      { label: 'Agreement with senior adjuster', after: '91.4%' },
      { label: 'Claims routed without human edit', before: '0%', after: '68%' },
      { label: 'Post-storm backlog peak', before: '3+ days', after: 'under 4 hours' },
    ],
    outcomeNote:
      'Neither triage role was made redundant. Both moved to complex-claim review — the work the carrier had been unable to staff.',
    retrospective: [
      'The first version summarised each document before retrieval. It was faster and materially worse: summarisation discarded exactly the incidental detail — a mentioned outbuilding, an offhand date — that drove severity.',
      'We removed the summarisation step and retrieved against full text. Latency rose by about 900ms per claim. Against 31 hours, nobody noticed.',
    ],
  },
  {
    status: 'specimen',
    specimenNotice: SPECIMEN_NOTICE,
    slug: 'field-services-dedicated-team',
    title: 'A four-year dedicated team behind a field-services platform',
    shortTitle: 'Field-services platform',
    client: 'A field-services software company',
    industry: 'B2B SaaS',
    region: 'Queensland, Australia',
    engagement: 'Dedicated team',
    duration: '4 years, ongoing',
    team: '4 — two backend, one frontend, one QA',
    stack: ['TypeScript', 'Node.js', 'React', 'PostgreSQL', 'Redis', 'AWS', 'Terraform'],
    summary:
      'A dedicated squad operating as part of the client’s own engineering organisation, owning scheduling, offline sync and the mobile field application.',
    problem: [
      'The company had product-market fit and a roadmap it could not staff. Local hiring for senior backend engineers ran nine months, and two contract agencies had delivered work that the in-house team ended up rewriting.',
      'The failure mode was consistent: contractors delivered features that worked in isolation and did not survive contact with the scheduling engine.',
    ],
    constraint: [
      'This could not be an outsourced module. The work sat in the most load-bearing part of the product, so the team had to operate inside the client’s process — their standups, their review standards, their on-call.',
      'Continuity mattered more than flexibility. A rotating bench would have reproduced the problem they were trying to solve.',
    ],
    built: [
      {
        title: 'Scheduling engine',
        body: 'Constraint-based assignment of jobs to technicians across skills, travel time and parts availability, replacing a first-available heuristic.',
      },
      {
        title: 'Offline-first mobile sync',
        body: 'Conflict resolution for technicians working without signal for hours — the source of most historical support load.',
      },
      {
        title: 'Shared ownership',
        body: 'The squad carried the same on-call rotation as the in-house team. Named engineers, not interchangeable capacity.',
      },
    ],
    metrics: [
      { label: 'Continuity of the same engineers', after: '4 years' },
      { label: 'Sync-related support tickets', before: 'baseline', after: '−74%' },
      { label: 'Median job assignment time', before: '2.4s', after: '180ms' },
    ],
    retrospective: [
      'We under-invested in the QA role for the first year, treating it as a nice-to-have. Offline sync is exactly the kind of problem that cannot be verified by the person who wrote it.',
      'Adding a dedicated QA engineer changed the defect profile more than any architectural decision we made.',
    ],
  },
  {
    status: 'specimen',
    specimenNotice: SPECIMEN_NOTICE,
    slug: 'nightly-batch-replacement',
    title: 'Replacing a nightly batch that had stopped finishing overnight',
    shortTitle: 'Data pipeline rebuild',
    client: 'A logistics and distribution group',
    industry: 'Logistics',
    region: 'Ontario, Canada',
    engagement: 'Fixed scope',
    duration: '11 weeks',
    team: '2 — one data engineer, one backend',
    stack: ['Python', 'dbt', 'Airflow', 'PostgreSQL', 'S3', 'Terraform'],
    summary:
      'An incremental pipeline replacing a monolithic nightly job that had grown past its window, with lineage and data tests as first-class outputs.',
    problem: [
      'A single nightly batch built every operational report. It had grown from four hours to fourteen and no longer finished before the working day, so the operations team started each morning against stale numbers.',
      'Nobody could say what any figure depended on. The job was one procedure that had been extended for nine years.',
    ],
    constraint: [
      'Reports could not change. Finance had reconciled against these numbers for years, and any rebuild had to produce identical output before it could produce faster output.',
    ],
    built: [
      {
        title: 'Parallel running',
        body: 'The new pipeline ran alongside the old one for six weeks, with automated row-level comparison. Nothing was cut over until outputs matched exactly.',
      },
      {
        title: 'Incremental models',
        body: 'dbt models rebuilt only what changed, with lineage visible per column rather than per job.',
      },
      {
        title: 'Tests as contracts',
        body: 'Freshness, uniqueness and referential tests run per model. A failure stops the downstream build rather than publishing a wrong number.',
      },
    ],
    metrics: [
      { label: 'Pipeline runtime', before: '14 hours', after: '38 minutes' },
      { label: 'Reports available by', before: '11:00 or later', after: '05:20' },
      { label: 'Discrepancies at cutover', after: '0' },
    ],
    retrospective: [
      'We spent three weeks on the comparison harness before writing any pipeline code, which felt slow and was the reason the cutover was uneventful.',
      'The harness outlived the project — it is still how they validate schema changes.',
    ],
  },
  {
    status: 'specimen',
    specimenNotice: SPECIMEN_NOTICE,
    slug: 'staff-augmentation-rescue',
    title: 'Two engineers into a team that had stopped shipping',
    shortTitle: 'Staff augmentation',
    client: 'A healthcare scheduling product',
    industry: 'Healthcare',
    region: 'California, USA',
    engagement: 'Staff augmentation',
    duration: '9 months',
    team: '2 senior full-stack',
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Playwright'],
    summary:
      'Two senior engineers embedded into an existing team whose release cadence had collapsed under accumulated test debt.',
    problem: [
      'The team had not shipped in five months. Every release candidate failed in staging for a different reason, and the test suite was slow and unreliable enough that engineers had learned to ignore it.',
      'Management read this as a capacity problem and asked for more engineers. It was not a capacity problem.',
    ],
    constraint: [
      'We said so before starting, which risked the engagement. Adding two people to a team that could not verify its own work would have produced more unverifiable work.',
    ],
    built: [
      {
        title: 'Quarantine, then repair',
        body: 'Flaky tests were quarantined and tracked rather than deleted, so the suite became trustworthy immediately and honest about its own gaps.',
      },
      {
        title: 'A release that could not be argued with',
        body: 'One end-to-end path — book, amend, cancel — covered in Playwright and run on every commit.',
      },
      {
        title: 'Handover by default',
        body: 'Every fix was paired with an in-house engineer. The objective was that the team could do this without us.',
      },
    ],
    metrics: [
      { label: 'Time since last release', before: '5 months', after: '11 days' },
      { label: 'Test suite runtime', before: '48 min', after: '9 min' },
      { label: 'Release cadence at exit', after: 'weekly' },
    ],
    outcomeNote:
      'The engagement ended on schedule and was not renewed, which was the correct outcome and the one we had proposed.',
    retrospective: [
      'We should have insisted on a written problem statement before the first sprint. We diagnosed correctly but informally, and spent the first month re-litigating it with stakeholders who had not been in the room.',
    ],
  },
];

/**
 * Anything the public site may render.
 *
 * ⛔ Do not widen this to include specimens. `CONTENT-SPECIMEN.md` and
 * PLAN.md §6.2 both make an unverified case study a launch blocker.
 */
export const publishedCaseStudies: readonly VerifiedCaseStudy[] = caseStudies.filter(
  (study): study is VerifiedCaseStudy => study.status === 'verified',
);

export const specimenCaseStudies: readonly SpecimenCaseStudy[] = caseStudies.filter(
  (study): study is SpecimenCaseStudy => study.status === 'specimen',
);

/**
 * Specimens render only when explicitly switched on, so the template
 * can be shown to the client without the material being reachable in
 * production. Vercel sets VERCEL_ENV=production for the production
 * deployment; previews and local development are not production.
 */
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
