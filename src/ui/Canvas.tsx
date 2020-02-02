/** @jsx jsx */
import { CSSObject, jsx } from '@emotion/core';
import { CSSProperties, RefObject } from 'react';

import {
  spreadAccessibilityPropsToAttributes,
  spreadLayoutPropsToCss,
  spreadNativeLayoutPropsToCss,
  spreadStylePropsToCss,
  ViewProps,
} from './View';

export interface CanvasProps extends ViewProps {
  /**
   * Reference to the native HTML element.
   */
  nativeRef?: RefObject<HTMLCanvasElement>;

  /**
   * Do not use.
   */
  UNSTABLE_css?: CSSObject;

  /**
   * Do not use.
   */
  UNSTABLE_style?: CSSProperties;
}

/**
 * A view that arranges its children in a vertical line.
 */
export function Canvas({
  nativeRef,
  UNSTABLE_css,
  UNSTABLE_style,
  ...props
}: CanvasProps) {
  return (
    <canvas
      css={{
        ...spreadLayoutPropsToCss(props),
        ...spreadStylePropsToCss(props),
        ...UNSTABLE_css,
      }}
      ref={nativeRef}
      style={{ ...spreadNativeLayoutPropsToCss(props), ...UNSTABLE_style }}
      {...spreadAccessibilityPropsToAttributes(props)}
    />
  );
}
