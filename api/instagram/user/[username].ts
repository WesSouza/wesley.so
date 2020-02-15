import { asyncNow } from '../../_async';
import { getUserWithMedia } from '../../../src/program-files/Instagram/api/user';

export default asyncNow(async (request, response) => {
  const { username } = request.query;
  if (typeof username !== 'string') {
    throw new Error('username must be a string');
  }

  const userWithMedia = await getUserWithMedia(username);

  response.setHeader(
    'Cache-Control',
    'maxage=600, s-maxage=7200, stale-while-revalidate',
  );
  response.status(200).json(userWithMedia);
});
