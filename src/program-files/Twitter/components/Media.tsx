import React, { memo } from 'react';

import { Image } from '~/src/ui';

import { TwitterEntities } from '../data/types';

interface Props {
  entities: TwitterEntities[];
}

function MediaComponent({ entities }: Props) {
  const media = entities.find((entity) => entity.type === 'media');
  if (!media) {
    return null;
  }

  return (
    <Image aspectRatio={16 / 9} posterize src={media.resource} width="100%" />
  );
}

export const Media = memo(MediaComponent);
