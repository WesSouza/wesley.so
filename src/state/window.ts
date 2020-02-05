// import uuid from 'uuid/v1';

import { Apps } from '~/src/constants/Apps';
import {
  Nullable,
  ObjectPosition,
  ObjectRect,
  ObjectSize,
} from '~/src/constants/CommonTypes';
import { Icons } from '~/src/constants/Icons';
import { AnimationDurations, Scale } from '~/src/constants/Styles';
import { delay } from '~/src/utils/async';
import { panic } from '~/src/utils/errors';
import { StateManager } from '~/src/utils/StateManager';
import { WesURL } from '~/src/utils/WesURL';

let i = 1;
function uuid() {
  return String(i++);
}

const NewWindowPositionOffsetSmall: ObjectPosition = {
  x: Scale * 8,
  y: Scale * 8,
};

const NewWindowPositionOffsetLarge: ObjectPosition = {
  x: Scale * 23,
  y: Scale * 23,
};

const SmallScreenMinWidth = 768;

// # Types

export interface Window {
  app: Apps;
  currentSize: Nullable<ObjectSize>;
  file: string | null;
  flags: {
    initialized: boolean;
    maximized: boolean;
    minimized: boolean;
  };
  id: string;
  options: WindowOptions;
  position: Nullable<ObjectPosition>;
  zIndex: number;
}

export interface WindowAnimationData {
  destinationRect: ObjectRect;
  icon?: Icons;
  originRect: ObjectRect;
  title?: string;
}

export interface WindowOptions {
  icon?: Icons;
  initialSize?: ObjectSize;
  initialPosition?: ObjectPosition;
  maximumSize?: Nullable<ObjectSize>;
  minimizable?: boolean;
  minimumSize?: Nullable<ObjectSize>;
  resizable?: boolean;
  title?: string;
}

// # Store

export interface WindowState {
  activeRects: Record<'restoredTitle' | 'trayButton', ObjectRect>;
  all: Map<string, Window>;
  allByZIndex: Map<number, Window>;
  desktopFocused: boolean;
  desktopSize: ObjectSize;
  lastPosition: ObjectPosition;
  lastZIndex: number;
  smallScreen: boolean;
  windowAnimation: WindowAnimationData | null;
}

export const initialWindowState: WindowState = {
  activeRects: {
    restoredTitle: { x: 0, y: 0, width: 0, height: 0 },
    trayButton: { x: 0, y: 0, width: 0, height: 0 },
  },
  all: new Map<string, Window>(),
  allByZIndex: new Map<number, Window>(),
  desktopFocused: true,
  desktopSize: { width: 0, height: 0 },
  lastPosition: { x: 0, y: 0 },
  lastZIndex: 0,
  smallScreen: false,
  windowAnimation: null,
};

export const windowStore = new StateManager(initialWindowState);

// # Actions

export function windowClose(id: string) {
  const { all } = windowStore.state;
  const window = all.get(id);
  if (!window) {
    throw new Error(`Window ${id} does not exist`);
  }

  windowStore.mutate((state) => {
    const window = getWindowFromState(state, id);
    const currentZIndex = window.zIndex;
    const { lastZIndex } = state;
    state.all.delete(id);
    state.allByZIndex.delete(currentZIndex);

    if (currentZIndex !== lastZIndex) {
      return;
    }

    state.lastZIndex = windowGetPenultimateZIndexNonMinimizedId(state);
  });
}

export function windowConfigure(id: string, options: WindowOptions) {
  windowStore.mutate((state) => {
    const window = getWindowFromState(state, id);

    window.options = {
      ...window.options,
      ...options,
    };
  });
}

export function windowFocus(id: string | null) {
  if (id === null) {
    windowStore.mutate((state) => {
      state.desktopFocused = true;
    });
    return;
  }

  const window = getWindowFromState(windowStore.state, id);
  if (!window) {
    // If you click the close button on the unfocused window, it closes before
    // focusing, so it disappears. It's ok.
    return;
  }

  windowStore.mutate((state) => {
    const window = getWindowFromState(state, id);
    const currentZIndex = window.zIndex;
    const nextZIndex = state.lastZIndex + 1;

    window.zIndex = nextZIndex;
    state.allByZIndex.delete(currentZIndex);
    state.allByZIndex.set(nextZIndex, window);
    state.lastZIndex = nextZIndex;

    state.desktopFocused = false;
  });
}

