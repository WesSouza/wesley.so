import React, { memo, useCallback, useEffect } from 'react';

import { Button, Icon, Symbol, WindowMenu } from '~/src/components';
import { TextField } from '~/src/components/TextField';
import { Icons, IconSizes } from '~/src/constants/Icons';
import { Scale } from '~/src/constants/Styles';
import { Symbols } from '~/src/constants/Symbols';
import { modalOpen, windowClose, windowConfigure } from '~/src/state';
import { ApplicationWindowProps } from '~/src/system/ApplicationWindow';
import { HStack, Spacer, Text, Themes, VStack } from '~/src/ui';

function InternetExplorerComponent({ window }: ApplicationWindowProps) {
  let { file } = window;
  const { id } = window;

  useEffect(() => {
    windowConfigure(id, {
      icon: Icons.fileTypeHtml,
      initialSize: { width: 320, height: 350 },
      minimizable: true,
      minimumSize: { width: 320, height: 300 },
      resizable: true,
      title: `Internet Explorer`,
    });
  }, [id]);

  file = file ?? 'https://wes.dev/';

  const handleMenuSelect = useCallback(
    (action: string | null) => {
      switch (action) {
        case 'exit':
          windowClose(id);
          return;
      }

      modalOpen({
        actions: [['Ok', 'close']],
        content: "I'm still developing this, please try again next week.",
        icon: Icons.dialogWarning,
        title: 'Oh no',
      });
    },
    [id],
  );

  return (
    <>
      <WindowMenu
        menu={[
          [
            '&File',
            [
              ['&Open...', 'disabled'],
              ['Save &As...', 'disabled'],
              ['-'],
              ['Page Se&tup...', 'disabled'],
              ['&Print', 'disabled'],
              ['-'],
              ['E&xit', 'exit'],
            ],
          ],
          [
            '&Edit',
            [
              ['Cu&t', 'disabled', 'Ctrl+X'],
              ['&Copy', 'disabled', 'Ctrl+C'],
              ['&Paste', 'disabled', 'Ctrl+V'],
              ['-'],
              ['Select &All', 'disabled'],
              ['-'],
              ['&Find...', 'disabled', 'Alt+F3'],
              ['Find A&gain', 'disabled', 'F3'],
            ],
          ],
          [
            '&View',
            [
              ['&Toolbar', 'disabled'],
              ['&Address Bar', 'disabled'],
              ['&Status Bar', 'disabled'],
              ['-'],
              ['Sto&p', 'disabled'],
              ['&Refresh', 'disabled'],
              ['-'],
              ['Sour&ce', 'disabled'],
            ],
          ],
          [
            '&Go',
            [
              ['&Back', 'disabled'],
              ['&Forward', 'disabled'],
              ['-'],
              ['&Start Page', 'disabled'],
            ],
          ],
          [
            '&Help',
            [
              ['&Help Topics', 'disabled'],
              ['&About Internet Explorer', 'disabled'],
            ],
          ],
        ]}
        onMenuSelect={handleMenuSelect}
      />
      <HStack padding={Scale * 2} shrink={0}>
        <Button height={Scale * 23} padding={Scale * 4} width={Scale * 23}>
          <Symbol symbol={Symbols.chevronLeft} />
        </Button>
        <Button height={Scale * 23} padding={Scale * 4} width={Scale * 23}>
          <Symbol symbol={Symbols.chevronRight} />
        </Button>
        <Spacer minLength={Scale * 4} />
        <Button height={Scale * 23} padding={Scale * 1} width={Scale * 23}>
          <Icon icon={Icons.toolbarStop} size={IconSizes.small} />
        </Button>
        <Button height={Scale * 23} padding={Scale * 1} width={Scale * 23}>
          <Icon icon={Icons.toolbarReload} size={IconSizes.small} />
        </Button>
        <Spacer minLength={Scale * 4} />
        <Button height={Scale * 23} padding={Scale * 2} width={Scale * 23}>
          <Icon icon={Icons.toolbarOpen} size={IconSizes.small} />
        </Button>
        <Button height={Scale * 23} padding={Scale * 2} width={Scale * 23}>
          <Icon icon={Icons.toolbarHome} size={IconSizes.small} />
        </Button>
      </HStack>
      <HStack padding={Scale * 2} shrink={0}>
        <Text paddingTrailing={Scale * 2}>Address</Text>
        <TextField
          grow={1}
          multiLine={false}
          padding={Scale * 2}
          value={file}
        />
      </HStack>
      <VStack grow={1} theme={Themes.frameInset}>
        <iframe
          src={file}
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ flexGrow: 1 }}
        ></iframe>
      </VStack>
    </>
  );
}

export const InternetExplorer = memo(InternetExplorerComponent);
