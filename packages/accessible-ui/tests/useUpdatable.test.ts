import { ref } from 'vue';
import { describe, expect, it } from 'vitest';
import { useUpdatable } from '../src/composables/useUpdatable';

const hpDescribe = (from: number, to: number): string => {
  const delta = to - from;
  return `${delta >= 0 ? '+' : ''}${delta} -> ${to} HP`;
};

describe('useUpdatable (plan section 8.7)', () => {
  it('records a human-readable description of the change', () => {
    const hp = ref(34);
    const { set, lastChange } = useUpdatable(hp, { describe: hpDescribe });
    set(29);
    expect(hp.value).toBe(29);
    expect(lastChange.value?.label).toBe('-5 -> 29 HP');
  });

  it('offers no undo before anything has changed', () => {
    const { canUndo } = useUpdatable(ref(34), { describe: hpDescribe });
    expect(canUndo.value).toBe(false);
  });

  it('restores the previous value on undo', () => {
    const hp = ref(34);
    const { set, undo, canUndo } = useUpdatable(hp, { describe: hpDescribe });
    set(29);
    expect(canUndo.value).toBe(true);
    undo();
    expect(hp.value).toBe(34);
    expect(canUndo.value).toBe(false);
  });

  it('steps back through several mistaps', () => {
    const hp = ref(40);
    const { set, undo } = useUpdatable(hp, { describe: hpDescribe });
    set(35);
    set(30);
    set(25);
    undo();
    expect(hp.value).toBe(30);
    undo();
    expect(hp.value).toBe(35);
  });

  it('ignores a set that changes nothing, so undo is never a no-op', () => {
    const hp = ref(34);
    const { set, canUndo } = useUpdatable(hp, { describe: hpDescribe });
    set(34);
    expect(canUndo.value).toBe(false);
  });

  it('bounds the history so it cannot grow without limit', () => {
    const hp = ref(100);
    const { set, history } = useUpdatable(hp, { describe: hpDescribe, historyLimit: 3 });
    for (let i = 99; i >= 90; i--) set(i);
    expect(history.value).toHaveLength(3);
  });
});
