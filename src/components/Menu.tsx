import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ObjectRect } from '~/src/constants/CommonTypes';
import { Icons } from '~/src/constants/Icons';
import { Scale } from '~/src/constants/Styles';
import { useHostSize } from '~/src/hooks/useHostSize';
import { useMenu } from '~/src/hooks/useMenu';
import { useSelector } from '~/src/hooks/useSelector';
import { windowGetSmallScreen, windowStore } from '~/src/state';
import { HorizontalAlignments, Themes, VStack } from '~/src/ui';
import { getBoundingClientRect } from '~/src/utils/dom';

import { MenuItem } from './MenuItem';

export type MenuTree =
  | [string, MenuTree[]]
  | [string, MenuTree[], Icons]
  | [string, string]
  | [string, string, string]
  | [string, string, Icons]
  | ['-'];

export enum MenuDirections {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

interface Props {
  direction: MenuDirections;
  menu: MenuTree[];
  onMenuSelect: (action: string | null) => void;
  openerRect: ObjectRect | null;
}

const DefaultHorizontalYOffset = Scale * -3;

export function Menu({ direction, menu, onMenuSelect, openerRect }: Props) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [invisible, setInvisible] = useState(true);
  const hostSize = useHostSize();
  const smallScreen = useSelector(windowStore, windowGetSmallScreen);

  const {
    activeMenu,
    subMenu,
    subMenuOpenerRect,
    handleHover,
    handlePointerLeave,
    handleSelect,
  } = useMenu({
    menu,
    onMenuItemSelect: onMenuSelect,
  });

  useEffect(() => {
    if (!elementRef.current || !openerRect) {
      return;
    }

    const menuRect = getBoundingClientRect(elementRef.current);
    let x = 0;
    let y = 0;
    const offsetX = menuRect.x - elementRef.current.offsetLeft;
    const offsetY = menuRect.y - elementRef.current.offsetTop;

    if (direction === MenuDirections.horizontal) {
      x = openerRect.x + openerRect.width;
      y = openerRect.y;
    } else {
      x = openerRect.x;
      y = openerRect.y + openerRect.height;
    }

    if (x + menuRect.width + offsetX > hostSize.width) {
      if (!smallScreen && direction === MenuDirections.horizontal) {
        x = openerRect.x - menuRect.width;
      } else {
        x = hostSize.width - menuRect.width - offsetX;
      }
    }
    if (y + menuRect.height + offsetY > hostSize.height) {
      if (direction === MenuDirections.horizontal) {
        y = hostSize.height - menuRect.height - offsetY;
      } else {
        y = openerRect.y - menuRect.height;
      }
    }
    if (direction === MenuDirections.horizontal) {
      y += DefaultHorizontalYOffset;
    }
    if (x + offsetX < 0) {
      x = -offsetX;
    }
    if (y + offsetY < 0) {
      y = -offsetY;
    }

    elementRef.current.style.top = `${y}px`;
    elementRef.current.style.left = `${x}px`;
    setInvisible(false);
  }, [direction, hostSize, openerRect, smallScreen]);

  const renderMenu = useCallback(
    (menuItem: MenuTree | null, index: number) => {
      const key = menuItem ? menuItem[0] + index : index;
      return (
        <MenuItem
          active={menuItem === activeMenu}
          key={key}
          menuItem={menuItem}
          onHover={handleHover}
          onSelect={handleSelect}
        />
      );
    },
    [activeMenu, handleHover, handleSelect],
  );

  return (
    <VStack
      alignment={HorizontalAlignments.stretch}
      invisible={invisible}
      nativeRef={elementRef}
      padding={Scale * 1}
      theme={Themes.frame}
      UNSTABLE_onPointerLeave={handlePointerLeave}
      x={0}
      y={0}
    >
      {menu.map(renderMenu)}
      {menu.length === 0 && renderMenu(null, 0)}
      {subMenu && (
        <Menu
          direction={MenuDirections.horizontal}
          menu={subMenu}
          onMenuSelect={onMenuSelect}
          openerRect={subMenuOpenerRect}
        ></Menu>
      )}
    </VStack>
  );
}
