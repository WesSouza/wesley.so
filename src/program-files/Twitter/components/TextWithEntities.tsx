import { AllHtmlEntities as Entities } from 'html-entities';
import React, { memo } from 'react';

import { Link } from '~/src/components/Link';
import { Text } from '~/src/ui';
import { WesURL } from '~/src/utils/WesURL';

import { TwitterEntities } from '../data/types';

const htmlEntities = new Entities();

interface Props {
  entities: TwitterEntities[];
  text: string;
}

function TextWithEntitiesComponent({ entities, text }: Props) {
  let lastIndex = 0;
  const result: JSX.Element[] = [];

  entities.forEach((entity, index) => {
    const { label, length, startIndex, type, resource } = entity;

    let url = new WesURL('twitter:/');

    switch (type) {
      case 'hashtag':
        url.pathname = '/hashtag';
        url.searchParams.set('hashtag', resource);
        break;
      case 'media':
        url.pathname = '/media';
        url.searchParams.set('url', resource);
        break;
      case 'symbol':
        url.pathname = '/hashtag';
        url.searchParams.set('hashtag', resource);
        break;
      case 'url':
        url = new WesURL(resource);
        break;
      case 'userMention':
        url.pathname = '/user';
        url.searchParams.set('username', resource);
        break;
    }

    result.push(
      <React.Fragment key={index}>
        {htmlEntities.decode(text.substring(lastIndex, startIndex))}
      </React.Fragment>,
    );

    result.push(
      <Link key={String(index) + String(url)} url={String(url)}>
        {label}
      </Link>,
    );

    lastIndex = startIndex + length;
  });

  if (lastIndex < text.length) {
    result.push(
      <React.Fragment key={entities.length}>
        {text.substring(lastIndex)}
      </React.Fragment>,
    );
  }

  return <Text nl2br>{result}</Text>;
}

export const TextWithEntities = memo(TextWithEntitiesComponent);
