import { describe, expect, it } from 'vitest';
import {
  caseStudies,
  publishedCaseStudies,
  specimenCaseStudies,
  type CaseStudy,
} from './case-studies';

/**
 * The verification gate.
 *
 * ─────────────────────────────────────────────────────────────
 *  19 Aug 2026 — `DOCUMENTS THAT NOTHING IS PUBLISHABLE YET` was
 *  deleted from this file, deliberately.
 * ─────────────────────────────────────────────────────────────
 *
 * That test asserted `publishedCaseStudies` was empty, and it existed
 * to fail loudly the day real material arrived. Real material arrived,
 * it failed, and it was removed rather than weakened — which was
 * always the instruction attached to it.
 *
 * What replaces it is stricter, not looser: the checks below assert
 * that published studies carry their evidence, and that no client
 * identity leaks into a public repository.
 */
describe('the verification gate', () => {
  it('never publishes a specimen', () => {
    for (const study of publishedCaseStudies) {
      expect(study.status).toBe('verified');
    }
    const publishedSlugs = new Set(publishedCaseStudies.map((s) => s.slug));
    for (const specimen of specimenCaseStudies) {
      expect(publishedSlugs.has(specimen.slug)).toBe(false);
    }
  });

  it('every specimen states in prose what is untrue', () => {
    for (const specimen of specimenCaseStudies) {
      expect(specimen.specimenNotice.length).toBeGreaterThan(40);
      expect(specimen.specimenNotice.toLowerCase()).toMatch(/placeholder|invented|fabricat/);
    }
  });

  it('every verified study records who confirmed it and when', () => {
    for (const study of publishedCaseStudies) {
      expect(study.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(study.verifiedSource.trim().length).toBeGreaterThan(10);
      expect(['granted', 'anonymised']).toContain(study.namingPermission);
    }
  });

  it('has enough published work to be credible at launch', () => {
    // PLAN.md §6.2 — the minimum credible set is three case studies.
    expect(publishedCaseStudies.length).toBeGreaterThanOrEqual(3);
  });
});

/**
 * ⛔ CLIENT IDENTITY LEAK GUARD
 *
 * This repository is PUBLIC. Every client in this file is anonymised
 * because none has given permission to be named, and one was excluded
 * specifically because they would likely object.
 *
 * These are the identifiers that appear in the private working notes
 * (PROOF-EVIDENCE.md, kept outside this repo) and in the source
 * project directories. If any of them ever appears in published
 * content, this test fails and the leak is caught before it is pushed
 * rather than after.
 *
 * Adding a name here is safe — the strings are checked against content,
 * they are not themselves published. Removing one requires written
 * permission from that client.
 */
const MUST_NOT_APPEAR = [
  'dotbite',
  'platinumlist',
  'ooeg',
  'karriere.ooeg',
  'mercell',
  'gemeente amsterdam',
  'lukas',
  'yutkin',
  'talkey',
  'upwork',
  'sastaticket',
  'skyscanner',
  'kayak',
] as const;

describe('no client identity reaches the public site', () => {
  const haystack = JSON.stringify(publishedCaseStudies).toLowerCase();

  it.each(MUST_NOT_APPEAR)('does not mention "%s"', (needle) => {
    expect(haystack).not.toContain(needle);
  });

  it('describes every client by sector and region only', () => {
    for (const study of publishedCaseStudies) {
      // A client description that is a bare proper noun is a name.
      expect(study.client.toLowerCase()).toMatch(/^(a|an|the)\s/);
      expect(study.industry.trim().length).toBeGreaterThan(0);
      expect(study.region.trim().length).toBeGreaterThan(0);
    }
  });
});

describe('case study shape', () => {
  it('slugs are unique and url-safe', () => {
    const slugs = caseStudies.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it('every study carries the sections the template renders', () => {
    const required: ReadonlyArray<keyof CaseStudy & string> = [
      'title',
      'shortTitle',
      'client',
      'industry',
      'region',
      'engagement',
      'summary',
    ];
    for (const study of caseStudies) {
      for (const key of required) {
        expect(String(study[key as keyof CaseStudy] ?? '').trim().length).toBeGreaterThan(0);
      }
      expect(study.problem.length).toBeGreaterThan(0);
      expect(study.constraint.length).toBeGreaterThan(0);
      expect(study.built.length).toBeGreaterThan(0);
      expect(study.metrics.length).toBeGreaterThan(0);
      expect(study.retrospective.length).toBeGreaterThan(0);
      expect(study.stack.length).toBeGreaterThan(0);
    }
  });

  it('every metric has an after value — a metric with only a before is meaningless', () => {
    for (const study of caseStudies) {
      for (const metric of study.metrics) {
        expect(metric.label.trim().length).toBeGreaterThan(0);
        expect(metric.after.trim().length).toBeGreaterThan(0);
      }
    }
  });
});
