import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { MenuTree } from '~/src/components';
import { ObjectRect } from '~/src/constants/CommonTypes';

export function useMenu({
  activateOnHoverDelay = 520,
  menu,
  onMenuItemSelect,
  windowMenu,
}: {
  activateOnHoverDelay?: number;
  menu?: MenuTree[];
  onMenuItemSelect?: (action: string | null) => void;
  windowMenu?: boolean;
} = {}) {
  const [activeMenu, setActiveMenu] = useState<MenuTree | null>(null);
  const [visuallyActiveMenu, setVisuallyActiveMenu] = useState<MenuTree | null>(
    null,
  );
  const [subMenu, setSubMenu] = useState<MenuTree[] | null>(null);
  const [subMenuOpenerRect, setSubMenuOpenerRect] = useState<ObjectRect | null>(
    null,
  );
  const activateOnHoverTimer = useRef<number | undefined>(undefined);

  const handleCancel = useCallback(() => {
    setActiveMenu(null);
    setVisuallyActiveMenu(null);
    setSubMenu(null);
    setSubMenuOpenerRect(null);
  }, [setActiveMenu, setSubMenu, setSubMenuOpenerRect]);

  useLayoutEffect(() => {
    handleCancel();
  }, [handleCancel, menu]);

  const handleSelect = useCallback(
    ({ menu, rect }: { menu: MenuTree | null; rect: ObjectRect }) => {
      if (activeMenu === menu || !menu) {
        handleCancel();
        return;
      }

      if (Array.isArray(menu[1])) {
        setActiveMenu(menu);
        setVisuallyActiveMenu(menu);
        setSubMenu(menu[1]);
        setSubMenuOpenerRect(rect);
        return;
      }

      if (typeof menu[1] === 'string') {
        handleCancel();
        onMenuItemSelect?.(menu[1]);
      }
    },
    [activeMenu, handleCancel, onMenuItemSelect],
  );

  const handleHover = useCallback(
    ({
      hovering,
      menu,
      rect,
    }: {
      hovering: boolean;
      menu: MenuTree | null;
      rect: ObjectRect;
    }) => {
      window.clearTimeout(activateOnHoverTimer.current);

      if (hovering && (!windowMenu || (windowMenu && activeMenu))) {
        setVisuallyActiveMenu(menu);

        activateOnHoverTimer.current = window.setTimeout(() => {
          if (menu === activeMenu) {
            return;
          }

          if (menu && Array.isArray(menu[1])) {
            handleSelect({ menu, rect });
            return;
          }

          setActiveMenu(null);
          setSubMenu(null);
          setSubMenuOpenerRect(null);
        }, activateOnHoverDelay);
        return;
      }

      setVisuallyActiveMenu(activeMenu);
    },
    [activateOnHoverDelay, activeMenu, handleSelect, windowMenu],
  );

  const handlePointerLeave = useCallback(() => {
    if (!subMenu) {
      setVisuallyActiveMenu(null);
    }
  }, [subMenu]);

  useEffect(
    () => () => {
      window.clearTimeout(activateOnHoverTimer.current);
    },
    [],
  );

  return {
    activeMenu: visuallyActiveMenu,
    subMenu,
    subMenuOpenerRect,
    handleCancel,
    handleHover,
    handlePointerLeave,
    handleSelect,
  };
}
