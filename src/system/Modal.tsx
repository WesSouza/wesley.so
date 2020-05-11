import React, { memo, useCallback, useEffect } from 'react';
import nl2br from 'react-nl2br';

import { Button, Icon } from '~/src/components';
import { IconSizes } from '~/src/constants/Icons';
import { PaddingValues, Scale } from '~/src/constants/Styles';
import { useCollectionItem } from '~/src/hooks/useCollectionItem';
import { useSelector } from '~/src/hooks/useSelector';
import {
  Modal as ModalType,
  modalAction,
  ModalState,
  modalStore,
  windowConfigure,
  windowGetDesktopSize,
  windowStore,
} from '~/src/state';
import { ApplicationWindowProps } from '~/src/system/ApplicationWindow';
import { HStack, Text, VerticalAlignments, VStack } from '~/src/ui';

function ModalComponent({ window }: ApplicationWindowProps) {
  const { file: modalId, id } = window;
  const modal = useCollectionItem<ModalType, ModalState>(
    modalStore,
    'all',
    modalId,
  );
  const desktopSize = useSelector(windowStore, windowGetDesktopSize);

  useEffect(() => {
    if (!modal) {
      return;
    }

    windowConfigure(id, {
      initialPosition: { x: 0.5, y: 0.5 },
      minimumSize: {
        width: Math.min(360, desktopSize.width),
        height: null,
      },
      title: modal?.title,
    });
  }, [desktopSize.width, id, modal]);

  const handleAction = useCallback(
    (action: string) => () => {
      if (modalId) {
        modalAction(modalId, action);
      }
    },
    [modalId],
  );

  if (!modal) {
    return null;
  }

  const { actions, content, icon } = modal;
  return (
    <VStack padding={PaddingValues.xLarge}>
      <HStack selfAlignment={VerticalAlignments.stretch}>
        {icon && (
          <Icon
            icon={icon}
            marginTrailing={PaddingValues.xLarge}
            selfAlignment={VerticalAlignments.top}
            size={IconSizes.large}
          />
        )}
        <Text>{nl2br(content)}</Text>
      </HStack>
      <HStack paddingTop={PaddingValues.xxLarge} spacing={PaddingValues.large}>
        {actions.map(([label, command], index) => (
          <Button
            key={command + index}
            onPress={handleAction(command)}
            paddingBottom={Scale * 2}
            paddingLeading={Scale * 10}
            paddingTop={Scale * 2}
            paddingTrailing={Scale * 10}
            width={Scale * 60}
          >
            {label}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
}

export const Modal = memo(ModalComponent);
