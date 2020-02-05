import React, { useCallback, useRef } from 'react';

import { Scale, ZIndexes } from '~/src/constants/Styles';
import { useClickOutside } from '~/src/hooks/useClickOutside';
import { useMenu } from '~/src/hooks/useMenu';
import { HStack } from '~/src/ui';

import { Menu, MenuDirections, MenuTree } from './Menu';
import { MenuItem } from './MenuItem';

interface Props {
  menu: MenuTree[];
  onMenuSelect: (action: string | null) => void;
}

export function WindowMenu({ menu, onMenuSelect }: Props) {
  const handleCancelRef = useRef<(() => void) | null>(null);

  const handleMenuSelect = useCallback(
    (action: string | null) => {
      handleCancelRef.current?.();
      onMenuSelect(action);
    },
    [onMenuSelect],
  );

  const {
    activeMenu,
    subMenu,
    subMenuOpenerRect,
    handleCancel,
    handleHover,
    handleSelect,
  } = useMenu({
    activateOnHoverDelay: 0,
    menu,
    onMenuItemSelect: handleMenuSelect,
    windowMenu: true,
  });
  handleCancelRef.current = handleCancel;

  const { elementRef } = useClickOutside<HTMLDivElement>({
    onClickOutside: handleCancelRef.current,
  });

  const renderMenu = useCallback(
    (menuItem: MenuTree, index: number) => {
      return (
        <MenuItem
          active={menuItem === activeMenu}
          key={menuItem[0] + index}
          menuItem={menuItem}
          onHover={handleHover}
          onSelect={handleSelect}
          windowMenu
        />
      );
    },
    [activeMenu, handleHover, handleSelect],
  );

  return (
    <HStack
      nativeRef={elementRef}
      padding={Scale}
      shrink={0}
      zIndex={ZIndexes.windowMenus}
    >
      {menu.map(renderMenu)}
      {subMenu && (
        <Menu
          direction={MenuDirections.vertical}
          menu={subMenu}
          onMenuSelect={handleMenuSelect}
          openerRect={subMenuOpenerRect}
        ></Menu>
      )}
    </HStack>
  );
}
