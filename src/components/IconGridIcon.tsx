import React from 'react';

import { ObjectPosition } from '~/src/constants/CommonTypes';
import { Icons, IconSizes } from '~/src/constants/Icons';
import { Scale } from '~/src/constants/Styles';
import { Cursors, Pressable, Text, VStack } from '~/src/ui';

import { Icon } from './Icon';
import { MenuTree } from './Menu';

interface Props {
  action: string;
  contextMenu: MenuTree[];
  icon: Icons;
  id: string;
  label: string;
  onPress: () => void;
  position?: ObjectPosition;
}

export function IconGridIcon({ icon, label, onPress, position }: Props) {
  return (
    <Pressable
      cursor={Cursors.pointer}
      onPress={onPress}
      x={position?.x}
      y={position?.y}
    >
      <VStack margin={Scale * 4} width={Scale * 65} height={Scale * 65}>
        <Icon icon={icon} size={IconSizes.large} />
        <Text cursor={Cursors.pointer} marginTop={Scale * 4} padding={Scale}>
          {label}
        </Text>
      </VStack>
    </Pressable>
  );
}
