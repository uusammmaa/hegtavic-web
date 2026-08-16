import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { contrastRatio, palette, parseHex, relativeLuminance, WCAG } from './contrast';

const TOKENS_CSS = readFileSync(join(process.cwd(), 'styles/tokens.css'), 'utf8');

/** Read a custom property's value out of tokens.css. */
function token(name: string): string {
  const match = new RegExp(`--${name}:\\s*([^;]+);`).exec(TOKENS_CSS);
  if (!match?.[1]) throw new Error(`Token --${name} not found in tokens.css`);
  return match[1].trim();
}

describe('contrast maths', () => {
  it('matches the WCAG reference values at the extremes', () => {
    expect(relativeLuminance('#000000')).toBe(0);
    expect(relativeLuminance('#FFFFFF')).toBe(1);
    expect(contrastRatio('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBeCloseTo(1, 5);
  });

  it('is symmetric', () => {
    expect(contrastRatio(palette.brandGreen, palette.surface)).toBeCloseTo(
      contrastRatio(palette.surface, palette.brandGreen),
      10,
    );
  });

  it('expands three-digit hex and rejects malformed input', () => {
    expect(parseHex('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(() => parseHex('#12345')).toThrow();
    expect(() => parseHex('not-a-colour')).toThrow();
  });
});

describe('tokens.css is the source of truth', () => {
  // If a brand value is edited in CSS, this fails before any visual
  // assertion does — the mirrored palette cannot silently drift.
  const mirrored: ReadonlyArray<[string, string]> = [
    ['color-brand-green', palette.brandGreen],
    ['color-graphite', palette.graphite],
    ['color-green-ink', palette.greenInk],
    ['color-green-bright', palette.greenBright],
    ['color-surface', palette.surface],
    ['color-ink', palette.ink],
    ['color-ink-muted', palette.inkMuted],
    ['color-ink-inverse', palette.inkInverse],
    ['color-ink-inverse-muted', palette.inkInverseMuted],
  ];

  it.each(mirrored)('--%s matches the mirrored palette value', (name, expected) => {
    expect(token(name).toLowerCase()).toBe(expected.toLowerCase());
  });
});

describe('permitted pairings meet WCAG 2.2 AA', () => {
  const permitted: ReadonlyArray<[string, string, string, number]> = [
    ['brand green on graphite', palette.brandGreen, palette.graphite, WCAG.AAA_NORMAL],
    // The LET'S TALK button: graphite text on a brand-green fill.
    ['graphite text on brand green', palette.graphite, palette.brandGreen, WCAG.AAA_NORMAL],
    ['green-ink on white', palette.greenInk, palette.surface, WCAG.AA_NORMAL],
    ['green-ink on sunken surface', palette.greenInk, palette.surfaceSunken, WCAG.AA_NORMAL],
    ['ink on white', palette.ink, palette.surface, WCAG.AAA_NORMAL],
    ['muted ink on white', palette.inkMuted, palette.surface, WCAG.AA_NORMAL],
    ['inverse ink on graphite', palette.inkInverse, palette.graphite, WCAG.AAA_NORMAL],
    ['muted inverse ink on graphite', palette.inkInverseMuted, palette.graphite, WCAG.AA_NORMAL],
  ];

  it.each(permitted)('%s clears %s', (_label, fg, bg, threshold) => {
    expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(threshold);
  });
});

describe('forbidden pairings — documented so they cannot be reintroduced', () => {
  // These assertions look inverted on purpose. They encode WHY the
  // design is dark-grounded: if a future palette change made brand
  // green safe as text on white, this test fails and the rule in
  // tokens.css should be revisited deliberately, not silently.

  it('brand green is NOT usable as text on white', () => {
    const ratio = contrastRatio(palette.brandGreen, palette.surface);
    expect(ratio).toBeLessThan(WCAG.AA_NORMAL);
    expect(ratio).toBeCloseTo(2.33, 1);
  });

  it('white is NOT usable as text on brand green', () => {
    expect(contrastRatio(palette.surface, palette.brandGreen)).toBeLessThan(WCAG.AA_NORMAL);
  });

  it('brand green still clears the non-text threshold on white', () => {
    // It stays valid as a border, focus ring or graphical object —
    // which is exactly how the components use it on light grounds.
    expect(contrastRatio(palette.brandGreen, palette.surface)).toBeLessThan(WCAG.AA_NON_TEXT);
  });
});

describe('documented ratios in tokens.css are accurate', () => {
  // The comment block at the top of tokens.css quotes four ratios.
  // A designer reading them must be able to trust them.
  it('brand green on graphite is 7.65:1', () => {
    expect(contrastRatio(palette.brandGreen, palette.graphite)).toBeCloseTo(7.65, 1);
  });

  it('green-ink on white is 5.54:1', () => {
    expect(contrastRatio(palette.greenInk, palette.surface)).toBeCloseTo(5.54, 1);
  });

  it('ink on white is 17.87:1', () => {
    expect(contrastRatio(palette.ink, palette.surface)).toBeCloseTo(17.87, 1);
  });

  it('inverse ink on graphite is 16.84:1', () => {
    expect(contrastRatio(palette.inkInverse, palette.graphite)).toBeCloseTo(16.84, 1);
  });
});