export async function windowMaximizeRestore(id: string) {
  const { activeRects, desktopSize } = windowStore.state;
  const window = getWindowFromState(windowStore.state, id);
  if (
    !window.options.resizable ||
    window.options.maximumSize?.width ||
    window.options.maximumSize?.height
  ) {
    return;
  }

  const maximizedTitle = {
    x: 0,
    y: 0,
    width: desktopSize.width,
    height: activeRects.restoredTitle.height,
  };

  windowSetWindowAnimation({
    destinationRect: window.flags.maximized
      ? activeRects.restoredTitle
      : maximizedTitle,
    icon: window.options.icon,
    originRect: window.flags.maximized
      ? maximizedTitle
      : activeRects.restoredTitle,
    title: window.options.title,
  });

  await delay(AnimationDurations.windowTitle);

  windowStore.mutate((state) => {
    const mutableWindow = getWindowFromState(state, id);
    mutableWindow.flags.maximized = !mutableWindow.flags.maximized;
  });
}

export function windowMinimize(id: string) {
  const { activeRects, desktopSize } = windowStore.state;
  const window = getWindowFromState(windowStore.state, id);
  if (!window.options.minimizable) {
    return;
  }

  const maximizedTitle = {
    x: 0,
    y: 0,
    width: desktopSize.width,
    height: activeRects.restoredTitle.height,
  };

  windowSetWindowAnimation({
    destinationRect: activeRects.trayButton,
    icon: window.options.icon,
    originRect: window.flags.maximized
      ? maximizedTitle
      : activeRects.restoredTitle,
    title: window.options.title,
  });

  windowStore.mutate((state) => {
    const mutableWindow = getWindowFromState(state, id);
    mutableWindow.flags.minimized = true;
    state.lastZIndex = windowGetPenultimateZIndexNonMinimizedId(state);
  });
}

export function windowMinimizeRestore(id: string) {
  const window = getWindowFromState(windowStore.state, id);
  const focused = windowGetFocusedId(windowStore.state) === id;

  if (!window.options.minimizable) {
    return;
  }

  if (focused) {
    windowMinimize(id);
  } else if (window.flags.minimized) {
    windowRestore(id);
  } else {
    windowFocus(id);
  }
}

export function windowOpen(app: Apps, file?: string): string {
  const id = uuid();

  windowStore.mutate((state) => {
    const zIndex = state.lastZIndex + 1;
    const window: Window = {
      app,
      currentSize: { width: null, height: null },
      file: file ?? null,
      flags: {
        initialized: false,
        maximized: false,
        minimized: false,
      },
      id,
      options: {},
      position: { x: null, y: null },
      zIndex,
    };

    state.all.set(id, window);
    state.allByZIndex.set(zIndex, window);

    state.desktopFocused = false;
    state.lastZIndex = zIndex;
  });

  return id;
}

export function windowOpenUrl(_url: string) {
  const url = new WesURL(_url);
  if (url.protocol === 'http' || url.protocol === 'https') {
    windowOpen(Apps.iexplore, _url);
    return;
  }

  const appId = url.protocol.replace(/:$/, '');
  if (appId in Apps) {
    windowOpen(Apps[appId as Apps], _url);
  } else {
    panic(new Error(`${appId}.exe not found`));
  }
}

export function windowRendered(id: string, rect: ObjectRect) {
  windowStore.mutate((state) => {
    const window = getWindowFromState(state, id);
    let autoPositioned = false;

    const {
      currentSize,
      options: {
        initialPosition,
        initialSize,
        maximumSize = { width: Infinity, height: Infinity },
        minimumSize = { width: 0, height: 0 },
      },
      position,
    } = window;

    if (!currentSize.width) {
      currentSize.width = initialSize?.width ?? rect.width;
    }
    if (!currentSize.height) {
      currentSize.height = initialSize?.height ?? rect.height;
    }

    if (minimumSize.width && currentSize.width < minimumSize.width) {
      currentSize.width = minimumSize.width;
    }
    if (maximumSize.width && currentSize.width > maximumSize.width) {
      currentSize.width = maximumSize.width;
    }
    if (minimumSize.height && currentSize.height < minimumSize.height) {
      currentSize.height = minimumSize.height;
    }
    if (maximumSize.height && currentSize.height > maximumSize.height) {
      currentSize.height = maximumSize.height;
    }

    if (position.x === null || position.y === null) {
      if (initialPosition) {
        position.x = initialPosition?.x;
        position.y = initialPosition?.y;
      } else {
        const { desktopSize, lastPosition, smallScreen } = state;
        const positionOffset = smallScreen
          ? NewWindowPositionOffsetSmall
          : NewWindowPositionOffsetLarge;

        const widthDelta = desktopSize.width - currentSize.width;
        const heightDelta = desktopSize.height - currentSize.height;

        if (widthDelta !== 0 && heightDelta !== 0) {
          window.position = {
            x: (lastPosition.x + positionOffset.x) % widthDelta,
            y: (lastPosition.y + positionOffset.y) % heightDelta,
          };
          autoPositioned = true;
        }
      }
    }

    if (position.x && position.y && position.x < 1 && position.y < 1) {
      const { desktopSize } = state;

      window.position = {
        x: Math.floor((desktopSize.width - currentSize.width) * position.x),
        y: Math.floor((desktopSize.height - currentSize.height) * position.y),
      };
    }

    if (autoPositioned && window.position.x && window.position.y) {
      state.lastPosition = { x: window.position.x, y: window.position.y };
    }

    window.flags.initialized = true;
  });
}

