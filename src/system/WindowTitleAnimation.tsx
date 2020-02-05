import React, { useEffect, useRef, useState } from 'react';

import { Icon } from '~/src/components';
import { IconSizes } from '~/src/constants/Icons';
import {
  AnimationDurations,
  Colors,
  Scale,
  ZIndexes,
} from '~/src/constants/Styles';
import { useSelector } from '~/src/hooks/useSelector';
import {
  windowGetWindowAnimation,
  windowSetWindowAnimation,
  windowStore,
} from '~/src/state';
import { HStack, Text, TruncationModes } from '~/src/ui';

export function WindowTitleAnimation() {
  const [isDestination, setIsDestination] = useState(false);
  const windowAnimation = useSelector(windowStore, windowGetWindowAnimation);
  const animationBeginTimer = useRef<number | undefined>(undefined);
  const animationEndTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    animationBeginTimer.current = window.setTimeout(() => {
      setIsDestination(true);
    }, 0);
    animationEndTimer.current = window.setTimeout(() => {
      setIsDestination(false);
      windowSetWindowAnimation(null);
    }, AnimationDurations.windowTitle);

    return () => {
      window.clearTimeout(animationBeginTimer.current);
      window.clearTimeout(animationEndTimer.current);
    };
  }, [windowAnimation]);

  if (!windowAnimation) {
    return null;
  }

  const { destinationRect, icon, originRect, title } = windowAnimation;
  const { x, y, width, height } = isDestination ? destinationRect : originRect;

  return (
    <HStack
      backgroundColor={Colors.blue}
      foregroundColor={Colors.white}
      height={height}
      padding={Scale * 2}
      UNSTABLE_css={{
        transition: `all ease ${AnimationDurations.windowTitle}ms`,
      }}
      width={width}
      x={x}
      y={y}
      zIndex={ZIndexes.windowAnimation}
    >
      {icon && <Icon icon={icon} size={IconSizes.small} />}
      <Text
        bold
        marginLeading={Scale * 3}
        marginTrailing={Scale * 3}
        truncationMode={TruncationModes.tail}
      >
        {title}
      </Text>
    </HStack>
  );
}
