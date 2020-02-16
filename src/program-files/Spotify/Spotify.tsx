import React, { memo, useCallback, useEffect } from 'react';

import { Button, Symbol, WindowMenu } from '~/src/components';
import { Icons } from '~/src/constants/Icons';
import { PaddingValues, Scale } from '~/src/constants/Styles';
import { Symbols } from '~/src/constants/Symbols';
import { modalOpen, windowClose, windowConfigure } from '~/src/state';
import { ApplicationWindowProps } from '~/src/system/ApplicationWindow';
import {
  HorizontalAlignments,
  HStack,
  Image,
  Spacer,
  Text,
  Themes,
  TruncationModes,
  VerticalAlignments,
  VStack,
} from '~/src/ui';
import { Range } from '~/src/ui/Range';

function SpotifyComponent({ window }: ApplicationWindowProps) {
  const { id } = window;

  useEffect(() => {
    windowConfigure(id, {
      icon: Icons.iconMplayer,
      minimizable: true,
      minimumSize: { width: 320, height: 400 },
      title: 'Spotify',
    });
  }, [id]);

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
              [
                '&Browse',
                [
                  ['&Genres', 'disabled'],
                  ['&Podcasts', 'disabled'],
                  ['-'],
                  ['&New Releases', 'disabled'],
                  ['&Discover', 'disabled'],
                ],
              ],
              ['-'],
              ['E&xit', 'exit'],
            ],
          ],
          [
            '&Library',
            [
              ['Made For &You', 'disabled'],
              ['&Recently Played', 'disabled'],
              ['-'],
              ['&Liked Songs', 'disabled'],
              ['&Albums', 'disabled'],
              ['&Artists', 'disabled'],
              ['&Playlists', 'disabled'],
            ],
          ],
          [
            '&Help',
            [
              ['&Help Topics', 'disabled'],
              ['&About Spotify', 'disabled'],
            ],
          ],
        ]}
        onMenuSelect={handleMenuSelect}
      />
      <HStack shrink={0} spacing={PaddingValues.large}>
        <HStack marginTop={Scale * 2} theme={Themes.frameInset}>
          <Image
            height={Scale * 64}
            posterize
            src={
              'https://img.discogs.com/SbuVVn2RSWyO4ZKhGeL2AfDQsB4=/fit-in/600x595/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-169648-1512433480-4200.jpeg.jpg'
            }
            width={Scale * 64}
          />
        </HStack>
        <VStack alignment={HorizontalAlignments.leading}>
          <HStack grow={0}>
            <Text bold truncationMode={TruncationModes.tail}>
              One More Time
            </Text>
          </HStack>
          <HStack grow={0} marginTop={Scale * 4}>
            <Text truncationMode={TruncationModes.tail}>Daft Punk</Text>
          </HStack>
        </VStack>
      </HStack>
      <Spacer />
      <VStack alignment={HorizontalAlignments.center}>
        <HStack shrink={0}>
          <Button padding={Scale * 4}>
            <Symbol symbol={Symbols.mediaRepeat} />
          </Button>
          <Button padding={Scale * 4}>
            <Symbol symbol={Symbols.mediaPrevious} />
          </Button>
          <Button padding={Scale * 4}>
            <Symbol symbol={Symbols.mediaPlay} />
          </Button>
          <Button padding={Scale * 4}>
            <Symbol symbol={Symbols.mediaNext} />
          </Button>
          <Button padding={Scale * 4}>
            <Symbol symbol={Symbols.mediaShuffle} />
          </Button>
        </HStack>
      </VStack>
      <VStack
        shrink={0}
        alignment={HorizontalAlignments.center}
        paddingLeading={Scale * 15}
        paddingTrailing={Scale * 15}
        paddingTop={PaddingValues.large}
        paddingBottom={0}
      >
        <Range min={0} max={1000} value={500} />
      </VStack>
      <Spacer />
      <HStack shrink={0} alignment={VerticalAlignments.stretch}>
        <HStack grow={3} padding={Scale * 2} theme={Themes.frameInsetThin}>
          <Text>Stopped</Text>
        </HStack>
        <VStack
          alignment={HorizontalAlignments.trailing}
          grow={1}
          padding={Scale * 2}
          theme={Themes.frameInsetThin}
        >
          <Text>0:00/5:20</Text>
        </VStack>
      </HStack>
    </>
  );
}

export const Spotify = memo(SpotifyComponent);
