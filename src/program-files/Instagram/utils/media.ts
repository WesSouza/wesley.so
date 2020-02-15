import { InstagramMedia } from '../data/types';

export function getImageUrlForLarge(media: InstagramMedia): string {
  return `https://www.instagram.com/p/${encodeURIComponent(
    media.code,
  )}/media/?size=l`;
}

export function getImageUrlForThumbnail(media: InstagramMedia): string {
  return `https://www.instagram.com/p/${encodeURIComponent(
    media.code,
  )}/media/?size=t`;
}
