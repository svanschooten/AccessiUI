import { computed, ref, type Ref } from 'vue';

/**
 * The updatable-element contract — plan section 8.7.
 *
 * Any component that mutates a value the user cares about owes them two
 * things: a textual description of what changed, rendered next to the control
 * that changed it (section 8.8), and a route back.
 *
 * Undo is not a refinement to add later. Large adjacent targets operated
 * one-handed under time pressure will be mistapped; that is the expected case,
 * which is why it is part of the contract rather than a feature.
 */

export interface Change<T> {
  from: T;
  to: T;
  /** Human-readable, e.g. "-5 -> 29 HP". Used for display and announcement. */
  label: string;
  at: number;
}

export interface UpdatableOptions<T> {
  /** Produce the text shown to the user and read by assistive technology. */
  describe: (from: T, to: T) => string;
  /** How many changes can be stepped back through. */
  historyLimit?: number;
}

export function useUpdatable<T>(source: Ref<T>, options: UpdatableOptions<T>) {
  const { describe, historyLimit = 10 } = options;
  const history = ref<Change<T>[]>([]) as Ref<Change<T>[]>;

  const lastChange = computed<Change<T> | null>(() => history.value.at(-1) ?? null);
  const canUndo = computed(() => history.value.length > 0);

  /** Apply a change, recording it so it can be described and undone. */
  function set(next: T): void {
    const from = source.value;
    if (Object.is(from, next)) return;

    history.value.push({ from, to: next, label: describe(from, next), at: Date.now() });
    if (history.value.length > historyLimit) history.value.shift();
    source.value = next;
  }

  /** Step back one change. Undo does not itself become an undoable change. */
  function undo(): void {
    const change = history.value.pop();
    if (change) source.value = change.from;
  }

  /** Forget the history without touching the value — e.g. after a fresh load. */
  function clearHistory(): void {
    history.value = [];
  }

  return { lastChange, canUndo, set, undo, clearHistory, history };
}
