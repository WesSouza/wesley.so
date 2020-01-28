declare module '*.act';
declare module '*.mp3';
declare module '*.woff';

interface Navigator {
  share: (data: { text?: string; title?: string; url?: string }) => void;
}
