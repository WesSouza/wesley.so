/** @jsx jsx */
import { CSSObject, jsx } from '@emotion/core';
import { FontWeightProperty } from 'csstype';
import { ReactNode } from 'react';
import nl2brApply from 'react-nl2br';

import {
  SelectionModes,
  spreadAccessibilityPropsToAttributes,
  spreadLayoutPropsToCss,
  spreadNativeLayoutPropsToCss,
  spreadStylePropsToCss,
  TextAlignments,
  TruncationModes,
  ViewProps,
} from './View';

const AlignmentMap: Record<TextAlignments, string> = {
  [TextAlignments.center]: 'center',
  [TextAlignments.leading]: 'left',
  [TextAlignments.trailing]: 'right',
};

interface Props extends ViewProps {
  /**
   * Applies a bold font weight to the text.
   */
  bold?: boolean;

  /**
   * Text content, or array of text content.
   */
  children: ReactNode;

  /**
   * Sets the font weight of the text.
   */
  fontWeight?: FontWeightProperty;

  /**
   * Applies italics to the text.
   */
  italic?: boolean;

  /**
   * Alignment applied to multiline text.
   */
  multilineTextAlignment?: TextAlignments;

  /**
   * Trans
   */
  nl2br?: boolean;

  /**
   * Sets the selection mode to determine if selecting text is available.
   */
  selectionMode?: SelectionModes;

  /**
   * Sets the truncation mode for lines of text that are too long to fit in the
   * available space.
   */
  truncationMode?: TruncationModes;

  /**
   * Applies an underline to the text.
   */
  underline?: boolean;

  /**
   * Color applied to the underline.
   */
  underlineColor?: string;

  /**
   * Do not use.
   */
  UNSTABLE_css?: CSSObject;
}

/**
 * A view that displays one or more lines of read-only text.
 */
export function Text({
  bold,
  children,
  fontWeight,
  italic,
  multilineTextAlignment,
  nl2br,
  selectionMode,
  truncationMode,
  underline,
  underlineColor,
  UNSTABLE_css,
  ...props
}: Props) {
  return (
    <span
      css={{
        align: multilineTextAlignment
          ? AlignmentMap[multilineTextAlignment]
          : undefined,
        fontWeight: fontWeight ?? bold ? 'bold' : undefined,
        fontStyle: italic ? 'italics' : undefined,
        textDecoration: underline ? 'underline' : undefined,
        textDecorationColor: underlineColor,
        ...(selectionMode === SelectionModes.allow
          ? undefined
          : {
              cursor: 'default',
              userSelect: 'none',
            }),
        ...(truncationMode === TruncationModes.crop
          ? {
              overflow: 'hidden',
              textAlign: 'left',
              width: '100%',
            }
          : truncationMode === TruncationModes.tail
          ? {
              overflow: 'hidden',
              textAlign: 'left',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              width: '100%',
            }
          : undefined),
        ...spreadLayoutPropsToCss(props),
        ...spreadStylePropsToCss(props),
        ...UNSTABLE_css,
      }}
      style={spreadNativeLayoutPropsToCss(props)}
      {...spreadAccessibilityPropsToAttributes(props)}
    >
      {nl2br ? nl2brApply(children) : children}
    </span>
  );
}
