import Twitter from 'twitter-lite';

const { TW_KEY, TW_SECRET, TW_TOKEN, TW_TOKEN_SECRET } = process.env;

let twitterClient: Twitter | null = null;
export function getTwitterClient() {
  if (!TW_KEY || !TW_SECRET || !TW_TOKEN || !TW_TOKEN_SECRET) {
    throw new Error('Missing credentials');
  }

  if (!twitterClient) {
    twitterClient = new Twitter({
      subdomain: 'api',
      consumer_key: TW_KEY,
      consumer_secret: TW_SECRET,
      access_token_key: TW_TOKEN,
      access_token_secret: TW_TOKEN_SECRET,
    });
  }

  return twitterClient;
}
