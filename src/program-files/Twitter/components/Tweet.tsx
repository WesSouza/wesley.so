import React, { memo } from 'react';

import { Symbol } from '~/src/components';
import { Dictionary } from '~/src/constants/CommonTypes';
import { Colors, PaddingValues, Scale } from '~/src/constants/Styles';
import { Symbols } from '~/src/constants/Symbols';
import {
  HorizontalAlignments,
  HStack,
  Image,
  Spacer,
  Text,
  Themes,
  VerticalAlignments,
  VStack,
} from '~/src/ui';

import { TwitterStatus, TwitterUser } from '../data/types';
import { Media } from './Media';
import { TextWithEntities } from './TextWithEntities';

interface Props {
  id: string;
  statusesDictionary: Dictionary<TwitterStatus>;
  usersDictionary: Dictionary<TwitterUser>;
}

function TweetComponent({ id, statusesDictionary, usersDictionary }: Props) {
  const status = statusesDictionary[id];
  const {
    entities,
    likeCount,
    retweetCount,
    retweetedByUserId,
    text,
    userId,
  } = status;
  const { name, username, imageUrl } = usersDictionary[userId];

  const retweetedByUserName = retweetedByUserId
    ? usersDictionary[retweetedByUserId].name
    : null;

  return (
    <VStack
      alignment={HorizontalAlignments.stretch}
      backgroundColor={Colors.white}
      shrink={0}
      theme={Themes.frameThin}
    >
      {retweetedByUserName && (
        <HStack
          alignment={VerticalAlignments.top}
          paddingTop={PaddingValues.large}
          marginLeading={PaddingValues.large * 2 + Scale * 32}
          shrink={0}
          spacing={PaddingValues.medium}
          foregroundColor={Colors.darkGray}
        >
          <Symbol symbol={Symbols.twitterRetweet} />
          <Text>{retweetedByUserName} Retweeted</Text>
        </HStack>
      )}

      <HStack
        alignment={VerticalAlignments.top}
        padding={PaddingValues.large}
        shrink={1}
        spacing={PaddingValues.large}
      >
        <Image
          height={Scale * 32}
          posterize
          shrink={0}
          src={imageUrl}
          width={Scale * 32}
        />

        <VStack
          alignment={HorizontalAlignments.leading}
          grow={1}
          shrink={1}
          spacing={PaddingValues.large}
        >
          <Text>
            <Text bold>{name}</Text> @{username} &sdot; -
          </Text>

          {text && (
            <HStack>
              <TextWithEntities entities={entities} text={text} />
            </HStack>
          )}

          {entities ? <Media entities={entities} /> : null}

          <HStack spacing={PaddingValues.medium}>
            <Symbol symbol={Symbols.twitterRetweet} />
            <Text>{retweetCount}</Text>
            <Spacer minLength={PaddingValues.medium} />
            <Symbol symbol={Symbols.twitterLike} />
            <Text>{likeCount}</Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}

export const Tweet = memo(TweetComponent);
