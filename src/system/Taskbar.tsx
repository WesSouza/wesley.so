import React from 'react';

import { Scale, ZIndexes } from '~/src/constants/Styles';
import { useSelector } from '~/src/hooks/useSelector';
import { windowGetAll, windowGetFocusedId, windowStore } from '~/src/state';
import { HStack, Spacer, Themes, VerticalAlignments } from '~/src/ui';

import { StartMenu } from './StartMenu';
import { SysTray } from './SysTray';
import { TaskbarItem } from './TaskbarItem';

interface Props {}

export function Taskbar({}: Props) {
  const focusedId = useSelector(windowStore, windowGetFocusedId);
  const windows = useSelector(windowStore, windowGetAll);

  const taskbarComponents: JSX.Element[] = [];
  windows.forEach((window) => {
    taskbarComponents.push(
      <TaskbarItem
        focused={focusedId === window.id}
        key={window.id}
        window={window}
      />,
    );
  });

  return (
    <>
      <HStack
        alignment={VerticalAlignments.top}
        shrink={0}
        spacing={Scale * 2}
        paddingTop={Scale * 1}
        theme={Themes.frameTop}
        width="100%"
        zIndex={ZIndexes.taskbar}
      >
        <StartMenu />
        <HStack grow={0} spacing={Scale * 2} wrap>
          {taskbarComponents}
        </HStack>
        <Spacer />
        <SysTray />
      </HStack>
    </>
  );
}
