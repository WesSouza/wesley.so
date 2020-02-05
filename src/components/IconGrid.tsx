import React from 'react';

import { Apps } from '~/src/constants/Apps';
import { Icons } from '~/src/constants/Icons';
import { modalOpen, windowOpen } from '~/src/state';
import { HorizontalAlignments, VStack } from '~/src/ui';

import { IconGridIcon } from './IconGridIcon';

interface Props {
  foregroundColor: string;
}

function handlePress() {
  modalOpen({
    actions: [['Ok', 'close']],
    content: "I'm still developing this, please try again next week.",
    icon: Icons.dialogWarning,
    title: 'Oh no',
  });
}

function handleHello() {
  windowOpen(Apps.notepad, 'Hello.txt');
}

function handleInternetExplorer() {
  windowOpen(Apps.iexplore);
}

export function IconGrid({ foregroundColor }: Props) {
  return (
    <VStack
      alignment={HorizontalAlignments.leading}
      foregroundColor={foregroundColor}
      wrap
    >
      <IconGridIcon
        action=""
        contextMenu={[]}
        icon={Icons.iconComputer}
        id="1"
        label="My Computer"
        onPress={handlePress}
      />
      <IconGridIcon
        action=""
        contextMenu={[]}
        icon={Icons.iconTrashEmpty}
        id="1"
        label="Recycle Bin"
        onPress={handlePress}
      />
      <IconGridIcon
        action=""
        contextMenu={[]}
        icon={Icons.iconIexplorer}
        id="1"
        label="Internet Explorer"
        onPress={handleInternetExplorer}
      />
      <IconGridIcon
        action=""
        contextMenu={[]}
        icon={Icons.fileTypeBriefcase}
        id="1"
        label="My Briefcase"
        onPress={handlePress}
      />
      <IconGridIcon
        action=""
        contextMenu={[]}
        icon={Icons.fileTypeText}
        id="1"
        label="Hello.txt"
        onPress={handleHello}
      />
    </VStack>
  );
}
