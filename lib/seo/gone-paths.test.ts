import { describe, expect, it } from 'vitest';
import gonePaths from './gone-paths.json';

/**
 * The 410 list is hashed because this repository is public and the
 * paths are the artefacts of a site compromise — see middleware.ts.
 *
 * That opacity has a cost: nobody reviewing a change can eyeball the
 * list for a mistake. These tests are what replaces reading it.
 */
describe('the gone-path list', () => {
  const paths = gonePaths as string[];

  it('matches the captured inventory size', () => {
    // 108 injected URLs were captured on 11 Aug 2026. If this number
    // changes, the inventory changed — confirm that was intended.
    expect(paths).toHaveLength(108);
  });

  it('contains only truncated SHA-256 digests', () => {
    for (const entry of paths) {
      expect(entry).toMatch(/^[0-9a-f]{32}$/);
    }
  });

  it('has no duplicates and no truncation collisions', () => {
    expect(new Set(paths).size).toBe(paths.length);
  });

  it('never contains a readable path — the whole point of hashing', () => {
    for (const entry of paths) {
      expect(entry).not.toContain('/');
      expect(entry).not.toMatch(/[g-z]/);
    }
  });

  it('is sorted, so a diff shows a real change rather than reordering', () => {
    expect([...paths].sort()).toEqual(paths);
  });
});
