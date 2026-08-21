/**
 * WCAG 2.x contrast ratio.
 *
 * This is the practical baseline for the tier 1 CI assertions described in
 * section 22.1 of the project plan. APCA is tracked in the research backlog;
 * WCAG 3 is not stable enough to build on.
 *
 * Note that contrast is a property of a *triple* — foreground, background, and
 * the size/weight of the text drawn in it — not of a colour pair. See
 * `requiredRatio` below and section 10.3 of the plan.
 */

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

/** Parse `#rgb` or `#rrggbb`. Returns null for anything else, including
 * system colour keywords such as `Canvas`, which have no fixed value. */
export function parseHex(value: string): Rgb | null {
  const hex = value.trim().replace(/^#/, '');
  if (hex.length === 3) {
    const [r, g, b] = [hex[0], hex[1], hex[2]];
    if (!r || !g || !b) return null;
    return parseHex(`#${r}${r}${g}${g}${b}${b}`);
  }
  if (hex.length !== 6 || !/^[0-9a-f]{6}$/i.test(hex)) return null;
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}

/** WCAG relative luminance. */
export function relativeLuminance({ r, g, b }: Rgb): number {
  const channel = (raw: number): number => {
    const c = raw / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Contrast ratio between two colours, from 1 to 21. */
export function contrastRatio(foreground: string, background: string): number {
  const fg = parseHex(foreground);
  const bg = parseHex(background);
  if (!fg || !bg) {
    throw new Error(`Cannot compute contrast for non-hex colour: ${foreground} on ${background}`);
  }
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const [lighter, darker] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * The ratio WCAG 2.2 AA requires for a given text size and weight.
 *
 * "Large text" is 18.66px bold or 24px regular; everything else is body text.
 * Sizes are in CSS pixels at the user's current scale.
 */
export function requiredRatio(fontSizePx: number, fontWeight: number): number {
  const isLarge = fontWeight >= 700 ? fontSizePx >= 18.66 : fontSizePx >= 24;
  return isLarge ? 3 : 4.5;
}

/** Non-text contrast (SC 1.4.11) — borders, focus rings, control boundaries. */
export const NON_TEXT_MINIMUM = 3;
