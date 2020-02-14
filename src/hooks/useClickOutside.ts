import { useCallback, useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>({
  onClickOutside,
}: {
  onClickOutside: () => void;
}) {
  const elementRef = useRef<T>(null);

  const handleClick = useCallback(
    (event: PointerEvent) => {
      if (
        !elementRef.current ||
        elementRef.current.contains(event.target as Node)
      ) {
        return;
      }

      onClickOutside();
    },
    [onClickOutside],
  );

  const handleAddListeners = useCallback(() => {
    document.addEventListener('pointerdown', handleClick);
  }, [handleClick]);

  const handleRemoveListeners = useCallback(() => {
    document.removeEventListener('pointerdown', handleClick);
  }, [handleClick]);

  useEffect(() => {
    handleAddListeners();
    return () => {
      handleRemoveListeners();
    };
  }, [handleAddListeners, handleRemoveListeners]);

  return { elementRef, handleAddListeners };
}
