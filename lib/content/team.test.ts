import { describe, expect, it } from 'vitest';
import { publishedTeam, specimenTeam, teamMembers } from './team';

/**
 * The team gate.
 *
 * "Name real people with real roles, or name no one." A team section
 * of invented people is the exact claim a buyer verifies on LinkedIn,
 * so an unconfirmed person must never reach production.
 */
describe('the team gate', () => {
  it('never publishes an unconfirmed person', () => {
    for (const member of publishedTeam) expect(member.status).toBe('verified');
    const published = new Set(publishedTeam.map((m) => m.id));
    for (const specimen of specimenTeam) expect(published.has(specimen.id)).toBe(false);
  });

  it('every verified person recorded when they confirmed their own bio', () => {
    for (const member of publishedTeam) {
      expect(member.confirmedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  // ⛔ Expected to fail the day real, confirmed people are added.
  // Delete it deliberately then — do not weaken it.
  it('DOCUMENTS THAT NO PERSON IS PUBLISHABLE YET', () => {
    expect(publishedTeam).toHaveLength(0);
    expect(specimenTeam.length).toBeGreaterThan(0);
  });

  it('ids are unique and monograms are short', () => {
    const ids = teamMembers.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const member of teamMembers) {
      expect(member.monogram.length).toBeGreaterThan(0);
      expect(member.monogram.length).toBeLessThanOrEqual(3);
      expect(member.role.trim().length).toBeGreaterThan(0);
      expect(member.bio.trim().length).toBeGreaterThan(20);
    }
  });
});
