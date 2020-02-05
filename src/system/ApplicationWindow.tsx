import React, { useCallback, useRef } from 'react';

import { Window } from '~/src/components';
import { ObjectRect } from '~/src/constants/CommonTypes';
import { useCollectionItem } from '~/src/hooks/useCollectionItem';
import { useSelector } from '~/src/hooks/useSelector';
import { ProgramFiles } from '~/src/program-files';
import {
  Window as WindowType,
  windowClose,
  windowFocus,
  windowGetFocusedId,
  windowMaximizeRestore,
  windowMinimize,
  windowRendered,
  windowSetActiveRestoredTitleRect,
  windowStore,
} from '~/src/state';
import { getBoundingClientRect } from '~/src/utils/dom';

export interface ApplicationWindowProps {
  window: WindowType;
}

interface Props {
  id: string;
}

function ApplicationWindowComponent({ id }: Props) {
  const titleButtonRef = useRef<HTMLDivElement | null>(null);

  const window = useCollectionItem(windowStore, 'all', id) as WindowType;
  if (!window) {
    throw new Error(`Window ${id} does not exist`);
  }

  const { app, zIndex } = window;
  if (!(app in ProgramFiles)) {
    throw new Error(`Unknown application ${app}`);
  }

  const focusedId = useSelector(windowStore, windowGetFocusedId);
  const focused = focusedId === id;

  const handleClose = useCallback(() => {
    windowClose(id);
  }, [id]);

  const handleFocus = useCallback(() => {
    windowFocus(id);
  }, [id]);

  const handleMaximize = useCallback(() => {
    windowMaximizeRestore(id);
  }, [id]);

  const handleMinimize = useCallback(() => {
    windowMinimize(id);
  }, [id]);

  const handleMoveResize = useCallback(() => {
    if (!focused || !titleButtonRef.current || window.flags.maximized) {
      return;
    }
    windowSetActiveRestoredTitleRect(
      getBoundingClientRect(titleButtonRef.current),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused, titleButtonRef.current, window]);

  const handleRender = useCallback(
    (rect: ObjectRect) => {
      windowRendered(id, rect);

      if (!focused || !titleButtonRef.current || window.flags.maximized) {
        return;
      }
      windowSetActiveRestoredTitleRect(
        getBoundingClientRect(titleButtonRef.current),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [focused, id, titleButtonRef.current, window.flags.maximized],
  );

  const ApplicationComponent = ProgramFiles[app];
  return (
    <Window
      focused={focused}
      onClose={handleClose}
      onFocus={handleFocus}
      onMaximize={handleMaximize}
      onMinimize={handleMinimize}
      onMoveResize={handleMoveResize}
      onRender={handleRender}
      titleButtonNativeRef={titleButtonRef}
      window={window}
      zIndex={zIndex}
    >
      <ApplicationComponent window={window} />
    </Window>
  );
}

export const ApplicationWindow = React.memo(ApplicationWindowComponent);
