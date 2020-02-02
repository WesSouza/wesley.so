import React, { memo, useCallback, useEffect } from 'react';

import { WindowMenu } from '~/src/components';
import { TextField } from '~/src/components/TextField';
import { Icons } from '~/src/constants/Icons';
import { PaddingValues } from '~/src/constants/Styles';
import helloWorld from '~/src/documents-and-settings/wes/Hello.txt.json';
import { modalOpen, windowClose, windowConfigure } from '~/src/state';
import { ApplicationWindowProps } from '~/src/system/ApplicationWindow';
import { Themes } from '~/src/ui';

function NotepadComponent({ window }: ApplicationWindowProps) {
  const { file, id } = window;

  useEffect(() => {
    const fileName = file ?? 'Untitled';

    windowConfigure(id, {
      icon: Icons.fileTypeText,
      initialSize: { width: 320, height: 350 },
      minimizable: true,
      minimumSize: { width: 320, height: 300 },
      resizable: true,
      title: `${fileName} - Notepad`,
    });
  }, [file, id]);

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
              ['&New...', 'disabled'],
              ['&Open...', 'disabled'],
              ['&Save', 'disabled'],
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
              ['&Undo', 'disabled', 'Ctrl+Z'],
              ['-'],
              ['Cu&t', 'disabled', 'Ctrl+X'],
              ['&Copy', 'disabled', 'Ctrl+C'],
              ['&Paste', 'disabled', 'Ctrl+V'],
              ['De&lete', 'disabled', 'Del'],
              ['-'],
              ['Select &All', 'disabled'],
              ['Time/&Date', 'disabled', 'F5'],
              ['-'],
              ['&Word Wrap', 'disabled'],
            ],
          ],
          [
            '&Search',
            [
              ['&Find...', 'disabled'],
              ['Find &Next', 'disabled', 'F3'],
            ],
          ],
          [
            '&Help',
            [
              ['&Help Topics', 'disabled'],
              ['&About Notepad', 'disabled'],
            ],
          ],
        ]}
        onMenuSelect={handleMenuSelect}
      />
      <TextField
        multiLine
        grow={1}
        padding={PaddingValues.medium}
        theme={Themes.frameInset}
        value={window.file === 'Hello.txt' ? helloWorld : ''}
      />
    </>
  );
}

export const Notepad = memo(NotepadComponent);
