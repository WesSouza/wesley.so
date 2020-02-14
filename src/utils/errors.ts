export function panic(error: Error) {
  console.error(error);
  globalThis.onerror?.(String(error));
}
