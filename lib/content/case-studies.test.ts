import { describe, expect, it } from 'vitest';
import {
  caseStudies,
  publishedCaseStudies,
  specimenCaseStudies,
  type CaseStudy,
} from './case-studies';

/**
 * The specimen gate.
 *
 * The client's brief says: "Do not invent metrics, outcomes or client
 * claims." Every case study in the repo today is fabricated. These
 * tests are what stop that material reaching production — they are a
 * launch blocker by construction, per PLAN.md §6.2.
 */
describe('the specimen gate', () => {
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
      // ISO date, not a vague string.
      expect(study.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(study.verifiedSource.trim().length).toBeGreaterThan(10);
      expect(['granted', 'anonymised']).toContain(study.namingPermission);
    }
  });

  // ⛔ The launch blocker. While this is true, the site cannot launch
  // with case studies. It is expected to fail the day real material
  // arrives — at which point delete it deliberately, do not weaken it.
  it('DOCUMENTS THAT NOTHING IS PUBLISHABLE YET', () => {
    expect(publishedCaseStudies).toHaveLength(0);
    expect(specimenCaseStudies.length).toBeGreaterThan(0);
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
