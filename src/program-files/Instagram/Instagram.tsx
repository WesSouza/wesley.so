import React, { memo } from 'react';

import { ApplicationWindowProps } from '~/src/system/ApplicationWindow';
import { WesURL } from '~/src/utils/WesURL';

import { Media } from './screens/Media';
import { OpenUser } from './screens/OpenUser';
import { User } from './screens/User';

function InstagramComponent({ window }: ApplicationWindowProps) {
  let { file } = window;

  if (!file) {
    file = `twitter:/user?username=${process.env.IG_WES_USERNAME || ''}`;
  }

  const { pathname, searchParams } = new WesURL(file);

  switch (pathname) {
    case '/user': {
      const username = searchParams.get('username');
      if (!username) {
        throw new Error('Missing Instagram username');
      }

      return <User username={username} window={window} />;
    }

    case '/user/media': {
      const username = searchParams.get('username');
      const mediaCode = searchParams.get('mediaCode');
      if (!username) {
        throw new Error('Missing Instagram username');
      }
      if (!mediaCode) {
        throw new Error('Missing Instagram mediaCode');
      }

      return (
        <Media mediaCode={mediaCode} username={username} window={window} />
      );
    }

    case '/user/open': {
      return <OpenUser window={window} />;
    }
  }

  return null;
}

export const Instagram = memo(InstagramComponent);
