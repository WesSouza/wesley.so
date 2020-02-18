import { Dictionary } from '~/src/constants/CommonTypes';

import { mapStatus, mapUser } from '../data/apiMaps';
import {
  TwitterStatus,
  TwitterUser,
  TwitterUserWithStatuses,
} from '../data/types';
import { getTwitterClient } from './client';

export async function getUserWithStatuses(
  username: string,
): Promise<TwitterUserWithStatuses> {
  const client = getTwitterClient();

  if (typeof username !== 'string') {
    throw new Error('username is not a string');
  }

  const apiUser = await client.get('users/show', {
    screen_name: username,
  });
  const apiUserTimeline = await client.get('statuses/user_timeline', {
    count: 50,
    exclude_replies: true,
    screen_name: username,
    tweet_mode: 'extended',
  });

  const currentUser = mapUser(apiUser);
  const usersDictionary: Dictionary<TwitterUser> = {
    [currentUser.id]: currentUser,
  };
  const statusesDictionary: Dictionary<TwitterStatus> = {};

  currentUser.statusIds = { list: [], totalCount: 0 };
  apiUserTimeline.forEach((apiStatus) => {
    const { retweeted_status, user } = apiStatus;
    if (retweeted_status) {
      if (!usersDictionary[retweeted_status.user.id_str]) {
        usersDictionary[retweeted_status.user.id_str] = mapUser(
          retweeted_status.user,
        );
      }
    }

    if (!usersDictionary[user.id_str]) {
      usersDictionary[user.id_str] = mapUser(user);
    }

    statusesDictionary[apiStatus.id_str] = mapStatus(apiStatus);
    currentUser.statusIds?.list.push(apiStatus.id_str);
  });

  return {
    statusesDictionary,
    userId: currentUser.id,
    usersDictionary,
  };
}
