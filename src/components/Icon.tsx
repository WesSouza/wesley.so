import React from 'react';

import { Icons, IconSizes, IconSrcs } from '~/src/constants/Icons';
import { Scale } from '~/src/constants/Styles';
import { Image, ViewLayoutProps } from '~/src/ui';

const SizeMap = {
  [IconSizes.large]: 32 * Scale,
  [IconSizes.small]: 16 * Scale,
};

interface Props extends ViewLayoutProps {
  icon: Icons;
  size: IconSizes;
}

export function Icon({ icon, size, ...props }: Props) {
  const widthHeight = SizeMap[size];
  return (
    <Image
      height={widthHeight}
      width={widthHeight}
      shrink={0}
      src={IconSrcs[icon][size]}
      {...props}
    />
  );
}
