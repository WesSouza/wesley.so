import { RefObject } from 'react';

export function getBoundingClientRect<T extends HTMLElement>(
  elementOrRef: RefObject<T> | T,
) {
  const element =
    'current' in elementOrRef ? elementOrRef.current : elementOrRef;
  if (!(element instanceof HTMLElement)) {
    throw new Error(`Element is not an instance of HTMLElement`);
  }

  const rect = element.getBoundingClientRect();
  return {
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
  };
}

export function getOffsetRect<T extends HTMLElement>(
  elementOrRef: RefObject<T> | T,
) {
  const element =
    'current' in elementOrRef ? elementOrRef.current : elementOrRef;
  if (!(element instanceof HTMLElement)) {
    throw new Error(`Element is not an instance of HTMLElement`);
  }

  const rect = element.getBoundingClientRect();
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: rect.width,
    height: rect.height,
  };
}

export function getPointerCoords<T>(
  event: PointerEvent | React.PointerEvent<T>,
) {
  if ('pageX' in event && 'pageY' in event) {
    return { x: event.pageX, y: event.pageY };
  }

  throw new Error(`Unable to locate pointer coordinates`);
}
