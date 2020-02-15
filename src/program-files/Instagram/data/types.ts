export interface InstagramUserWithMedia {
  media: InstagramMedia[];
  user: InstagramUserDetail;
}

export interface InstagramImage {
  height: number;
  url: string;
  width: number;
}

export interface InstagramGalleryImage {
  image: InstagramImage[];
}

export interface InstagramMedia {
  captionText: string | null;
  carouselImages: InstagramGalleryImage[];
  code: string;
  commentCount: number;
  createdAt: number | null;
  image: InstagramImage[];
  videos: InstagramVideo[];
  likeCount: number;
  user: InstagramUser | null;
}

export interface InstagramUser {
  id: number;
  imageUrl: string;
  username: string;
}

export interface InstagramUserDetail {
  biography: string;
  followerCount: number;
  followingCount: number;
  fullName: string;
  id: number;
  imageUrl: string;
  mediaCount: number;
  username: string;
}

export interface InstagramVideo {
  type: number;
  height: number;
  url: string;
  width: number;
}
