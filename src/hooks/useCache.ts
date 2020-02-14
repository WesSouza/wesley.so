import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = new Map<string, any>();
const referenceCount = new Map<string, number>();

export function useCached<T>(key: string, initialValue?: T) {
  useEffect(() => {
    const count = referenceCount.get(key) || 0;
    referenceCount.set(key, count + 1);

    return () => {
      const count = referenceCount.get(key) || 0;
      referenceCount.set(key, count - 1);
      if (count <= 0) {
        cached.delete(key);
      }
    };
  }, [key]);

  if (initialValue !== undefined) {
    cached.set(key, initialValue);
  }

  return {
    get(): T {
      return cached.get(key);
    },
    set(value: T) {
      cached.set(key, value);
    },
  };
}
