import { ref, watch, type Ref } from 'vue';
import type { StorageBackend } from '../storage/types';

/**
 * A ref that reads through to a storage backend on creation and writes back on
 * change. Write failures are surfaced rather than swallowed, because a silent
 * failure here means the user loses data they believe is saved.
 */
export function usePersistentRef<T>(
  key: string,
  initial: T,
  backend: StorageBackend,
): { value: Ref<T>; failed: Ref<boolean> } {
  const stored = backend.isAvailable() ? backend.read<T>(key) : null;

  // Clone the fallback. `initial` is typically a module-level constant such as
  // a default character; storing the reference directly would let the first
  // edit mutate that shared default for every later caller.
  const value = ref(stored ?? structuredClone(initial)) as Ref<T>;
  const failed = ref(false);

  watch(
    value,
    (next) => {
      failed.value = !backend.write(key, next);
    },
    { deep: true },
  );

  return { value, failed };
}
