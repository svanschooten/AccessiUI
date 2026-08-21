/**
 * Dice rolling — plan section 15.6.
 *
 * The goal is not a virtual tabletop engine. It is dependable, readable,
 * accessible rolling. Every roll produces text as its canonical output; any
 * visual presentation is decoration on top of that (section 26.2).
 */

export interface RollResult {
  /** The raw die face, before modifiers. */
  natural: number;
  modifier: number;
  total: number;
  sides: number;
  /** Canonical human-readable output. Never derived from styling. */
  text: string;
  /** Critical states are named, not implied by colour (section 26.3). */
  critical: 'hit' | 'miss' | null;
}

export type RollFn = (sides: number) => number;

/** Default randomness source. Injectable so tests are deterministic. */
export const randomRoll: RollFn = (sides) => Math.floor(Math.random() * sides) + 1;

function formatModifier(modifier: number): string {
  return modifier >= 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`;
}

export function roll(
  label: string,
  sides: number,
  modifier: number,
  source: RollFn = randomRoll,
): RollResult {
  const natural = source(sides);
  const total = natural + modifier;

  // Critical hits and misses apply to d20 rolls only.
  const critical = sides === 20 ? (natural === 20 ? 'hit' : natural === 1 ? 'miss' : null) : null;

  const criticalSuffix =
    critical === 'hit' ? ' — Critical hit!' : critical === 'miss' ? ' — Critical miss' : '';

  return {
    natural,
    modifier,
    total,
    sides,
    critical,
    text: `${label}: d${sides} ${natural} ${formatModifier(modifier)} = ${total}${criticalSuffix}`,
  };
}
