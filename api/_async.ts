import { NowRequest, NowResponse } from '@now/node';

export function asyncNow<T>(
  handler: (request: NowRequest, response: NowResponse) => Promise<T>,
) {
  return (request: NowRequest, response: NowResponse) => {
    handler(request, response).catch(error => {
      response.status(500);
      response.json({ error: error.name || error.toString() });
      console.error(error);
    });
  };
}
