import React, { memo, useCallback, useEffect, useState } from 'react';

import { Button } from '~/src/components';
import { TextField } from '~/src/components/TextField';
import { PaddingValues, Scale } from '~/src/constants/Styles';
import { windowClose, windowConfigure, windowOpenUrl } from '~/src/state';
import { ApplicationWindowProps } from '~/src/system/ApplicationWindow';
import { HorizontalAlignments, HStack, Spacer, Text, VStack } from '~/src/ui';
import { WesURL } from '~/src/utils/WesURL';

function OpenUserComponent({ window }: ApplicationWindowProps) {
  const { id } = window;

  const [username, setUsername] = useState('');

  useEffect(() => {
    const size = {
      width: 300,
      height: 150,
    };
    windowConfigure(id, {
      minimumSize: size,
      title: 'Open User',
    });
  }, [id]);

  const handleOk = useCallback(() => {
    const url = new WesURL('twitter:/user');
    url.searchParams.set('username', username);
    windowOpenUrl(String(url));
    windowClose(id);
  }, [id, username]);

  const handleCancel = useCallback(() => {
    windowClose(id);
  }, [id]);

  return (
    <VStack
      alignment={HorizontalAlignments.stretch}
      padding={PaddingValues.large}
      spacing={PaddingValues.large}
    >
      <Text>Username:</Text>
      <TextField onChange={setUsername} padding={PaddingValues.medium} />
      <HStack spacing={PaddingValues.large}>
        <Spacer />
        <Button
          onPress={handleOk}
          padding={PaddingValues.medium}
          width={Scale * 60}
        >
          OK
        </Button>
        <Button
          onPress={handleCancel}
          padding={PaddingValues.medium}
          width={Scale * 60}
        >
          Cancel
        </Button>
      </HStack>
    </VStack>
  );
}

export const OpenUser = memo(OpenUserComponent);
