import { IgApiClient } from 'instagram-private-api';

const {
  IG_USERNAME: IG_USERNAME,
  IG_PASSWORD: IG_PASSWORD,
  IG_WES_USERNAME: IG_WES_USERNAME,
} = process.env;

let instagramClientPromise: Promise<IgApiClient>;
export function getInstagramClient() {
  if (!IG_USERNAME || !IG_PASSWORD || !IG_WES_USERNAME) {
    throw new Error('Missing credentials');
  }

  if (!instagramClientPromise) {
    instagramClientPromise = new Promise((resolve, reject) => {
      const instagram = new IgApiClient();
      instagram.state.generateDevice(IG_USERNAME);

      instagram.simulate
        .preLoginFlow()
        .then(() => instagram.account.login(IG_USERNAME, IG_PASSWORD))
        .then(() => {
          process.nextTick(() => instagram.simulate.postLoginFlow());
        })
        .then(() => {
          resolve(instagram);
        })
        .catch(reject);
    });
  }

  return instagramClientPromise;
}
