/**
 * Storage abstraction — plan section 17.1.
 *
 * Local-first storage is evictable, and losing a calibrated profile is worse
 * here than in an ordinary application: the user must redo calibration in an
 * app they can no longer read comfortably.
 *
 * The interface exists now so the backend choice stays open. Only
 * `localStorage` is implemented — building five backends before anything needs
 * them would be the mistake section 43 warns about.
 */
export interface StorageBackend {
  readonly name: string;
  /** Whether this backend can be used in the current environment. */
  isAvailable(): boolean;
  read<T>(key: string): T | null;
  write<T>(key: string, value: T): boolean;
  remove(key: string): void;
}
