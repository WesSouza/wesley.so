import { asyncNow } from '../../_async';
import { getUserWithStatuses } from '../../../src/program-files/Twitter/api/user';

export default asyncNow(async (request, response) => {
  const { username } = request.query;
  if (typeof username !== 'string') {
    throw new Error('username must be a string');
  }

  const userWithStatuses = await getUserWithStatuses(username);

  response.setHeader(
    'Cache-Control',
    'maxage=30, s-maxage=900, stale-while-revalidate',
  );
  response.status(200).json(userWithStatuses);
});
