import { useCallback, useEffect, useRef } from 'react';

export function useAudio({ src }: { src: string }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const audioUrl = useRef<string | null>(null);

  useEffect(() => {
    fetch(src)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        audioUrl.current = URL.createObjectURL(
          new Blob([buffer], { type: 'audio/mp3' }),
        );

        audio.current = new Audio(audioUrl.current);
      })
      .catch(console.error);

    return () => {
      if (audioUrl.current) {
        URL.revokeObjectURL(audioUrl.current);
      }
    };
  }, [src]);

  const play = useCallback(() => {
    audio.current?.play();
  }, []);

  return {
    play,
  };
}
