import React from 'react';

import { Icon } from '~/src/components';
import { Icons, IconSizes } from '~/src/constants/Icons';
import { Sounds, SoundsSrcs } from '~/src/constants/Sounds';
import { Scale } from '~/src/constants/Styles';
import { useAudio } from '~/src/hooks/useAudio';
import { useClock } from '~/src/hooks/useClock';
import { useSelector } from '~/src/hooks/useSelector';
import { windowGetSmallScreen, windowStore } from '~/src/state';
import { HStack, Pressable, Text, Themes, VerticalAlignments } from '~/src/ui';

interface Props {}

export function SysTray({}: Props) {
  const clock = useClock();
  const smallScreen = useSelector(windowStore, windowGetSmallScreen);

  const audioPlayer = useAudio({ src: SoundsSrcs[Sounds.ding] });

  return (
    <>
      <HStack
        paddingLeading={Scale * 5}
        paddingTrailing={Scale * 5}
        selfAlignment={VerticalAlignments.stretch}
        padding={Scale * 1}
        shrink={0}
        spacing={Scale * 5}
        theme={Themes.frameInsetThin}
        wrap
      >
        <Pressable onPress={audioPlayer.play}>
          <Icon icon={Icons.sysTraySound} size={IconSizes.small} />
        </Pressable>
        {!smallScreen && <Text paddingTrailing={Scale}>{clock}</Text>}
      </HStack>
    </>
  );
}
