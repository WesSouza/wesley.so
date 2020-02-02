import { CSSObject } from '@emotion/core';
import { CSSProperties, HTMLAttributes } from 'react';

import { Themes, ThemeStyles } from './Themes';

export enum Alignments {
  /** A guide marking the bottom edge of the view. */
  bottom = 'bottom',

  /** A guide marking the bottom and leading edges of the view. */
  bottomLeading = 'bottomLeading',

  /** A guide marking the bottom and trailing edges of the view. */
  bottomTrailing = 'bottomTrailing',

  /** A guide marking the center of the view. */
  center = 'center',

  /** A guide marking the leading edge of the view. */
  leading = 'leading',

  /** A guide marking the top edge of the view. */
  top = 'top',

  /** A guide marking the top and leading edges of the view. */
  topLeading = 'topLeading',

  /** A guide marking the top and trailing edges of the view. */
  topTrailing = 'topTrailing',

  /** A guide marking the trailing edge of the view. */
  trailing = 'trailing',
}

export enum Cursors {
  eResize = 'e-resize',
  ewResize = 'ew-resize',
  neResize = 'ne-resize',
  neswResize = 'nesw-resize',
  nResize = 'n-resize',
  nsResize = 'ns-resize',
  nwResize = 'nw-resize',
  nwseResize = 'nwse-resize',
  pointer = 'pointer',
  seResize = 'se-resize',
  sResize = 's-resize',
  swResize = 'sw-resize',
  wait = 'wait',
  wResize = 'w-resize',
}

export enum HorizontalAlignments {
  center = 'center',
  leading = 'flex-start',
  stretch = 'stretch',
  trailing = 'flex-end',
}

export enum SelectionModes {
  allow = 'allow',
  prevent = 'prevent',
}

export enum TextAlignments {
  center = 'center',
  leading = 'leading',
  trailing = 'trailing',
}

export enum TruncationModes {
  crop = 'crop',
  tail = 'tail',
}

export enum VerticalAlignments {
  bottom = 'flex-end',
  center = 'center',
  stretch = 'stretch',
  top = 'flex-start',
}

export interface ViewAccessibilityProps {
  focusable?: boolean;
  label?: string;
  role?: string;
}

export interface ViewLayoutProps {
  backgroundColor?: string;
  grow?: number;
  invisible?: boolean;
  margin?: number;
  marginLeading?: number;
  marginTop?: number;
  marginTrailing?: number;
  marginBottom?: number;
  minHeight?: number;
  minWidth?: number;
  opacity?: number;
  padding?: number;
  paddingLeading?: number;
  paddingTop?: number;
  paddingTrailing?: number;
  paddingBottom?: number;
  selfAlignment?: HorizontalAlignments | VerticalAlignments;
  shrink?: number;
  theme?: Themes;
  xScroll?: boolean;
  yScroll?: boolean;
}

export interface ViewNativeStyleProps {
  invertX?: boolean;
  invertY?: boolean;
  height?: string | number;
  relative?: boolean;
  width?: string | number;
  x?: number;
  y?: number;
  zIndex?: number;
}

export interface ViewStyleProps {
  cursor?: Cursors;
  fontFamily?: string;
  fontSize?: number;
  foregroundColor?: string;
  lineSpacing?: number;
}

export type ViewProps = ViewAccessibilityProps &
  ViewLayoutProps &
  ViewNativeStyleProps &
  ViewStyleProps;

