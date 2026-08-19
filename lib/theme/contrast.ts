/**
 * WCAG 2.2 relative luminance and contrast ratio.
 *
 * Exists so the brand palette's contrast behaviour is a tested
 * property of the codebase rather than a note in a design file.
 * See styles/tokens.css and contrast.test.ts.
 *
 * Reference: https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
 */

export type Rgb = { r: number; g: number; b: number };

/** Parse `#rgb` or `#rrggbb` into 0–255 channels. */
export function parseHex(hex: string): Rgb {
  const clean = hex.trim().replace(/^#/, '');

  const expanded =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    throw new Error(`Invalid hex colour: "${hex}"`);
  }

  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16),
  };
}

/** Linearise a single 0–255 channel per the WCAG transfer function. */
function linearise(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/** Relative luminance, 0 (black) to 1 (white). */
export function relativeLuminance(colour: string | Rgb): number {
  const { r, g, b } = typeof colour === 'string' ? parseHex(colour) : colour;
  return 0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b);
}

/** Contrast ratio between two colours, 1:1 to 21:1. */
export function contrastRatio(a: string | Rgb, b: string | Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

/** WCAG 2.2 minimum contrast thresholds. */
export const WCAG = {
  /** Body text, AA. */
  AA_NORMAL: 4.5,
  /** ≥18.66px bold or ≥24px regular, AA. */
  AA_LARGE: 3,
  /** UI components and graphical objects, AA. */
  AA_NON_TEXT: 3,
  /** Body text, AAA. */
  AAA_NORMAL: 7,
} as const;

export function meetsAA(a: string, b: string, large = false): boolean {
  return contrastRatio(a, b) >= (large ? WCAG.AA_LARGE : WCAG.AA_NORMAL);
}

/**
 * The palette, mirrored from styles/tokens.css.
 *
 * Kept in sync by contrast.test.ts, which reads the stylesheet and
 * fails if a value here has drifted from the token it represents.
 */
export const palette = {
  brandGreen: '#6CBD4D',
  graphite: '#16181A',
  greenInk: '#3F7529',
  greenBright: '#7FD15E',
  surface: '#FFFFFF',
  surfaceSunken: '#F4F6F5',
  ink: '#14181A',
  inkMuted: '#5A6469',
  inkFaint: '#646A6E',
  inkInverse: '#F7F9F8',
  inkInverseMuted: '#A8B2B5',
  inkInverseFaint: '#7F8A8F',
} as const;

/**
 * The grounds a section can declare, and every ink that resolves on
 * each one.
 *
 * ⚠️  This exists because of a real defect. The contrast test used to
 * assert a hand-written list of pairings, so any pairing nobody
 * thought to list was silently unverified. The `faint` inks were
 * described as "decorative only", left out of that list, then used
 * for stack chips, step numbers and footer headings — and shipped at
 * 2.85–3.99:1, failing WCAG AA on all 13 pages.
 *
 * The test now walks this structure exhaustively. Adding a ground or
 * an ink without a passing ratio fails CI, which is the property the
 * old hand-written list did not have.
 *
 * Every ink listed here is used for TEXT and must clear AA_NORMAL.
 * Purely decorative values belong in the line tokens, not here.
 */
export const grounds = {
  light: {
    token: "[data-ground='light']",
    background: palette.surface,
    inks: {
      'ground-ink': palette.ink,
      'ground-ink-muted': palette.inkMuted,
      'ground-ink-faint': palette.inkFaint,
      'ground-accent-ink': palette.greenInk,
    },
  },
  sunken: {
    token: "[data-ground='sunken']",
    background: palette.surfaceSunken,
    inks: {
      'ground-ink': palette.ink,
      'ground-ink-muted': palette.inkMuted,
      'ground-ink-faint': palette.inkFaint,
      'ground-accent-ink': palette.greenInk,
    },
  },
  dark: {
    token: "[data-ground='dark']",
    background: palette.graphite,
    inks: {
      'ground-ink': palette.inkInverse,
      'ground-ink-muted': palette.inkInverseMuted,
      'ground-ink-faint': palette.inkInverseFaint,
      'ground-accent-ink': palette.brandGreen,
    },
  },
} as const;
