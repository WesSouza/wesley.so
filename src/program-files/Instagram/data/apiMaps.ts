import {
  UserFeedResponseItemsItem,
  UserFeedResponseUser,
  UserRepositoryInfoResponseUser,
} from 'instagram-private-api';

import {
  InstagramMedia,
  InstagramUser,
  InstagramUserDetail,
} from '../data/types';

export function mapMedia(media: UserFeedResponseItemsItem): InstagramMedia {
  const mainImage = media.carousel_media
    ? media.carousel_media[0].image_versions2
    : media.image_versions2;

  return {
    captionText: media.caption?.text ?? null,
    carouselImages:
      media.carousel_media?.map(carouselMedia => ({
        image: carouselMedia.image_versions2.candidates,
      })) ?? [],
    code: media.code,
    commentCount: media.comment_count,
    createdAt: media.caption?.created_at ?? null,
    image: mainImage.candidates ?? [],
    videos: media.video_versions ?? [],
    likeCount: media.like_count,
    user: media.caption ? mapUser(media.caption.user) : null,
  };
}

export function mapUser(user: UserFeedResponseUser): InstagramUser {
  return {
    id: user.pk,
    imageUrl: user.profile_pic_url,
    username: user.username,
  };
}

export function mapUserDetail(
  user: UserRepositoryInfoResponseUser,
): InstagramUserDetail {
  return {
    biography: user.biography,
    followerCount: user.follower_count,
    followingCount: user.following_count,
    fullName: user.full_name,
    id: user.pk,
    imageUrl: user.profile_pic_url,
    mediaCount: user.media_count,
    username: user.username,
  };
}