export async function windowRestore(id: string) {
  const window = getWindowFromState(windowStore.state, id);
  if (!window.options.minimizable) {
    return;
  }

  windowFocus(id);

  const { activeRects, desktopSize } = windowStore.state;
  const maximizedTitle = {
    x: 0,
    y: 0,
    width: desktopSize.width,
    height: activeRects.restoredTitle.height,
  };

  windowSetWindowAnimation({
    destinationRect: window.flags.maximized
      ? maximizedTitle
      : activeRects.restoredTitle,
    icon: window.options.icon,
    originRect: activeRects.trayButton,
    title: window.options.title,
  });

  await delay(AnimationDurations.windowTitle);

  windowStore.mutate((state) => {
    const mutableWindow = getWindowFromState(state, id);
    mutableWindow.flags.minimized = false;
  });
}

export function windowSetActiveRestoredTitleRect(rect: ObjectRect) {
  windowStore.mutate((state) => {
    state.activeRects.restoredTitle = rect;
  });
}

export function windowSetActiveTrayButtonRect(rect: ObjectRect) {
  windowStore.mutate((state) => {
    state.activeRects.trayButton = rect;
  });
}

export function windowSetDesktopSize(size: ObjectSize) {
  windowStore.mutate((state) => {
    state.desktopSize = size;
    state.smallScreen = size.width <= SmallScreenMinWidth;
  });
}

export function windowSetPosition(id: string, position: ObjectPosition) {
  windowStore.mutate((state) => {
    const window = getWindowFromState(state, id);
    window.position = position;
  });
}

export function windowSetTitle(id: string, title: string) {
  windowStore.mutate((state) => {
    const window = getWindowFromState(state, id);
    window.options.title = title;
  });
}

export function windowSetWindowAnimation(
  windowAnimation: WindowAnimationData | null,
) {
  windowStore.mutate((state) => {
    state.windowAnimation = windowAnimation;
  });
}

// # Helpers

export function getWindowFromState(state: WindowState, id: string) {
  const { all } = state;
  const window = all.get(id);
  if (!window) {
    throw new Error(`Window ${id} does not exist`);
  }

  return window;
}

export function isZIndexWindowNotMinimized(state: WindowState, zIndex: number) {
  const window = state.allByZIndex.get(zIndex);
  return window && !window.flags.minimized;
}

// # Selectors

export function windowGetFocusedId(state: WindowState) {
  return state.desktopFocused
    ? null
    : state.allByZIndex.get(state.lastZIndex)?.id ?? null;
}

export function windowGetPenultimateZIndexNonMinimizedId(state: WindowState) {
  let previousZIndex = state.lastZIndex - 1;
  while (
    previousZIndex > 0 &&
    isZIndexWindowNotMinimized(state, previousZIndex)
  ) {
    previousZIndex -= 1;
  }
  return previousZIndex > 0 ? previousZIndex : 0;
}

export function windowGetActiveRects(state: WindowState) {
  return state.activeRects;
}

export function windowGetAll(state: WindowState) {
  return state.all;
}

export function windowGetDesktopSize(state: WindowState) {
  return state.desktopSize;
}

export function windowGetSmallScreen(state: WindowState) {
  return state.smallScreen;
}

export function windowGetWindowAnimation(state: WindowState) {
  return state.windowAnimation;
}
