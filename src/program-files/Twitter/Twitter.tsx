import React, { memo } from 'react';

import { ApplicationWindowProps } from '~/src/system/ApplicationWindow';
import { WesURL } from '~/src/utils/WesURL';

import { OpenUser } from './screens/OpenUser';
import { User } from './screens/User';

function TwitterComponent({ window }: ApplicationWindowProps) {
  let { file } = window;

  if (!file) {
    file = `twitter:/user?username=${process.env.TW_WES_USERNAME || ''}`;
  }

  const { pathname, searchParams } = new WesURL(file);

  switch (pathname) {
    case '/user':
      const username = searchParams.get('username');
      if (!username) {
        throw new Error('Missing Twitter username');
      }

      return <User username={username} window={window} />;

    case '/user/open':
      return <OpenUser window={window} />;
  }

  return null;
}

export const Twitter = memo(TwitterComponent);
