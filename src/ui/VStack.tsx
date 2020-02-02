/** @jsx jsx */
import { CSSObject, jsx } from '@emotion/core';
import { CSSProperties, PointerEvent, ReactNode, RefObject } from 'react';

import {
  HorizontalAlignments,
  spreadAccessibilityPropsToAttributes,
  spreadLayoutPropsToCss,
  spreadNativeLayoutPropsToCss,
  spreadStylePropsToCss,
  ViewProps,
} from './View';

const AlignmentMap: Record<HorizontalAlignments, string> = {
  [HorizontalAlignments.leading]: 'flex-start',
  [HorizontalAlignments.center]: 'center',
  [HorizontalAlignments.stretch]: 'stretch',
  [HorizontalAlignments.trailing]: 'flex-end',
};

export interface VStackProps extends ViewProps {
  /**
   * The guide for aligning the subviews in this stack. It has the same
   * horizontal screen coordinate for all children.
   */
  alignment?: HorizontalAlignments;

  /**
   * The subviews children of this stack.
   */
  children?: ReactNode;

  /**
   * Reference to the native HTML element.
   */
  nativeRef?: RefObject<HTMLDivElement>;

  /**
   * The distance between adjacent subviews.
   */
  spacing?: number;

  /**
   * Do not use.
   */
  UNSTABLE_css?: CSSObject;

  /**
   * Do not use.
   */
  UNSTABLE_style?: CSSProperties;

  /**
   * Do not use.
   */
  UNSTABLE_onPointerLeave?: (event: PointerEvent<HTMLDivElement>) => void;

  /**
   * Do not use.
   */
  UNSTABLE_onPressDown?: (event: PointerEvent<HTMLDivElement>) => void;

  wrap?: boolean;
}

/**
 * A view that arranges its children in a vertical line.
 */
export function VStack({
  alignment = HorizontalAlignments.center,
  children,
  nativeRef,
  spacing,
  UNSTABLE_css,
  UNSTABLE_style,
  UNSTABLE_onPointerLeave,
  UNSTABLE_onPressDown,
  wrap,
  ...props
}: VStackProps) {
  const shrinkable = props.shrink !== undefined && props.shrink > 0;
  return (
    <div
      css={{
        ...spreadLayoutPropsToCss(props),
        ...spreadStylePropsToCss(props),
        display: 'flex',
        flexDirection: 'column',
        flexWrap: wrap ? 'wrap' : undefined,
        alignItems: AlignmentMap[alignment],
        alignContent: 'flex-start',
        '> *:not(:last-child)': {
          marginBottom: spacing,
        },
        ...(shrinkable
          ? {
              minWidth: 0,
            }
          : null),
        ...UNSTABLE_css,
      }}
      ref={nativeRef}
      onPointerLeave={UNSTABLE_onPointerLeave}
      onPointerDown={UNSTABLE_onPressDown}
      style={{ ...spreadNativeLayoutPropsToCss(props), ...UNSTABLE_style }}
      {...spreadAccessibilityPropsToAttributes(props)}
    >
      {children}
    </div>
  );
}
