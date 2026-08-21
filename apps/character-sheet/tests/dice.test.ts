import { describe, expect, it } from 'vitest';
import { roll } from '../src/dnd/dice';

const fixed = (value: number) => () => value;

describe('dice (plan section 15.6)', () => {
  it('produces a readable text result as its canonical output', () => {
    expect(roll('Perception check', 20, 5, fixed(14)).text).toBe(
      'Perception check: d20 14 + 5 = 19',
    );
  });

  it('formats a negative modifier without a double sign', () => {
    expect(roll('Stealth check', 20, -1, fixed(10)).text).toBe('Stealth check: d20 10 - 1 = 9');
  });

  it('names a critical hit in text, not by colour alone', () => {
    const result = roll('Attack', 20, 3, fixed(20));
    expect(result.critical).toBe('hit');
    expect(result.text).toContain('Critical hit!');
  });

  it('names a critical miss in text', () => {
    const result = roll('Attack', 20, 3, fixed(1));
    expect(result.critical).toBe('miss');
    expect(result.text).toContain('Critical miss');
  });

  it('applies criticals only to d20 rolls', () => {
    expect(roll('Damage', 6, 0, fixed(6)).critical).toBeNull();
    expect(roll('Damage', 6, 0, fixed(1)).critical).toBeNull();
  });

  it('reports the natural roll separately from the total', () => {
    const result = roll('Perception check', 20, 5, fixed(14));
    expect(result.natural).toBe(14);
    expect(result.total).toBe(19);
  });

  it('stays within the die range across many rolls', () => {
    for (let i = 0; i < 500; i++) {
      const { natural } = roll('Check', 20, 0);
      expect(natural).toBeGreaterThanOrEqual(1);
      expect(natural).toBeLessThanOrEqual(20);
    }
  });
});
