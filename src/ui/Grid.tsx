/** @jsx jsx */
import { CSSObject, jsx } from '@emotion/core';

import { HStack, HStackProps } from './HStack';

interface Props extends HStackProps {
  /**
   * Number of sub-views per line of content.
   */
  columns: number;

  /**
   * Spacing between sub-views.
   */
  spacing: number;
}

/**
 * A view that arranges its children in a vertical line.
 */
export function Grid({
  columns,
  children,
  spacing,
  UNSTABLE_css,
  ...props
}: Props) {
  const css: CSSObject = {
    ...UNSTABLE_css,
    display: 'grid',
    gridGap: spacing,
    gridTemplateColumns: `calc(calc(100% / ${columns}) - ${(spacing / columns) *
      (columns - 1)}px)`.repeat(columns),
  };
  return (
    <HStack UNSTABLE_css={css} {...props}>
      {children}
    </HStack>
  );
}
