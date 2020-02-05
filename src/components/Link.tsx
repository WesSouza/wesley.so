import React, { ReactNode, useCallback } from 'react';

import { ReactRefProp } from '~/src/constants/CommonTypes';
import { windowOpenUrl } from '~/src/state';
import { Pressable, Themes, ViewProps } from '~/src/ui';

interface Props extends ViewProps {
  children?: ReactNode;
  nativeRef?: ReactRefProp<HTMLAnchorElement>;
  url: string;
}

export function Link({ children, nativeRef, url, ...props }: Props) {
  const onPress = useCallback(() => {
    windowOpenUrl(url);
  }, [url]);

  return (
    <Pressable
      link
      nativeRef={nativeRef}
      theme={Themes.link}
      onPress={onPress}
      {...props}
    >
      {children}
    </Pressable>
  );
}
