import React, { PointerEvent, useCallback, useEffect, useRef } from 'react';

import { IconGrid } from '~/src/components/IconGrid';
import { Colors, ZIndexes } from '~/src/constants/Styles';
import { useHostSize } from '~/src/hooks/useHostSize';
import { useSelector } from '~/src/hooks/useSelector';
import {
  windowFocus,
  windowGetAll,
  windowGetFocusedId,
  windowSetDesktopSize,
  windowStore,
} from '~/src/state';
import { HorizontalAlignments, VStack } from '~/src/ui';
import { getBoundingClientRect } from '~/src/utils/dom';

import { ApplicationWindow } from './ApplicationWindow';
import { Taskbar } from './Taskbar';
import { WindowTitleAnimation } from './WindowTitleAnimation';

export function WesExplorer() {
  const focusedId = useSelector(windowStore, windowGetFocusedId);
  const desktop = useRef<HTMLDivElement>(null);
  const windows = useSelector(windowStore, windowGetAll);

  const size = useHostSize();
  useEffect(() => {
    if (!desktop.current) {
      windowSetDesktopSize(size);
      return;
    }

    const desktopSize = getBoundingClientRect(desktop.current);
    windowSetDesktopSize(desktopSize);
  }, [size]);

  const focused = focusedId === null;
  const handleFocus = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget && !focused) {
        windowFocus(null);
      }
    },
    [focused],
  );

  const windowComponents: JSX.Element[] = [];
  windows.forEach((window) => {
    windowComponents.push(<ApplicationWindow id={window.id} key={window.id} />);
  });

  return (
    <>
      <VStack
        alignment={HorizontalAlignments.stretch}
        backgroundColor={Colors.teal}
        grow={1}
      >
        <VStack
          nativeRef={desktop}
          alignment={HorizontalAlignments.stretch}
          grow={1}
          UNSTABLE_css={{ position: 'relative' }}
          UNSTABLE_onPressDown={handleFocus}
          zIndex={ZIndexes.desktop}
        >
          <IconGrid foregroundColor={Colors.white} />
          {windowComponents}
        </VStack>
        <Taskbar />
      </VStack>
      <WindowTitleAnimation />
    </>
  );
}

WesExplorer.whyDidYouRender = true;
