import { Dictionary, Paginated } from '~/src/constants/CommonTypes';

export interface TwitterUserWithStatuses {
  userId: string;
  usersDictionary: Dictionary<TwitterUser>;
  statusesDictionary: Dictionary<TwitterStatus>;
}

export interface TwitterStatus {
  createdAt: number;
  entities: TwitterEntities[];
  id: string;
  likeCount: number;
  replyCount: number;
  retweetCount: number;
  retweetedByUserId: string | null;
  text: string;
  userId: string;
}

export interface TwitterEntities {
  label: string | null;
  length: number;
  resource: string;
  startIndex: number;
  type: 'hashtag' | 'media' | 'symbol' | 'url' | 'userMention';
}

export interface TwitterUser {
  backgroundImageUrl: string | null;
  description: string;
  entities: TwitterEntities[];
  followerCount: number;
  followingCount: number;
  id: string;
  imageUrl: string;
  name: string;
  statusCount: number;
  statusIds: Paginated<string> | null;
  username: string;
}
