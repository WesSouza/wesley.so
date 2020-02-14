import { useCallback, useRef, useState } from 'react';

import { ObjectPosition } from '~/src/constants/CommonTypes';
import { getPointerCoords } from '~/src/utils/dom';
import { rafDebounce } from '~/src/utils/rafDebounce';

export function useDrag({
  onDragEnd,
  onDragMove,
  onDragStart,
}: {
  onDragEnd?: (coords: ObjectPosition) => void;
  onDragMove?: (coords: ObjectPosition) => void;
  onDragStart?: () => void;
} = {}) {
  const pointerCoordsRef = useRef<ObjectPosition>({ x: 0, y: 0 });
  const [pointerCoords, setPointerCoords] = useState<ObjectPosition | null>(
    null,
  );
  const dragging = useRef(false);

  const handleMove = useCallback(
    rafDebounce((event: PointerEvent) => {
      if (!dragging.current) {
        return;
      }

      const coords = getPointerCoords(event);
      if (coords) {
        setPointerCoords(coords);
        pointerCoordsRef.current = coords;
      }
      onDragMove?.(pointerCoordsRef.current);
    }),
    [],
  );

  const handleEnd = useCallback(() => {
    dragging.current = false;

    document.documentElement.style.userSelect = '';
    document.documentElement.style.webkitUserSelect = '';
    document.removeEventListener('pointermove', handleMove);
    document.removeEventListener('pointerup', handleEnd);

    onDragEnd?.(pointerCoordsRef.current);
  }, [handleMove, onDragEnd]);

  const handleStart = useCallback(() => {
    dragging.current = true;

    document.documentElement.style.userSelect = 'none';
    document.documentElement.style.webkitUserSelect = 'none';
    document.addEventListener('pointermove', handleMove);
    document.addEventListener('pointerup', handleEnd);
    setPointerCoords(null);

    onDragStart?.();
  }, [handleMove, handleEnd, onDragStart]);

  return {
    pointerCoords,
    handleDragStart: handleStart,
  };
}
