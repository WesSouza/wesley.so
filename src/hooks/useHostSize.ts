import { useCallback, useEffect, useState } from 'react';

import { rafDebounce } from '~/src/utils/rafDebounce';

export function useHostSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(
    rafDebounce(() => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }),
    [],
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return size;
}
