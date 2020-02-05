import React, { useCallback, useRef } from 'react';

import { ObjectRect } from '~/src/constants/CommonTypes';
import { Icons, IconSizes, IconSrcs } from '~/src/constants/Icons';
import { Colors, Scale } from '~/src/constants/Styles';
import { Symbols } from '~/src/constants/Symbols';
import { Divider, HStack, Pressable, Spacer, Text, Themes } from '~/src/ui';
import { getOffsetRect } from '~/src/utils/dom';

import { Icon } from './Icon';
import { Label } from './Label';
import { MenuTree } from './Menu';
import { Symbol } from './Symbol';

function isIcon(
  iconOrString: string | Icons | undefined,
): iconOrString is Icons {
  return iconOrString ? iconOrString in IconSrcs : false;
}

interface Props {
  active: boolean;
  menuItem: MenuTree | null;
  onHover: (options: {
    hovering: boolean;
    menu: MenuTree | null;
    rect: ObjectRect;
  }) => void;
  onSelect: (options: { menu: MenuTree | null; rect: ObjectRect }) => void;
  windowMenu?: boolean;
}

export function MenuItem({
  active,
  menuItem,
  onHover,
  onSelect,
  windowMenu,
}: Props) {
  const elementRef = useRef<HTMLButtonElement>(null);

  const handlePointerEnter = useCallback(() => {
    if (!elementRef.current) {
      return;
    }

    onHover({
      hovering: true,
      menu: menuItem,
      rect: getOffsetRect(elementRef.current),
    });
  }, [menuItem, onHover]);

  const handlePointerLeave = useCallback(() => {
    if (!elementRef.current) {
      return;
    }

    onHover({
      hovering: false,
      menu: menuItem,
      rect: getOffsetRect(elementRef.current),
    });
  }, [menuItem, onHover]);

  const handlePress = useCallback(() => {
    if (!elementRef.current) {
      return;
    }

    onSelect({
      menu: menuItem,
      rect: getOffsetRect(elementRef.current),
    });
  }, [menuItem, onSelect]);

  let disabled = false;

  if (menuItem === null) {
    active = false;
    disabled = true;
    menuItem = ['(Empty)', ''];
  }

  if (menuItem.length === 1) {
    return <Divider />;
  }

  const [label, subMenu, shortcutOrIcon] = menuItem;
  const activeOrHover = active;
  const hasSubMenuGlyph = !windowMenu && Array.isArray(subMenu);
  const icon = isIcon(shortcutOrIcon);

  if (subMenu === 'disabled') {
    disabled = true;
  }

  return (
    <Pressable
      paddingBottom={Scale}
      nativeRef={elementRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPress={handlePress}
      theme={disabled ? Themes.disabled : undefined}
    >
      <HStack
        backgroundColor={activeOrHover ? Colors.blue : undefined}
        foregroundColor={activeOrHover && !disabled ? Colors.white : undefined}
        paddingBottom={Scale * (windowMenu ? 0 : 2)}
        paddingLeading={Scale * 6}
        paddingTop={Scale * (windowMenu ? 2 : 2)}
        paddingTrailing={Scale * 6}
      >
        {shortcutOrIcon && icon ? (
          <Icon
            icon={shortcutOrIcon as Icons}
            marginTrailing={Scale * 5}
            size={IconSizes.small}
          />
        ) : !windowMenu ? (
          <Spacer minLength={Scale * 12} />
        ) : null}
        <Label>{label}</Label>
        <Spacer />
        {!icon && shortcutOrIcon && (
          <Text marginLeading={Scale * 20}>{shortcutOrIcon}</Text>
        )}
        {hasSubMenuGlyph ? (
          <Symbol marginLeading={Scale * 12} symbol={Symbols.chevronRight} />
        ) : !windowMenu ? (
          <Spacer minLength={Scale * 12} />
        ) : null}
      </HStack>
    </Pressable>
  );
}
