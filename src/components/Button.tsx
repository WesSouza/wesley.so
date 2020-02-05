import React, { MouseEvent, PointerEvent, ReactNode } from 'react';

import { ReactRefProp } from '~/src/constants/CommonTypes';
import { Pressable, Themes, ViewProps } from '~/src/ui';

interface Props extends ViewProps {
  active?: boolean;
  children?: ReactNode;
  nativeRef?: ReactRefProp<HTMLButtonElement>;
  onPress?: (event: MouseEvent<HTMLButtonElement>) => void;
  onPressDown?: (event: PointerEvent<HTMLButtonElement>) => void;
  pressed?: boolean;
}

export function Button({
  active,
  children,
  nativeRef,
  onPress,
  onPressDown,
  pressed: keepPressed,
  ...props
}: Props) {
  return (
    <Pressable
      nativeRef={nativeRef}
      theme={
        active
          ? Themes.buttonActive
          : keepPressed
          ? Themes.buttonPressed
          : Themes.button
      }
      onPress={onPress}
      onPressDown={onPressDown}
      {...props}
    >
      {children}
    </Pressable>
  );
}
