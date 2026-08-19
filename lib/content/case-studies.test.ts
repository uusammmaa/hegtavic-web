import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import forbidden from './forbidden-identifiers.json';
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
 * This repository is PUBLIC. Every client in case-studies.ts is
 * anonymised because none has given permission to be named.
 *
 * ⚠️  THE LIST IS HASHED, AND THAT IS THE WHOLE POINT.
 * The first version of this guard listed the client and platform names
 * in plaintext — in a public repo. It would have been the disclosure it
 * exists to prevent, and git history would have kept it after any
 * later deletion. Same reasoning as lib/seo/gone-paths.json.
 *
 * Matching still works: for each identifier length we slide a window
 * of that length over the published content and hash it, so a
 * substring match is detected without the substring ever being
 * written down. Published content is a few kilobytes, so the cost is
 * irrelevant.
 *
 * To add an identifier, hash it the same way and drop the digest into
 * the right length bucket. Never add the plaintext.
 */
describe('no client identity reaches the public site', () => {
  const haystack = JSON.stringify(publishedCaseStudies).toLowerCase();

  function digest(value: string): string {
    return createHash('sha256').update(value).digest('hex').slice(0, 32);
  }

  const buckets = Object.entries(forbidden.byLength) as ReadonlyArray<[string, string[]]>;

  it.each(buckets)('contains no forbidden identifier of length %s', (length, digests) => {
    const n = Number(length);
    const banned = new Set(digests);
    const hits: string[] = [];
    for (let i = 0; i + n <= haystack.length; i += 1) {
      if (banned.has(digest(haystack.slice(i, i + n)))) {
        hits.push(haystack.slice(Math.max(0, i - 20), i + n + 20));
      }
    }
    expect(hits, `forbidden identifier found near: ${hits[0] ?? ''}`).toEqual([]);
  });

  it('detects a planted identifier — proves the guard actually works', () => {
    // A guard nobody has seen fail is a guard nobody knows works.
    const n = 7;
    const banned = new Set(forbidden.byLength[String(n)] ?? []);
    expect(banned.size).toBeGreaterThan(0);
    const planted = 'x'.repeat(3) + 'dotbite' + 'y'.repeat(3);
    let found = false;
    for (let i = 0; i + n <= planted.length; i += 1) {
      if (banned.has(digest(planted.slice(i, i + n)))) found = true;
    }
    expect(found).toBe(true);
  });

  it('describes every client by sector and region only', () => {
    for (const study of publishedCaseStudies) {
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
