import React, {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';

import { ObjectRect } from '~/src/constants/CommonTypes';
import { IconSizes } from '~/src/constants/Icons';
import { Colors, Scale, ZIndexes } from '~/src/constants/Styles';
import { Symbols } from '~/src/constants/Symbols';
import { useWindowMoveResize } from '~/src/hooks/useWindowMoveResize';
import { Window } from '~/src/state';
import {
  Cursors,
  HorizontalAlignments,
  HStack,
  Pressable,
  Spacer,
  Text,
  Themes,
  TruncationModes,
  VStack,
} from '~/src/ui';
import { getBoundingClientRect } from '~/src/utils/dom';

import { Button } from './Button';
import { Icon } from './Icon';
import { Symbol } from './Symbol';

const DefaultMinimumSize = { width: 200, height: 100 };
const DefaultMaximumSize = { width: Infinity, height: Infinity };

interface Props {
  focused: boolean;
  children?: ReactNode;
  onClose: () => void;
  onFocus: () => void;
  onMaximize?: () => void;
  onMinimize?: () => void;
  onMoveResize?: (rect: ObjectRect) => void;
  onRender?: (rect: ObjectRect) => void;
  titleButtonNativeRef?: RefObject<HTMLDivElement>;
  window: Window;
  zIndex: number;
}

export enum WindowTypes {
  dialog = 'dialog',
  modal = 'modal',
  window = 'window',
}

export function Window({
  children,
  focused,
  onClose,
  onFocus,
  onMaximize,
  onMinimize,
  onMoveResize,
  onRender,
  titleButtonNativeRef,
  window,
  zIndex,
}: Props) {
  const windowRef = useRef<HTMLDivElement>(null);

  const handleFocus = useCallback(() => {
    if (!focused) {
      onFocus();
    }
  }, [focused, onFocus]);

  const handleMoveResizeEnd = useCallback(() => {
    if (!windowRef.current || !focused) {
      return;
    }
    onMoveResize?.(getBoundingClientRect(windowRef.current));
  }, [focused, onMoveResize]);

  const {
    currentSize: currentSize,
    flags: { initialized, minimized, maximized },
    options: {
      icon,
      maximumSize: maximumSize,
      minimizable,
      minimumSize: minimumSize,
      resizable,
      title,
    },
    position,
  } = window;

  const {
    x: movingX,
    y: movingY,
    width: resizingWidth,
    height: resizingHeight,
    handlers,
  } = useWindowMoveResize({
    onMoveResizeEnd: handleMoveResizeEnd,
    resizeMinimum: minimumSize ?? DefaultMinimumSize,
    resizeMaximum: maximumSize ?? DefaultMaximumSize,
    windowRef,
  });

  let currentWidth = currentSize.width ?? 0;
  let currentHeight = currentSize.height ?? 0;
  let cssWidth: number | string = currentWidth;
  let cssHeight: number | string = currentHeight;

  if (resizingWidth && resizingHeight) {
    currentWidth = resizingWidth;
    currentHeight = resizingHeight;
    cssWidth = resizingWidth;
    cssHeight = resizingHeight;
  }

  if (maximized) {
    cssWidth = '100%';
    cssHeight = '100%';
  }

  if (!cssWidth) {
    cssWidth = 'auto';
  }
  if (!cssHeight) {
    cssHeight = 'auto';
  }

  if (typeof cssWidth === 'number') {
    cssWidth = `${cssWidth}px`;
  }
  if (typeof cssHeight === 'number') {
    cssHeight = `${cssHeight}px`;
  }

  let x = 0;
  let y = 0;
  let theme = Themes.frame;

  if (maximized) {
    theme = Themes.basic;
  } else {
    x = movingX ?? position?.x ?? 0;
    y = movingY ?? position?.y ?? 0;
  }

  useLayoutEffect(() => {
    if (
      windowRef.current &&
      typeof cssWidth === 'string' &&
      typeof cssHeight === 'string'
    ) {
      windowRef.current.style.width = cssWidth;
      windowRef.current.style.height = cssHeight;
      windowRef.current.style.transform = `translate(${x}px, ${y}px)`;
      windowRef.current.style.zIndex = String(zIndex);
    }
  }, [cssHeight, cssWidth, x, y, zIndex]);

  useEffect(() => {
    if (windowRef.current) {
      const rect = getBoundingClientRect(windowRef);
      onRender?.(rect);
    }
  }, [onRender]);

  return (
    <VStack
      alignment={HorizontalAlignments.stretch}
      focusable
      invisible={!initialized || minimized}
      nativeRef={windowRef}
      padding={maximized ? 0 : Scale * 1}
      theme={theme}
      UNSTABLE_css={{
        position: 'absolute',
        willChange: 'height, transform, width',
      }}
      UNSTABLE_onPressDown={handleFocus}
    >
      <HStack
        backgroundColor={focused ? Colors.blue : Colors.darkGray}
        foregroundColor={focused ? Colors.white : Colors.lightGray}
        nativeRef={titleButtonNativeRef}
        padding={Scale * 2}
        shrink={0}
      >
        {icon && (
          <Icon icon={icon} marginTrailing={Scale * 3} size={IconSizes.small} />
        )}
        <Text
          bold
          marginTrailing={Scale * 10}
          truncationMode={TruncationModes.tail}
        >
          {title}
        </Text>
        <Spacer />
        {minimizable && (
          <Button
            onPress={onMinimize}
            padding={Scale * 1}
            zIndex={ZIndexes.windowControls}
          >
            <Symbol symbol={Symbols.windowMinimize} />
          </Button>
        )}
        {resizable && (
          <Button
            onPress={onMaximize}
            padding={Scale * 1}
            zIndex={ZIndexes.windowControls}
          >
            <Symbol
              symbol={
                maximized ? Symbols.windowRestore : Symbols.windowMaximize
              }
            />
          </Button>
        )}
        <Button
          marginLeading={Scale * 2}
          onPress={onClose}
          padding={Scale * 1}
          zIndex={ZIndexes.windowControls}
        >
          <Symbol symbol={Symbols.windowClose} />
        </Button>

        <Pressable
          height={Scale * 20}
          onDoublePress={onMaximize}
          onPressDown={!maximized ? handlers.move : undefined}
          width={cssWidth}
          x={0}
          y={0}
          zIndex={ZIndexes.windowMovement}
        />
        {!maximized && resizable && (
          <>
            <Pressable
              height={Scale * 15}
              onPressDown={handlers.resizeNw}
              width={Scale * 15}
              x={Scale * -3}
              y={Scale * -3}
              zIndex={ZIndexes.windowResize}
              cursor={Cursors.nwseResize}
            />
            <Pressable
              height={Scale * 10}
              onPressDown={handlers.resizeN}
              width={currentWidth - Scale * 24}
              x={Scale * 12}
              y={Scale * -3}
              zIndex={ZIndexes.windowResize}
              cursor={Cursors.nsResize}
            />
            <Pressable
              height={Scale * 15}
              onPressDown={handlers.resizeNe}
              width={Scale * 15}
              x={currentWidth - Scale * 12}
              y={Scale * -3}
              zIndex={ZIndexes.windowResize}
              cursor={Cursors.neswResize}
            />
            <Pressable
              height={currentHeight - Scale * 24}
              onPressDown={handlers.resizeW}
              width={Scale * 15}
              x={Scale * -3}
              y={Scale * 12}
              zIndex={ZIndexes.windowResize}
              cursor={Cursors.ewResize}
            />
            <Pressable
              height={currentHeight - Scale * 24}
              onPressDown={handlers.resizeE}
              width={Scale * 15}
              x={currentWidth - Scale * 12}
              y={Scale * 12}
              zIndex={ZIndexes.windowResize}
              cursor={Cursors.ewResize}
            />
            <Pressable
              height={Scale * 15}
              onPressDown={handlers.resizeSw}
              width={Scale * 15}
              x={Scale * -3}
              y={currentHeight - Scale * 12}
              zIndex={ZIndexes.windowResize}
              cursor={Cursors.neswResize}
            />
            <Pressable
              height={Scale * 15}
              onPressDown={handlers.resizeS}
              width={currentWidth - Scale * 24}
              x={Scale * 12}
              y={currentHeight - Scale * 12}
              zIndex={ZIndexes.windowResize}
              cursor={Cursors.nsResize}
            />
            <Pressable
              height={Scale * 15}
              onPressDown={handlers.resizeSe}
              width={Scale * 15}
              x={currentWidth - Scale * 12}
              y={currentHeight - Scale * 12}
              zIndex={ZIndexes.windowResize}
              cursor={Cursors.nwseResize}
            />
          </>
        )}
      </HStack>
      {children}
    </VStack>
  );
}
