import {
  TwitterApiEntities,
  TwitterApiExtendedEntities,
  TwitterApiStatusExtended,
  TwitterApiUser,
} from 'twitter-lite';
import { modifyIndicesFromUnicodeToUTF16 } from 'twitter-text';

import { TwitterEntities, TwitterStatus, TwitterUser } from './types';

export function mapEntities(
  text: string,
  entities: TwitterApiEntities,
  extendedEntities?: TwitterApiExtendedEntities,
): TwitterEntities[] {
  const mappedEntities: TwitterEntities[] = [];

  if (entities.hashtags) {
    modifyIndicesFromUnicodeToUTF16(text, entities.hashtags);
    entities.hashtags.forEach(hashtag => {
      mappedEntities.push({
        label: `#${hashtag.text}`,
        length: hashtag.indices[1] - hashtag.indices[0],
        resource: hashtag.text,
        startIndex: hashtag.indices[0],
        type: 'hashtag',
      });
    });
  }

  if (entities.media && !extendedEntities?.media) {
    modifyIndicesFromUnicodeToUTF16(text, entities.media);
    entities.media.forEach(media => {
      mappedEntities.push({
        label: null,
        length: media.indices[1] - media.indices[0],
        startIndex: media.indices[0],
        type: 'media',
        resource: media.media_url_https,
      });
    });
  }

  if (entities.urls) {
    modifyIndicesFromUnicodeToUTF16(text, entities.urls);
    entities.urls.forEach(url => {
      mappedEntities.push({
        label: url.display_url,
        length: url.indices[1] - url.indices[0],
        startIndex: url.indices[0],
        type: 'url',
        resource: url.expanded_url,
      });
    });
  }

  if (entities.user_mentions) {
    modifyIndicesFromUnicodeToUTF16(text, entities.user_mentions);
    entities.user_mentions.forEach(hashtag => {
      mappedEntities.push({
        label: `@${hashtag.screen_name}`,
        length: hashtag.indices[1] - hashtag.indices[0],
        startIndex: hashtag.indices[0],
        type: 'userMention',
        resource: hashtag.screen_name,
      });
    });
  }

  if (extendedEntities?.media) {
    modifyIndicesFromUnicodeToUTF16(text, extendedEntities.media);
    extendedEntities.media.forEach(media => {
      mappedEntities.push({
        label: null,
        length: media.indices[1] - media.indices[0],
        startIndex: media.indices[0],
        type: 'media',
        resource: media.media_url_https,
      });
    });
  }

  return mappedEntities.sort(
    (left, right) => left.startIndex - right.startIndex,
  );
}

export function mapStatus(status: TwitterApiStatusExtended): TwitterStatus {
  const statusOrRetweet = status.retweeted_status ?? status;

  return {
    createdAt: Date.parse(statusOrRetweet.created_at),
    entities: mapEntities(
      statusOrRetweet.full_text,
      statusOrRetweet.entities,
      statusOrRetweet.extended_entities,
    ),
    id: statusOrRetweet.id_str,
    likeCount: statusOrRetweet.favorite_count,
    replyCount: 0,
    retweetCount: statusOrRetweet.retweet_count,
    retweetedByUserId: status.retweeted_status ? status.user.id_str : null,
    text: statusOrRetweet.full_text,
    userId: statusOrRetweet.user.id_str,
  };
}

export function mapUser(user: TwitterApiUser): TwitterUser {
  return {
    backgroundImageUrl: user.profile_banner_url ?? null,
    description: user.description,
    entities: [],
    followerCount: user.followers_count,
    followingCount: user.friends_count,
    id: user.id_str,
    imageUrl: user.profile_image_url_https,
    name: user.name,
    statusCount: user.statuses_count,
    statusIds: null,
    username: user.screen_name,
  };
}
