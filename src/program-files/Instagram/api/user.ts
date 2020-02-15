import { mapMedia, mapUserDetail } from '../data/apiMaps';
import { getInstagramClient } from './client';

export async function getUserWithMedia(username: string) {
  const instagram = await getInstagramClient();

  const userId = await instagram.user.getIdByUsername(username);
  const userDetails = await instagram.user.info(userId);

  const userFeed = instagram.feed.user(userId);
  const feedData = await userFeed.items();

  return {
    media: feedData.map(mapMedia),
    user: mapUserDetail(userDetails),
  };
}
