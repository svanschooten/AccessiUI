import type { StorageBackend } from './types';

/** The default backend. Everything is namespaced so a shared origin stays tidy. */
export function createLocalStorageBackend(namespace = 'accessible-dnd'): StorageBackend {
  const scoped = (key: string): string => `${namespace}:${key}`;

  return {
    name: 'localStorage',

    isAvailable(): boolean {
      try {
        const probe = `${namespace}:__probe__`;
        window.localStorage.setItem(probe, '1');
        window.localStorage.removeItem(probe);
        return true;
      } catch {
        // Private browsing and disabled-storage modes throw rather than
        // returning false, so absence has to be detected by trying.
        return false;
      }
    },

    read<T>(key: string): T | null {
      try {
        const raw = window.localStorage.getItem(scoped(key));
        return raw === null ? null : (JSON.parse(raw) as T);
      } catch {
        // Corrupt or unparseable data is treated as absent rather than fatal.
        return null;
      }
    },

    write<T>(key: string, value: T): boolean {
      try {
        window.localStorage.setItem(scoped(key), JSON.stringify(value));
        return true;
      } catch {
        // Quota exceeded, or storage disabled. The caller decides what to do;
        // silently losing the write is not acceptable, so report it.
        return false;
      }
    },

    remove(key: string): void {
      try {
        window.localStorage.removeItem(scoped(key));
      } catch {
        /* nothing useful to do */
      }
    },
  };
}

/**
 * Ask the browser to make storage persistent, reducing eviction risk.
 * Best-effort: unsupported browsers simply resolve false.
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (!('storage' in navigator) || !navigator.storage?.persist) return false;
  try {
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}
