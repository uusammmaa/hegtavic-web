import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { contrastRatio, grounds, palette, parseHex, relativeLuminance, WCAG } from './contrast';

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
    ['color-ink-faint', palette.inkFaint],
    ['color-ink-inverse', palette.inkInverse],
    ['color-ink-inverse-muted', palette.inkInverseMuted],
    ['color-ink-inverse-faint', palette.inkInverseFaint],
  ];

  it.each(mirrored)('--%s matches the mirrored palette value', (name, expected) => {
    expect(token(name).toLowerCase()).toBe(expected.toLowerCase());
  });
});

describe('EVERY ink on EVERY ground meets WCAG 2.2 AA', () => {
  // ⚠️  This replaced a hand-written list of pairings on 18 Aug 2026.
  // That list could only verify what someone remembered to add, and
  // the `faint` inks were never added — they shipped at 2.85–3.99:1
  // and failed AA on all 13 pages. Walking the matrix means a new
  // ink or ground cannot be introduced without a verdict.
  const matrix = Object.entries(grounds).flatMap(([groundName, ground]) =>
    Object.entries(ground.inks).map(
      ([inkName, ink]) => [groundName, inkName, ink, ground.background] as const,
    ),
  );

  it('covers every ground declared in tokens.css', () => {
    const declared = [...TOKENS_CSS.matchAll(/\[data-ground='([a-z]+)'\]/g)].map((m) => m[1]);
    expect(new Set(declared)).toEqual(new Set(Object.keys(grounds)));
  });

  it.each(matrix)('%s ground: --%s is readable', (_ground, _ink, ink, background) => {
    expect(contrastRatio(ink, background)).toBeGreaterThanOrEqual(WCAG.AA_NORMAL);
  });

  // The ground blocks in CSS must actually resolve to what the matrix
  // claims, or the matrix is asserting a fiction.
  it.each(Object.entries(grounds))('%s ground declares every ink in the matrix', (_name, ground) => {
    const at = TOKENS_CSS.indexOf(ground.token);
    expect(at, `${ground.token} not found in tokens.css`).toBeGreaterThan(-1);
    const body = TOKENS_CSS.slice(at, TOKENS_CSS.indexOf('}', at));
    for (const inkName of Object.keys(ground.inks)) {
      expect(body).toContain(`--${inkName}:`);
    }
  });
});

describe('the focus indicator meets SC 1.4.11 on every ground', () => {
  // Regression guard. The focus ring hard-coded --color-brand-green
  // until 18 Aug 2026, which is 2.33:1 on white — the indicator was
  // invisible-by-standard on every light section. It now uses
  // --ground-accent-ink, which is ground-aware.
  const TYPOGRAPHY_CSS = readFileSync(join(process.cwd(), 'styles/typography.css'), 'utf8');

  it('does not hard-code a brand colour', () => {
    const rule = /:focus-visible\s*\{([^}]*)\}/.exec(TYPOGRAPHY_CSS);
    expect(rule?.[1]).toContain('--ground-accent-ink');
    expect(rule?.[1]).not.toContain('--color-brand-green');
  });

  it.each(Object.entries(grounds))('%s ground: accent ink clears 3:1', (_name, ground) => {
    expect(contrastRatio(ground.inks['ground-accent-ink'], ground.background)).toBeGreaterThanOrEqual(
      WCAG.AA_NON_TEXT,
    );
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

  it('brand green does NOT clear the non-text threshold on white either', () => {
    // ⚠️  Corrected 18 Aug 2026. This test was named as though brand
    // green passed 3:1 on white and commented "it stays valid as a
    // border, focus ring or graphical object" — while asserting the
    // opposite. At 2.33:1 it is valid for NEITHER text nor non-text
    // on a light ground. The false comment is what allowed the focus
    // ring to ship using it. On light grounds use --ground-accent-ink.
    expect(contrastRatio(palette.brandGreen, palette.surface)).toBeLessThan(WCAG.AA_NON_TEXT);
  });

  it('brand green clears the non-text threshold on graphite', () => {
    expect(contrastRatio(palette.brandGreen, palette.graphite)).toBeGreaterThanOrEqual(
      WCAG.AA_NON_TEXT,
    );
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
