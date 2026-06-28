/**
 * Standalone localStorage helpers for static browser-based tools.
 *
 * Copy this module into a site's src/lib/ folder to safely persist small
 * values and bind form fields without adding dependencies.
 */

type PersistentField = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function canUseLocalStorage(): boolean {
  try {
    return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
  } catch {
    return false;
  }
}

export function getItem(key: string, fallback = ""): string {
  if (!canUseLocalStorage()) {
    return fallback;
  }

  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function setItem(key: string, value: string): boolean {
  if (!canUseLocalStorage()) {
    return false;
  }

  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function removeItem(key: string): boolean {
  if (!canUseLocalStorage()) {
    return false;
  }

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function bindPersistentField(field: PersistentField, key: string): () => void {
  const savedValue = getItem(key);

  if (savedValue) {
    field.value = savedValue;
  }

  const handleInput = () => {
    setItem(key, field.value);
  };

  field.addEventListener("input", handleInput);

  return () => {
    field.removeEventListener("input", handleInput);
  };
}
