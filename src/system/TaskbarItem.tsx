import React, { useCallback, useEffect, useRef } from 'react';

import { Button, Icon } from '~/src/components';
import { IconSizes } from '~/src/constants/Icons';
import { Scale } from '~/src/constants/Styles';
import { useSelector } from '~/src/hooks/useSelector';
import {
  Window,
  windowGetSmallScreen,
  windowMinimizeRestore,
  windowSetActiveTrayButtonRect,
  windowStore,
} from '~/src/state';
import { HStack, Text, TruncationModes, VStack } from '~/src/ui';
import { getBoundingClientRect } from '~/src/utils/dom';

interface Props {
  focused: boolean;
  window: Window;
}

export function TaskbarItem({ focused, window }: Props) {
  const smallScreen = useSelector(windowStore, windowGetSmallScreen);
  const elementRef = useRef<HTMLButtonElement | null>(null);

  const {
    id,
    options: { icon, minimizable, title },
  } = window;

  useEffect(() => {
    if (!focused || !elementRef.current) {
      return;
    }
  }, [focused]);

  const handleRef = useCallback((ref: HTMLButtonElement | null) => {
    elementRef.current = ref;
    if (ref) {
      windowSetActiveTrayButtonRect(getBoundingClientRect(ref));
    }
  }, []);

  const handlePress = useCallback(() => {
    windowMinimizeRestore(id);

    if (!focused && elementRef.current) {
      windowSetActiveTrayButtonRect(getBoundingClientRect(elementRef.current));
    }
  }, [focused, id]);

  if (!minimizable) {
    return null;
  }

  return (
    <Button
      active={focused}
      nativeRef={handleRef}
      onPress={handlePress}
      padding={Scale * 1}
      shrink={1}
      width={Scale * (smallScreen ? 30 : 120)}
    >
      {smallScreen ? (
        <VStack>{icon && <Icon icon={icon} size={IconSizes.small} />}</VStack>
      ) : (
        <HStack>
          {icon && <Icon icon={icon} size={IconSizes.small} />}
          <Text
            bold
            marginLeading={Scale * 4}
            marginTrailing={Scale * 4}
            truncationMode={TruncationModes.tail}
          >
            {title}
          </Text>
        </HStack>
      )}
    </Button>
  );
}
