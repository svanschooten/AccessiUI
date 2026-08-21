// @vitest-environment node

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parseTokens } from '../src/utils/parseTokens';

const themePath = fileURLToPath(new URL('../src/theme/theme.css', import.meta.url));
const themeCss = readFileSync(themePath, 'utf8');

describe('theme token contract', () => {
  /**
   * Regression guard. A plain `@theme` block tree-shakes variables Tailwind
   * does not see used in utility classes, and it never scans `var()` calls in
   * scoped component styles. That silently dropped --a11y-target-size from a
   * production build once already: controls kept their `min-height:
   * var(--a11y-target-size)` rule, the variable resolved to nothing, and every
   * target shrank below the WCAG floor while the source looked correct.
   *
   * Profiles re-declare these variables at runtime, so all of them must ship
   * unconditionally.
   */
  it('declares tokens with `@theme static` so none are tree-shaken', () => {
    expect(themeCss).toMatch(/@theme\s+static\s*\{/);
  });

  it('defines every token a component references', () => {
    const tokens = parseTokens(themeCss);
    const referenced = new Set(
      [...themeCss.matchAll(/var\((--a11y-[a-z0-9-]+)/gi)].map((m) => m[1] as string),
    );
    const undefinedRefs = [...referenced].filter((name) => !tokens.has(name));
    expect(undefinedRefs, `referenced but never declared: ${undefinedRefs.join(', ')}`).toEqual([]);
  });

  it('keeps the accessibility-critical tokens present', () => {
    const tokens = parseTokens(themeCss);
    for (const required of [
      '--a11y-target-size',
      '--a11y-font-scale',
      '--a11y-spacing-scale',
      '--a11y-focus-width',
      '--a11y-color-text',
      '--a11y-color-surface',
    ]) {
      expect(tokens.has(required), `${required} is missing from theme.css`).toBe(true);
    }
  });
});

describe('parseTokens', () => {
  it('reads only the @theme block, not the media-query overrides', () => {
    const tokens = parseTokens(themeCss);
    // theme.css redefines this as `CanvasText` under forced-colors. If the
    // parser leaked that in, contrast maths would silently compare against a
    // keyword instead of the real palette.
    expect(tokens.get('--a11y-color-text')).toMatch(/^#/);
  });

  it('refuses to guess when there is no @theme block', () => {
    expect(() => parseTokens(':root { --a11y-color-text: #000; }')).toThrow(/No @theme block/);
  });
});
