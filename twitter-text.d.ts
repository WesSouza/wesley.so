declare module 'twitter-text' {
  export function modifyIndicesFromUnicodeToUTF16(
    text: string,
    entitiesWithIndices: { indices: [number, number] }[],
  ): void;
}
