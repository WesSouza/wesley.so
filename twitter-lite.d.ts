declare module 'twitter-lite' {
  export default class Twitter {
    constructor(options: {
      access_token_key?: string;
      access_token_secret?: string;
      bearer_token?: string;
      consumer_key: string;
      consumer_secret: string;
      subdomain?: string;
      version?: string;
    });

    getBearerToken(): Promise<TwitterApiBearerTokenResponse>;
    getRequestToken(
      twitterCallbackUrl?: string,
    ): Promise<TwitterApiRequestTokenResponse>;
    getAccessToken(options: {
      key: string;
      secret: string;
      verifier: string;
    }): Promise<TwitterApiAccessTokenResponse>;

    get(resource: string, parameters: Record<string, string>): Promise<unknown>;
    get(
      resource: 'statuses/home_timeline',
      parameters: {
        since_id?: string;
        count?: number;
        max_id?: string;
        trim_user?: boolean;
        exclude_replies?: boolean;
        include_rts?: boolean;
        tweet_mode?: 'compat' | 'extended';
      },
    ): Promise<TwitterApiStatus[]>;
    get(
      resource: 'statuses/mentions_timeline',
      parameters: {
        since_id?: string;
        count?: number;
        max_id?: string;
        trim_user?: boolean;
        include_entities?: boolean;
        tweet_mode?: 'compat';
      },
    ): Promise<TwitterApiStatus[]>;
    get(
      resource: 'statuses/mentions_timeline',
      parameters: {
        since_id?: string;
        count?: number;
        max_id?: string;
        trim_user?: boolean;
        include_entities?: boolean;
        tweet_mode: 'extended';
      },
    ): Promise<TwitterApiStatusExtended[]>;
    get(
      resource: 'statuses/user_timeline',
      parameters: {
        user_id?: string;
        screen_name?: string;
        since_id?: string;
        count?: number;
        max_id?: string;
        trim_user?: boolean;
        exclude_replies?: boolean;
        include_rts?: boolean;
        tweet_mode?: 'compat';
      },
    ): Promise<TwitterApiStatus[]>;
    get(
      resource: 'statuses/user_timeline',
      parameters: {
        user_id?: string;
        screen_name?: string;
        since_id?: string;
        count?: number;
        max_id?: string;
        trim_user?: boolean;
        exclude_replies?: boolean;
        include_rts?: boolean;
        tweet_mode: 'extended';
      },
    ): Promise<TwitterApiStatusExtended[]>;
    get(
      resource: 'users/lookup',
      parameters: {
        user_id?: string;
        screen_name?: string;
        include_entities?: boolean;
        tweet_mode?: 'compat' | 'extended';
      },
    ): Promise<TwitterApiUser[]>;
    get(
      resource: 'users/search',
      parameters: {
        q?: string;
        page?: number;
        count?: number;
        include_entities?: boolean;
      },
    ): Promise<TwitterApiUser[]>;
    get(
      resource: 'users/show',
      parameters: {
        user_id?: string;
        screen_name?: string;
        include_entities?: boolean;
      },
    ): Promise<TwitterApiUser>;
  }

  interface Response {
    _headers: Record<string, string[]>;
  }

  export interface TwitterApiBearerTokenResponse extends Response {
    access_token: string;
    token_type: string;
  }

  export interface TwitterApiRequestTokenResponse {
    oauth_token: string;
    oauth_token_secret: string;
    oauth_callback_confirmed: string;
  }

  export interface TwitterApiAccessTokenResponse extends Response {
    oauth_token: string;
    oauth_token_secret: string;
    screen_name: string;
    user_id: string;
  }

  export interface TwitterApiStatus {
    contributors: unknown;
    coordinates: TwitterApiCoordinatesPoint | null;
    created_at: string;
    entities: TwitterApiEntities;
    extended_entities?: Pick<TwitterApiEntities, 'media'>;
    favorite_count: number;
    favorited: boolean;
    geo: unknown;
    id_str: string;
    id: number;
    in_reply_to_screen_name: string | null;
    in_reply_to_status_id_str: string | null;
    in_reply_to_status_id: number | null;
    in_reply_to_user_id_str: string | null;
    in_reply_to_user_id: number | null;
    is_quote_status: boolean;
    lang: string;
    place: TwitterApiPlace | null;
    possibly_sensitive_appealable?: boolean;
    possibly_sensitive?: boolean;
    quoted_status_id_str?: string;
    quoted_status_id?: number;
    quoted_status?: TwitterApiStatus;
    retweet_count: number;
    retweeted_status?: TwitterApiStatus;
    retweeted: boolean;
    source: string;
    text: string;
    truncated: boolean;
    user: TwitterApiUser;
  }

  export type TwitterApiStatusExtended = Omit<TwitterApiStatus, 'text'> & {
    display_text_range: [number, number];
    full_text: string;
    quoted_status?: TwitterApiStatusExtended;
    retweeted_status?: TwitterApiStatusExtended;
  };

  export interface TwitterApiEntities {
    hashtags: TwitterApiHashtagEntity[];
    media?: TwitterApiMedia[];
    polls?: TwitterApiPoll[];
    symbols: TwitterApiHashtagEntity[];
    urls: TwitterApiURL[];
    user_mentions: TwitterApiUserMention[];
  }

  export interface TwitterApiHashtagEntity {
    indices: [number, number];
    text: string;
  }

  export interface TwitterApiMedia {
    additional_media_info?: TwitterApiAdditionalMediaInfo;
    display_url: string;
    expanded_url: string;
    id_str: string;
    id: number;
    indices: [number, number];
    media_url_https: string;
    media_url: string;
    sizes: TwitterApiMediaSizes;
    source_status_id_str?: string;
    source_status_id?: number;
    source_user_id_str?: string;
    source_user_id?: number;
    type: string;
    url: string;
    video_info?: TwitterApiVideoInfo;
  }

  export interface TwitterApiAdditionalMediaInfo {
    description?: string;
    embeddable?: boolean;
    monetizable: boolean;
    source_user?: TwitterApiUser;
    title?: string;
  }

  export interface TwitterApiPoll {
    duration_minutes: number;
    end_datetime: string;
    options: TwitterApiPollOption[];
  }

  export interface TwitterApiPollOption {
    position: number;
    text: string;
  }

  export interface TwitterApiUser {
    contributors_enabled: boolean;
    created_at: string;
    default_profile_image: boolean;
    default_profile: boolean;
    description: string;
    entities: {
      description: Pick<TwitterApiEntities, 'urls'>;
      url?: Pick<TwitterApiEntities, 'urls'>;
    };
    favourites_count: number;
    follow_request_sent: boolean;
    followers_count: number;
    following: boolean;
    friends_count: number;
    geo_enabled: boolean;
    has_extended_profile: boolean;
    id_str: string;
    id: number;
    is_translation_enabled: boolean;
    is_translator: boolean;
    lang: null;
    listed_count: number;
    location: string;
    name: string;
    notifications: boolean;
    profile_background_color: string;
    profile_background_image_url_https: string | null;
    profile_background_image_url: string | null;
    profile_background_tile: boolean;
    profile_banner_url?: string;
    profile_image_url_https: string;
    profile_image_url: string;
    profile_link_color: string;
    profile_sidebar_border_color: string;
    profile_sidebar_fill_color: string;
    profile_text_color: string;
    profile_use_background_image: boolean;
    protected: boolean;
    screen_name: string;
    statuses_count: number;
    time_zone: null;
    translator_type: string;
    url: string | null;
    utc_offset: null;
    verified: boolean;
  }

  export interface TwitterApiURL {
    display_url: string;
    expanded_url: string;
    indices: [number, number];
    url: string;
  }

  export interface TwitterApiMediaSizes {
    large: TwitterApiMediaSize;
    medium: TwitterApiMediaSize;
    small: TwitterApiMediaSize;
    thumb: TwitterApiMediaSize;
  }

  export interface TwitterApiMediaSize {
    h: number;
    resize: string;
    w: number;
  }

  export interface TwitterApiVideoInfo {
    aspect_ratio: number[];
    duration_millis?: number;
    variants: TwitterApiVideoVariant[];
  }

  export interface TwitterApiVideoVariant {
    bitrate?: number;
    content_type: string;
    url: string;
  }

  export interface TwitterApiUserMention {
    id_str: string;
    id: number;
    indices: [number, number];
    name: string;
    screen_name: string;
  }

  export interface TwitterApiExtendedEntities {
    media?: TwitterApiMedia[];
  }

  export interface TwitterApiPlace {
    attributes: unknown;
    bounding_box: TwitterApiCoordinatesPolygon;
    contained_within: unknown;
    country_code: string;
    country: string;
    full_name: string;
    id: string;
    name: string;
    place_type: string;
    url: string;
  }

  export interface TwitterApiCoordinatesPoint {
    coordinates: [number, number];
    type: 'Point';
  }

  export interface TwitterApiCoordinatesPolygon {
    coordinates: [number, number][][];
    type: 'Polygon';
  }
}
