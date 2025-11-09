/**
 * Safe storage utility that falls back to in-memory storage
 * when localStorage is blocked (e.g., in sandboxed iframes)
 */
export const getSafeStorage = (): Storage => {
  try {
    const s = window.localStorage;
    const testKey = '__storage_test__';
    s.setItem(testKey, '1');
    s.removeItem(testKey);
    return s;
  } catch {
    // In-memory storage fallback for sandboxed environments
    const mem = new Map<string, string>();
    return {
      getItem: (k: string) => (mem.has(k) ? mem.get(k)! : null),
      setItem: (k: string, v: string) => { mem.set(k, v); },
      removeItem: (k: string) => { mem.delete(k); },
      clear: () => { mem.clear(); },
      key: (i: number) => Array.from(mem.keys())[i] ?? null,
      get length() { return mem.size; }
    } as Storage;
  }
};
