import React from 'react';

import { Scale } from '~/src/constants/Styles';
import { Symbols, SymbolSvgs } from '~/src/constants/Symbols';
import { Image, ViewLayoutProps } from '~/src/ui';

const Size = 9 * Scale;

interface Props extends ViewLayoutProps {
  symbol: Symbols;
}

export function Symbol({ symbol, ...props }: Props) {
  return (
    <Image
      height={Size}
      shrink={0}
      svg={SymbolSvgs[symbol]}
      width={Size}
      {...props}
    />
  );
}