export function spreadLayoutPropsToCss({
  backgroundColor,
  grow,
  invisible,
  margin,
  marginBottom,
  marginLeading,
  marginTop,
  marginTrailing,
  minHeight,
  minWidth,
  opacity,
  padding,
  paddingBottom,
  paddingLeading,
  paddingTop,
  paddingTrailing,
  selfAlignment,
  shrink,
  theme,
  xScroll,
  yScroll,
}: ViewLayoutProps): CSSObject {
  const css: CSSObject = {};

  if (backgroundColor !== undefined) {
    css.backgroundColor = backgroundColor;
  }

  if (grow !== undefined) {
    css.flexGrow = grow;
  }

  if (invisible) {
    css.opacity = 0;
    css.pointerEvents = 'none';
  }

  if (margin !== undefined) {
    css.margin = margin;
  }

  if (marginBottom !== undefined) {
    css.marginBottom = marginBottom;
  }

  if (marginLeading !== undefined) {
    css.marginLeft = marginLeading;
  }

  if (marginTrailing !== undefined) {
    css.marginRight = marginTrailing;
  }

  if (marginTop !== undefined) {
    css.marginTop = marginTop;
  }

  if (minHeight !== undefined) {
    css.minHeight = minHeight;
  }

  if (minWidth !== undefined) {
    css.minWidth = minWidth;
  }

  if (opacity !== undefined) {
    css.opacity = opacity;
  }

  if (padding !== undefined) {
    css.padding = padding;
  }

  if (paddingBottom !== undefined) {
    css.paddingBottom = paddingBottom;
  }

  if (paddingLeading !== undefined) {
    css.paddingLeft = paddingLeading;
  }

  if (paddingTrailing !== undefined) {
    css.paddingRight = paddingTrailing;
  }

  if (paddingTop !== undefined) {
    css.paddingTop = paddingTop;
  }

  if (selfAlignment !== undefined) {
    css.alignSelf = selfAlignment;
  }

  if (shrink !== undefined) {
    css.flexShrink = shrink;
  }

  if (xScroll && yScroll) {
    css.overflow = 'scroll';
  } else if (xScroll) {
    css.overflowX = 'scroll';
  } else if (yScroll) {
    css.overflowY = 'scroll';
  }

  return {
    ...(theme ? { ...ThemeStyles[theme] } : null),
    ...css,
  };
}

export function spreadNativeLayoutPropsToCss({
  invertX,
  invertY,
  height,
  relative,
  width,
  x,
  y,
  zIndex,
}: ViewNativeStyleProps): CSSProperties {
  const css: CSSProperties = {};

  if (height !== undefined) {
    css.height = height;
  }

  if (x !== undefined) {
    if (!invertX) {
      css.left = x;
    } else {
      css.right = x;
    }
  }

  if (x !== undefined && y !== undefined) {
    css.position = 'absolute';
  } else if (relative) {
    css.position = 'relative';
  }

  if (y !== undefined) {
    if (!invertY) {
      css.top = y;
    } else {
      css.bottom = y;
    }
  }

  if (width !== undefined) {
    css.width = width;
  }

  if (zIndex !== undefined) {
    css.zIndex = zIndex;
  }

  return css;
}

export function spreadStylePropsToCss({
  cursor,
  fontFamily,
  fontSize,
  foregroundColor,
  lineSpacing,
}: ViewStyleProps): CSSObject {
  const css: CSSObject = {};

  if (cursor !== undefined) {
    css.cursor = cursor;
  }

  if (fontFamily !== undefined) {
    css.fontFamily = fontFamily;
  }

  if (fontSize !== undefined) {
    css.fontSize = fontSize;
  }

  if (foregroundColor !== undefined) {
    css.color = foregroundColor;
  }

  if (lineSpacing !== undefined) {
    css.lineHeight = lineSpacing;
  }

  return css;
}

export function spreadAccessibilityPropsToAttributes<T>({
  focusable,
  label,
  role,
}: ViewAccessibilityProps): HTMLAttributes<T> {
  const attributes: HTMLAttributes<T> = {};

  if (focusable !== undefined) {
    attributes.tabIndex = 0;
  }

  if (label !== undefined) {
    attributes['aria-label'] = label;
  }

  if (role !== undefined) {
    attributes['aria-roledescription'] = role;
  }

  return attributes;
}
