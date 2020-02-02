/** @jsx jsx */
import { CSSObject, jsx } from '@emotion/core';
import { MouseEvent, PointerEvent, ReactNode } from 'react';

import { ReactRefProp } from '~/src/constants/CommonTypes';

import {
  spreadAccessibilityPropsToAttributes,
  spreadLayoutPropsToCss,
  spreadNativeLayoutPropsToCss,
  spreadStylePropsToCss,
  ViewProps,
} from './View';

interface Props extends ViewProps {
  children?: ReactNode;
}

interface AnchorProps {
  link: true;
  nativeRef?: ReactRefProp<HTMLAnchorElement>;
  onContextMenu?: (event: MouseEvent<HTMLAnchorElement>) => void;
  onDoublePress?: (event: MouseEvent<HTMLAnchorElement>) => void;
  onPointerEnter?: (event: PointerEvent<HTMLAnchorElement>) => void;
  onPointerLeave?: (event: PointerEvent<HTMLAnchorElement>) => void;
  onPress?: (event: MouseEvent<HTMLAnchorElement>) => void;
  onPressDown?: (event: PointerEvent<HTMLAnchorElement>) => void;
}

interface ButtonProps {
  link?: false | undefined;
  nativeRef?: ReactRefProp<HTMLButtonElement>;
  onContextMenu?: (event: MouseEvent<HTMLButtonElement>) => void;
  onDoublePress?: (event: MouseEvent<HTMLButtonElement>) => void;
  onPointerEnter?: (event: PointerEvent<HTMLButtonElement>) => void;
  onPointerLeave?: (event: PointerEvent<HTMLButtonElement>) => void;
  onPress?: (event: MouseEvent<HTMLButtonElement>) => void;
  onPressDown?: (event: PointerEvent<HTMLButtonElement>) => void;
}

/**
 * A view that arranges its children in a vertical line.
 */
export function Pressable({
  children,
  ...props
}: Props & (AnchorProps | ButtonProps)) {
  const css: CSSObject = {
    background: 'none',
    border: 0,
    display: 'inline-block',
    padding: 0,
    userSelect: 'none',
    ':focus': {
      outline: 0,
    },
    ...spreadLayoutPropsToCss(props),
    ...spreadStylePropsToCss(props),
  };

  if (props.link) {
    const {
      nativeRef,
      onContextMenu,
      onDoublePress,
      onPointerEnter,
      onPointerLeave,
      onPress,
      onPressDown,
    } = props;
    return (
      <a
        css={css}
        ref={nativeRef}
        onClick={onPress}
        onContextMenu={onContextMenu}
        onDoubleClick={onDoublePress}
        onPointerDown={onPressDown}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        style={spreadNativeLayoutPropsToCss(props)}
        {...spreadAccessibilityPropsToAttributes(props)}
      >
        {children}
      </a>
    );
  }

  const {
    nativeRef,
    onContextMenu,
    onDoublePress,
    onPointerEnter,
    onPointerLeave,
    onPress,
    onPressDown,
  } = props;
  return (
    <button
      css={css}
      ref={nativeRef}
      onClick={onPress}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoublePress}
      onPointerDown={onPressDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={spreadNativeLayoutPropsToCss(props)}
      {...spreadAccessibilityPropsToAttributes(props)}
    >
      {children}
    </button>
  );
}
