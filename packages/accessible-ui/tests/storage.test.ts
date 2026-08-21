import { beforeEach, describe, expect, it } from 'vitest';
import { createLocalStorageBackend } from '../src/storage/localStorageBackend';
import { usePersistentRef } from '../src/composables/usePersistentRef';

describe('localStorage backend', () => {
  beforeEach(() => window.localStorage.clear());

  it('reports availability', () => {
    expect(createLocalStorageBackend().isAvailable()).toBe(true);
  });

  it('round-trips a value', () => {
    const backend = createLocalStorageBackend();
    backend.write('character', { name: 'Vex', hp: 34 });
    expect(backend.read('character')).toEqual({ name: 'Vex', hp: 34 });
  });

  it('namespaces keys so a shared origin stays tidy', () => {
    createLocalStorageBackend('test-ns').write('hp', 34);
    expect(window.localStorage.getItem('test-ns:hp')).toBe('34');
  });

  it('returns null for a key that was never written', () => {
    expect(createLocalStorageBackend().read('absent')).toBeNull();
  });

  it('treats corrupt data as absent rather than throwing', () => {
    window.localStorage.setItem('accessible-dnd:broken', '{not json');
    expect(createLocalStorageBackend().read('broken')).toBeNull();
  });

  it('reports a failed write rather than losing it silently', () => {
    const backend = createLocalStorageBackend();
    const circular: Record<string, unknown> = {};
    circular.self = circular;
    expect(backend.write('circular', circular)).toBe(false);
  });
});

describe('usePersistentRef', () => {
  beforeEach(() => window.localStorage.clear());

  it("does not mutate the caller's default object", () => {
    const backend = createLocalStorageBackend();
    const defaults = { hp: 34 };
    const { value } = usePersistentRef('character', defaults, backend);
    value.value.hp = 12;
    expect(defaults.hp, 'the shared default was mutated').toBe(34);
  });

  it('reads a stored value back in preference to the default', () => {
    const backend = createLocalStorageBackend();
    backend.write('character', { hp: 12 });
    const { value } = usePersistentRef('character', { hp: 34 }, backend);
    expect(value.value.hp).toBe(12);
  });
});
