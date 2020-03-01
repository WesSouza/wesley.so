import React, { memo, useCallback, useEffect, useRef } from 'react';

import { Colors } from '~/src/constants/Styles';
import { windowConfigure } from '~/src/state';
import { ApplicationWindowProps } from '~/src/system/ApplicationWindow';
import { Canvas, Pressable } from '~/src/ui';

import ClippitActUrl from './assets/clippit.act';
import { AniPlayer, BobPack, BobResource } from './vendor/robert.js/robert';

const ClippitAnimations = {
  alert: [24, 0],
  chart: [11, 0],
  dig: [100, 0],
  enter: [12, 0],
  idle: [3, 0],
  leave: [18, 0],
  listen: [105, 0],
  load1: [101, 0],
  load2: [102, 0],
  load3: [103, 0],
  lookDown: [108, 0],
  lookDownLeft: [110, 0],
  lookDownRight: [109, 0],
  lookLeft: [112, 0],
  lookRight: [111, 0],
  lookTop: [113, 0],
  lookTopLeft: [115, 0],
  lookTopRight: [114, 0],
  mail: [104, 0],
  mobile: [4, 0],
  observingTransfer: [24, 0],
  pointDown: [25, 0],
  pointLeft: [24, 2],
  pointRight: [26, 0],
  pointUp: [31, 0],
  print: [1, 0],
  raiseEyebrows: [19, 0],
  read: [107, 0],
  save: [116, 0],
  snap: [22, 0],
  star: [106, 0],
  tapScreen: [23, 0],
  tornado: [2, 0],
  wave: [6, 0],
  wink: [13, 0],
  write: [32, 0],
};

const ClippitRandomAnimations = [
  ClippitAnimations.alert,
  ClippitAnimations.chart,
  ClippitAnimations.dig,
  ClippitAnimations.listen,
  ClippitAnimations.load1,
  ClippitAnimations.load2,
  ClippitAnimations.load3,
  ClippitAnimations.mail,
  ClippitAnimations.mobile,
  ClippitAnimations.observingTransfer,
  ClippitAnimations.print,
  ClippitAnimations.read,
  ClippitAnimations.save,
  ClippitAnimations.snap,
  ClippitAnimations.star,
  ClippitAnimations.tapScreen,
  ClippitAnimations.tornado,
  ClippitAnimations.wave,
  ClippitAnimations.wink,
  ClippitAnimations.write,
];

function ClippitComponent({ window: { id } }: ApplicationWindowProps) {
  const element = useRef<HTMLCanvasElement | null>(null);
  const player = useRef<AniPlayer | null>(null);
  const actorData = useRef<ArrayBuffer | null>(null);

  useEffect(() => {
    windowConfigure(id, {
      initialSize: { width: 200, height: 200 },
      minimumSize: { width: 200, height: 200 },
      initialPosition: { x: 0.9, y: 0.9 },
      title: '',
    });
  }, [id]);

  const animate = useCallback(() => {
    if (!player.current) {
      return;
    }

    const animation =
      ClippitRandomAnimations[
        Math.floor(Math.random() * ClippitRandomAnimations.length)
      ];

    player.current.playAnimation(animation[0], animation[1]);
  }, []);

  const loadActor = useCallback(() => {
    const canvas = element.current;
    if (!canvas || !actorData.current) {
      return;
    }

    const pack = new BobPack(actorData.current);
    const resource = new BobResource(pack.items[pack.names[0]]);
    player.current = new AniPlayer(resource);
    player.current.onPoseChange = () => player.current?.draw(canvas, false);

    player.current.playAnimation(3, 0);

    return () => {
      resource.cleanup();
    };
  }, []);

  useEffect(() => {
    if (actorData.current) {
      loadActor();
      return;
    }

    const abortController = new AbortController();
    fetch(ClippitActUrl)
      .then((result) => result.arrayBuffer())
      .then((arrayBuffer) => {
        actorData.current = arrayBuffer;
        loadActor();
      })
      .catch(console.error);

    return () => {
      abortController.abort();
    };
  }, [loadActor]);

  return (
    <Pressable onPress={animate}>
      <Canvas
        width={188}
        height={150}
        nativeRef={element}
        UNSTABLE_css={{
          backgroundImage: `radial-gradient(ellipse at top left, ${Colors.darkGray}, ${Colors.lightGray})`,
          imageRendering: 'pixelated',
        }}
      />
    </Pressable>
  );
}

export const Clippit = memo(ClippitComponent);
