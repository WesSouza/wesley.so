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
import { useCached } from '~/src/hooks/useCache';
import {
  modalOpen,
  windowClose,
  windowConfigure,
  windowOpenUrl,
  windowSetTitle,
} from '~/src/state';
import { ApplicationWindowProps } from '~/src/system/ApplicationWindow';
import {
  Cursors,
  Grid,
  HorizontalAlignments,
  HStack,
  Image,
  Pressable,
  Text,
  Themes,
  VStack,
} from '~/src/ui';
import { panic } from '~/src/utils/errors';
import { WesURL } from '~/src/utils/WesURL';

import { InstagramUserWithMedia } from '../data/types';
import { getImageUrlForThumbnail } from '../utils/media';

interface Props extends ApplicationWindowProps {
  username: string;
}

function UserComponent({ username, window }: Props) {
  const { id } = window;

  useEffect(() => {
    windowConfigure(id, {
      icon: Icons.iconInstagram,
      initialSize: { width: 320, height: 400 },
      minimizable: true,
      resizable: true,
      minimumSize: { width: 320, height: 200 },
      title: 'Instagram',
    });
  }, [id]);

  const handleMenuSelect = useCallback(
    (action: string | null) => {
      switch (action) {
        case 'file.open':
          windowOpenUrl('instagram:/user/open');
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

  const { data, loading } = useApiRead<InstagramUserWithMedia>(
    `/instagram/user/${username}`,
    { onError: panic },
  );

  useEffect(() => {
    windowSetTitle(id, `${username} - Instagram`);
  }, [id, username]);

  const { set: setCachedUserWithMedia } = useCached(`instagram.${username}`);

  useEffect(() => {
    setCachedUserWithMedia(data);
  }, [data, setCachedUserWithMedia]);

  const handleMediaPress = useCallback(
    (mediaCode: string) => () => {
      const url = new WesURL('instagram:/user/media');
      url.searchParams.set('mediaCode', mediaCode);
      url.searchParams.set('username', username);
      windowOpenUrl(String(url));
    },
    [username],
  );

  const renderMenu = useCallback(
    () => (
      <WindowMenu
        menu={[
          ['&File', [['&Open...', 'file.open'], ['-'], ['E&xit', 'exit']]],
          ['&Help', [['&About Instagram', 'disabled']]],
        ]}
        onMenuSelect={handleMenuSelect}
      />
    ),
    [handleMenuSelect],
  );

  if (loading) {
    return (
      <>
        {renderMenu()}
        <HStack
          cursor={Cursors.wait}
          paddingLeading={PaddingValues.medium}
          paddingTrailing={PaddingValues.medium}
          shrink={0}
          spacing={PaddingValues.large}
        >
          <HStack
            backgroundColor={Colors.white}
            height={Scale * 32}
            shrink={0}
            theme={Themes.frameInset}
            width={Scale * 32}
          ></HStack>
          <VStack grow={1} width="33%">
            <Text bold>&nbsp;</Text>
            <Text fontSize={FontSizes.half}>Posts</Text>
          </VStack>
          <VStack grow={1} width="33%">
            <Text bold>&nbsp;</Text>
            <Text fontSize={FontSizes.half}>Followers</Text>
          </VStack>
          <VStack grow={1} width="33%">
            <Text bold>&nbsp;</Text>
            <Text fontSize={FontSizes.half}>Following</Text>
          </VStack>
        </HStack>
        <VStack
          alignment={HorizontalAlignments.leading}
          cursor={Cursors.wait}
          fontSize={FontSizes.small}
          padding={PaddingValues.medium}
          shrink={0}
        >
          <Text bold>&nbsp;</Text>
          <Text nl2br>&nbsp;</Text>
        </VStack>
        <VStack
          alignment={HorizontalAlignments.stretch}
          cursor={Cursors.wait}
          grow={1}
          theme={Themes.frameInset}
          yScroll
        >
          <Grid columns={3} shrink={0} spacing={Scale * 1} />
        </VStack>
      </>
    );
  }

  if (!data) {
    return null;
  }

  const { user, media } = data;

  return (
    <>
      {renderMenu()}
      <HStack
        paddingLeading={PaddingValues.medium}
        paddingTrailing={PaddingValues.medium}
        shrink={0}
        spacing={PaddingValues.large}
      >
        <HStack theme={Themes.frameInset}>
          <Image
            height={Scale * 32}
            posterize
            src={user.imageUrl}
            width={Scale * 32}
          />
        </HStack>
        <VStack grow={1} width="33%">
          <Text bold>{user.mediaCount}</Text>
          <Text fontSize={FontSizes.half}>Posts</Text>
        </VStack>
        <VStack grow={1} width="33%">
          <Text bold>{user.followerCount}</Text>
          <Text fontSize={FontSizes.half}>Followers</Text>
        </VStack>
        <VStack grow={1} width="33%">
          <Text bold>{user.followingCount}</Text>
          <Text fontSize={FontSizes.half}>Following</Text>
        </VStack>
      </HStack>
      <VStack
        alignment={HorizontalAlignments.leading}
        fontSize={FontSizes.small}
        padding={PaddingValues.medium}
        shrink={0}
      >
        <Text bold>{user.fullName}</Text>
        <Text nl2br>{user.biography}</Text>
      </VStack>
      <VStack
        alignment={HorizontalAlignments.stretch}
        grow={1}
        theme={Themes.frameInset}
        yScroll
      >
        <Grid columns={3} shrink={0} spacing={Scale * 1}>
          {media.map((media) => (
            <Pressable
              cursor={Cursors.pointer}
              key={media.code}
              onPress={handleMediaPress(media.code)}
            >
              <Image
                aspectRatio={1}
                posterize
                src={getImageUrlForThumbnail(media)}
                width="100%"
              />
            </Pressable>
          ))}
        </Grid>
      </VStack>
    </>
  );
}

export const User = memo(UserComponent);
