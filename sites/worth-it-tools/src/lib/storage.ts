/**
 * Tiny, dependency-free localStorage helper. Safe to import in client scripts.
 * All access is guarded so SSR / disabled-storage environments never throw.
 */

const PREFIX = 'sts:'; // seo-tool-site namespace

function available(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
}

export function getItem<T>(key: string, fallback: T): T {
  if (!available()) return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (!available()) return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* quota exceeded or disabled — fail silently */
  }
}

export function removeItem(key: string): void {
  if (!available()) return;
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    /* ignore */
  }
}

/** Persist an input/textarea's value across reloads under `key`. */
export function bindPersistentField(el: HTMLInputElement | HTMLTextAreaElement, key: string): void {
  const saved = getItem<string | null>(key, null);
  if (saved !== null) el.value = saved;
  el.addEventListener('input', () => setItem(key, el.value));
}
