import React, { memo, useCallback, useEffect } from 'react';

import { WindowMenu } from '~/src/components';
import { Icons } from '~/src/constants/Icons';
import {
  Colors,
  FontSizes,
  PaddingValues,
  Scale,
} from '~/src/constants/Styles';
import { useApiRead } from '~/src/hooks/useApi';
import { useSelector } from '~/src/hooks/useSelector';
import {
  modalOpen,
  windowClose,
  windowConfigure,
  windowGetSmallScreen,
  windowOpenUrl,
  windowSetTitle,
  windowStore,
} from '~/src/state';
import { ApplicationWindowProps } from '~/src/system/ApplicationWindow';
import {
  Cursors,
  HorizontalAlignments,
  HStack,
  Image,
  Text,
  Themes,
  VStack,
} from '~/src/ui';
import { panic } from '~/src/utils/errors';

import { Tweet } from '../components/Tweet';
import { TwitterUserWithStatuses } from '../data/types';

interface Props extends ApplicationWindowProps {
  username: string;
}

function UserComponent({ username, window }: Props) {
  const { id } = window;

  const smallScreen = useSelector(windowStore, windowGetSmallScreen);

  useEffect(() => {
    const smallSize = { width: 320, height: 500 };
    const largeSize = { width: 420, height: 800 };
    const size = smallScreen ? smallSize : largeSize;
    windowConfigure(id, {
      icon: Icons.iconTwitter,
      initialSize: size,
      minimizable: true,
      minimumSize: smallSize,
      resizable: true,
      title: 'Twitter',
    });
  }, [id, smallScreen]);

  const handleMenuSelect = useCallback(
    (action: string | null) => {
      switch (action) {
        case 'file.open':
          windowOpenUrl('twitter:/user/open');
          return;

        case 'exit':
          windowClose(id);
          return;
      }

      modalOpen({
        actions: [['Ok', 'close']],
        content: "I'm still developing this, please try again next week.",
        icon: Icons.dialogWarning,
        title: 'Oh no',
      });
    },
    [id],
  );

  const { data, loading } = useApiRead<TwitterUserWithStatuses>(
    `/twitter/user/${username}`,
    { onError: panic },
  );

  useEffect(() => {
    windowSetTitle(id, `@${username} - Twitter`);
  }, [id, username]);

  const user = data?.usersDictionary[data.userId];

  return (
    <>
      <WindowMenu
        menu={[
          ['&File', [['&Open...', 'file.open'], ['-'], ['E&xit', 'exit']]],
          ['&Help', [['&About Twitter', 'disabled']]],
        ]}
        onMenuSelect={handleMenuSelect}
      />
      {user?.backgroundImageUrl ? (
        <Image
          height={Scale * 64}
          posterize
          src={user.backgroundImageUrl}
          theme={Themes.frameInset}
          width="100%"
        />
      ) : (
        <VStack
          cursor={loading ? Cursors.wait : undefined}
          height={Scale * 64}
          theme={Themes.frameInset}
          width="100%"
        />
      )}

      <HStack shrink={0} zIndex={2}>
        <HStack
          cursor={loading ? Cursors.wait : undefined}
          height={Scale * 32}
          marginTop={Scale * -16}
          marginLeading={PaddingValues.medium}
          shrink={0}
          theme={Themes.frame}
          width={Scale * 32}
        >
          {user?.imageUrl ? <Image posterize src={user?.imageUrl} /> : null}
        </HStack>
        <Text
          bold
          marginLeading={PaddingValues.medium}
          marginTop={PaddingValues.small}
        >
          {user?.name}
        </Text>
      </HStack>
      <VStack
        alignment={HorizontalAlignments.leading}
        fontSize={FontSizes.small}
        padding={PaddingValues.medium}
        shrink={0}
        spacing={PaddingValues.medium}
      >
        {user ? (
          <>
            <Text>{user?.description}</Text>
            <Text>
              <Text bold>{user?.followingCount}</Text> Following{' '}
              <Text bold>{user?.followerCount}</Text> Followers
            </Text>
          </>
        ) : null}
      </VStack>
      <VStack
        alignment={HorizontalAlignments.stretch}
        backgroundColor={Colors.gray}
        cursor={loading ? Cursors.wait : undefined}
        fontSize={FontSizes.small}
        grow={1}
        padding={PaddingValues.medium}
        spacing={PaddingValues.medium}
        theme={Themes.frameInset}
        yScroll
      >
        {data && user?.statusIds
          ? user.statusIds.list.map((statusId: string) => (
              <Tweet
                key={statusId}
                id={statusId}
                statusesDictionary={data.statusesDictionary}
                usersDictionary={data.usersDictionary}
              />
            ))
          : null}
      </VStack>
    </>
  );
}

export const User = memo(UserComponent);
