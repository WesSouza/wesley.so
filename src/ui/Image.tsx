/** @jsx jsx */
import { CSSObject, jsx } from '@emotion/core';
import React, { ReactElement } from 'react';

import {
  spreadAccessibilityPropsToAttributes,
  spreadLayoutPropsToCss,
  spreadNativeLayoutPropsToCss,
  ViewAccessibilityProps,
  ViewLayoutProps,
} from './View';

interface ImageProps extends ViewAccessibilityProps, ViewLayoutProps {
  aspectRatio?: number;
  ariaLabel?: string;
  height?: string | number;
  width?: string | number;
}

interface PropsSrc {
  posterize?: boolean;
  src: string;
}

interface PropsSvg {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  svg: ReactElement<any>;
}

/**
 * A view that displays an image or SVG.
 */
export function Image({
  ariaLabel,
  aspectRatio,
  ...props
}: ImageProps & (PropsSvg | PropsSrc)) {
  if ('src' in props) {
    const { height, posterize, src, width = '100%', ...moreProps } = props;

    const css: CSSObject = {
      display: 'block',
    };

    if (posterize) {
      css.filter = `url("#posterize")`;
    }

    if (aspectRatio !== undefined) {
      return (
        <div
          aria-label={ariaLabel ?? ''}
          css={{
            backgroundImage: `url("${src}")`,
            backgroundSize: 'cover',
            height: 0,
            paddingTop: `calc(${1 / aspectRatio} * 100%)`,
            width,
            ...spreadLayoutPropsToCss(props),
            ...css,
          }}
          style={spreadNativeLayoutPropsToCss(props)}
          {...spreadAccessibilityPropsToAttributes(props)}
        />
      );
    }

    return (
      <img
        width={width}
        height={height}
        src={src}
        alt={ariaLabel ?? ''}
        css={{
          objectFit: 'cover',
          ...spreadLayoutPropsToCss(moreProps),
          ...css,
        }}
        {...spreadAccessibilityPropsToAttributes(moreProps)}
      />
    );
  }

  if ('svg' in props) {
    const { height, width = '100%', ...moreProps } = props;
    return React.cloneElement(props.svg, {
      width,
      height,
      style: {
        ...spreadLayoutPropsToCss(moreProps),
        ariaLabel,
        display: 'block',
      },
      ...spreadAccessibilityPropsToAttributes(moreProps),
    });
  }

  return null;
}
