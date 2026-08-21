// @vitest-environment node

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { contrastRatio, requiredRatio, NON_TEXT_MINIMUM } from '../src/utils/contrast';
import { parseTokens } from '../src/utils/parseTokens';

const themeCss = readFileSync(
  fileURLToPath(new URL('../src/theme/theme.css', import.meta.url)),
  'utf8',
);
const tokens = parseTokens(themeCss);

const token = (name: string): string => {
  const value = tokens.get(name);
  if (!value) throw new Error(`Token ${name} is missing from theme.css`);
  return value;
};

/**
 * Tier 1 assertion (plan section 22.1).
 *
 * Contrast is a property of (foreground, background, size, weight), so each
 * pairing declares the smallest size and lightest weight it may be drawn at.
 * Adding a colour token without adding it here fails the completeness test at
 * the bottom of this file.
 */
const TEXT_PAIRINGS = [
  { fg: '--a11y-color-text', bg: '--a11y-color-surface', px: 16, weight: 400 },
  { fg: '--a11y-color-text', bg: '--a11y-color-surface-sunken', px: 16, weight: 400 },
  { fg: '--a11y-color-text-muted', bg: '--a11y-color-surface', px: 16, weight: 400 },
  { fg: '--a11y-color-text-muted', bg: '--a11y-color-surface-sunken', px: 16, weight: 400 },
  { fg: '--a11y-color-control-text', bg: '--a11y-color-control-surface', px: 16, weight: 400 },
  { fg: '--a11y-color-primary-text', bg: '--a11y-color-primary', px: 16, weight: 400 },
  { fg: '--a11y-color-selected-text', bg: '--a11y-color-selected', px: 16, weight: 400 },
  { fg: '--a11y-color-success', bg: '--a11y-color-surface', px: 16, weight: 400 },
  { fg: '--a11y-color-warning', bg: '--a11y-color-surface', px: 16, weight: 400 },
  { fg: '--a11y-color-error', bg: '--a11y-color-surface', px: 16, weight: 400 },
] as const;

const NON_TEXT_PAIRINGS = [
  { fg: '--a11y-color-border', bg: '--a11y-color-surface' },
  { fg: '--a11y-color-border', bg: '--a11y-color-surface-sunken' },
  { fg: '--a11y-focus-color', bg: '--a11y-color-surface' },
  { fg: '--a11y-focus-color', bg: '--a11y-color-surface-sunken' },
] as const;

describe('token contrast (WCAG 2.2 AA)', () => {
  it.each(TEXT_PAIRINGS)(
    'text $fg on $bg at $px px / $weight meets its required ratio',
    ({ fg, bg, px, weight }) => {
      const ratio = contrastRatio(token(fg), token(bg));
      const required = requiredRatio(px, weight);
      expect(
        ratio,
        `${fg} (${token(fg)}) on ${bg} (${token(bg)}) is ${ratio.toFixed(2)}:1, needs ${required}:1`,
      ).toBeGreaterThanOrEqual(required);
    },
  );

  it.each(NON_TEXT_PAIRINGS)('non-text $fg on $bg meets 3:1 (SC 1.4.11)', ({ fg, bg }) => {
    const ratio = contrastRatio(token(fg), token(bg));
    expect(
      ratio,
      `${fg} (${token(fg)}) on ${bg} (${token(bg)}) is ${ratio.toFixed(2)}:1, needs 3:1`,
    ).toBeGreaterThanOrEqual(NON_TEXT_MINIMUM);
  });

  it('every colour token appears in at least one validated pairing', () => {
    const validated = new Set<string>();
    for (const p of TEXT_PAIRINGS) {
      validated.add(p.fg);
      validated.add(p.bg);
    }
    for (const p of NON_TEXT_PAIRINGS) {
      validated.add(p.fg);
      validated.add(p.bg);
    }
    const colourTokens = [...tokens.keys()].filter(
      (name) => name.includes('color') || name.endsWith('-color'),
    );
    const unvalidated = colourTokens.filter((name) => !validated.has(name));
    expect(
      unvalidated,
      `these colour tokens are not covered by any contrast pairing: ${unvalidated.join(', ')}`,
    ).toEqual([]);
  });
});

describe('interaction tokens', () => {
  it('target size clears the WCAG 2.2 SC 2.5.8 floor of 24px', () => {
    const target = parseInt(token('--a11y-target-size'), 10);
    expect(target).toBeGreaterThanOrEqual(24);
  });

  it('target size meets the phone-first design target of 44px', () => {
    const target = parseInt(token('--a11y-target-size'), 10);
    expect(target).toBeGreaterThanOrEqual(44);
  });

  it('focus indicator is at least 2px (SC 2.4.13)', () => {
    const width = parseInt(token('--a11y-focus-width'), 10);
    expect(width).toBeGreaterThanOrEqual(2);
  });
});
