import React, { memo, useCallback, useEffect } from 'react';

import { Button } from '~/src/components';
import { Icons } from '~/src/constants/Icons';
import {
  Colors,
  FontSizes,
  PaddingValues,
  Scale,
} from '~/src/constants/Styles';
import { useCached } from '~/src/hooks/useCache';
import { windowConfigure, windowSetTitle } from '~/src/state';
import { ApplicationWindowProps } from '~/src/system/ApplicationWindow';
import {
  HorizontalAlignments,
  HStack,
  Image,
  Text,
  Themes,
  VStack,
} from '~/src/ui';
import { panic } from '~/src/utils/errors';

import { InstagramUserWithMedia } from '../data/types';
import { getImageUrlForLarge } from '../utils/media';

interface Props extends ApplicationWindowProps {
  mediaCode: string;
  username: string;
}

function MediaComponent({ mediaCode, username, window }: Props) {
  const { id } = window;
  const mediaUrl = `https://www.instagram.com/p/${mediaCode}/`;

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

  useEffect(() => {
    windowSetTitle(id, `Media - ${username} - Instagram`);
  }, [id, username]);

  const handleOpen = useCallback(() => {
    globalThis.open(mediaUrl, '_blank');
  }, [mediaUrl]);

  const handleShare = useCallback(() => {
    if (typeof navigator.share === 'function') {
      navigator.share({
        url: mediaUrl,
      });
    } else {
      globalThis.open(mediaUrl, '_blank');
    }
  }, [mediaUrl]);

  const { get: getCachedUserWithMedia } = useCached<InstagramUserWithMedia>(
    `instagram.${username}`,
  );

  const cachedUserWithMedia = getCachedUserWithMedia();

  if (!cachedUserWithMedia) {
    panic(new Error(`No data found for user ${username}`));
    return null;
  }

  const { media: mediaItems, user } = cachedUserWithMedia;
  const media = mediaItems.find((mediaItem) => mediaItem.code === mediaCode);

  if (!media) {
    panic(new Error(`Media ${mediaCode} not found`));
    return null;
  }

  return (
    <>
      <HStack
        padding={PaddingValues.medium}
        shrink={0}
        spacing={PaddingValues.large}
      >
        <HStack theme={Themes.frameInset}>
          <Image
            height={Scale * 16}
            posterize
            src={user.imageUrl}
            width={Scale * 16}
          />
        </HStack>
        <VStack>
          <Text bold fontSize={FontSizes.small}>
            {user.username}
          </Text>
        </VStack>
      </HStack>
      <VStack
        alignment={HorizontalAlignments.stretch}
        backgroundColor={Colors.gray}
        grow={1}
        theme={Themes.frameInset}
        yScroll
      >
        <Image posterize src={getImageUrlForLarge(media)} width={'100%'} />
        <VStack
          alignment={HorizontalAlignments.stretch}
          shrink={0}
          padding={PaddingValues.medium}
          spacing={PaddingValues.medium}
        >
          <HStack
            fontSize={FontSizes.small}
            shrink={0}
            spacing={PaddingValues.medium}
          >
            <Button onPress={handleOpen} padding={PaddingValues.medium}>
              Like
            </Button>
            <Button onPress={handleOpen} padding={PaddingValues.medium}>
              Comment
            </Button>
            <Button onPress={handleShare} padding={PaddingValues.medium}>
              Share
            </Button>
          </HStack>
          <Text shrink={0} nl2br>
            <Text bold>{user.username}</Text> {media.captionText}
          </Text>
        </VStack>
      </VStack>
    </>
  );
}

export const Media = memo(MediaComponent);
