import { CSSObject } from '@emotion/core';

import { Colors, Scale } from '~/src/constants/Styles';

const BorderImages = {
  balloon: `url("data:image/svg+xml,%3Csvg width='26' height='26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 5h1V3h4V1h4v2h4v2h2v2h2v4h2v4h-2v4h-2v2h-2v2h-4v2h-4v-2H7v-2H5v-2H3v-4H1v-4h2V7h2V5h1z' fill='%23FFC' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E") 12 12 repeat`,
  button: `url("data:image/svg+xml,%3Csvg width='10' height='10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23BDBEBD' d='M0 0h10v10H0z'/%3E%3Cpath d='M0 0v8h2V2h6V0H0z' fill='%23fff'/%3E%3Cpath d='M6 2H2v4h2V4h2V2z' fill='%23E5E5E5'/%3E%3Cpath d='M8 2H6v4H2v2h6V2z' fill='%237B7D7B'/%3E%3Cpath d='M10 0H8v8H0v2h10V0z' fill='%23000'/%3E%3Cpath fill='%23BDBEBD' d='M4 4h2v2H4z'/%3E%3C/svg%3E") 4 4 repeat`,
  buttonPressed: `url("data:image/svg+xml,%3Csvg width='10' height='10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23BDBEBD' d='M0 0h10v10H0z'/%3E%3Cpath d='M0 0v8h2V2h6V0H0z' fill='%23000'/%3E%3Cpath d='M8 2H6v4H2v2h6V2z' fill='%23fff'/%3E%3Cpath d='M10 0H8v8H0v2h10V0z' fill='%23E5E5E5'/%3E%3Cpath d='M6 2H2v4h2V4h2V2z' fill='%237B7D7B'/%3E%3Cpath fill='%23BDBEBD' d='M4 4h2v2H4z'/%3E%3C/svg%3E") 4 4 repeat`,
  buttonRounded: `url("data:image/svg+xml,%3Csvg width='10' height='10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 0h2v2H4V0zM2 4V2h2v2H2zM2 4v2H0V4h2z' fill='%23fff'/%3E%3Cpath d='M6 2H4v2H2v2h2V4h2V2z' fill='%23E5E5E5'/%3E%3Cpath d='M6 4H4v2H2v2h2V6h2V4z' fill='%23BDBEBD'/%3E%3Cpath d='M8 4H6v2H4v2h2V6h2V4z' fill='%237B7D7B'/%3E%3Cpath d='M6 2h2v2H6V2zM8 6h2V4H8v2zM6 8V6h2v2H6zM6 8v2H4V8h2z' fill='%23000'/%3E%3C/svg%3E") 4 4 repeat`,
  frame: `url("data:image/svg+xml,%3Csvg width='10' height='10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23BDBEBD' d='M0 0h10v10H0z'/%3E%3Cpath d='M0 0v8h2V2h6V0H0z' fill='%23E5E5E5'/%3E%3Cpath d='M6 2H2v4h2V4h2V2z' fill='%23fff'/%3E%3Cpath d='M8 2H6v4H2v2h6V2z' fill='%237B7D7B'/%3E%3Cpath d='M10 0H8v8H0v2h10V0z' fill='%23000'/%3E%3Cpath fill='%23BDBEBD' d='M4 4h2v2H4z'/%3E%3C/svg%3E") 4 4 repeat`,
  frameInset: `url("data:image/svg+xml,%3Csvg width='10' height='10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' d='M0 0h10v10H0z'/%3E%3Cpath d='M0 0v8h2V2h6V0H0z' fill='%237B7D7B'/%3E%3Cpath d='M8 2H6v4H2v2h6V2z' fill='%23E5E5E5'/%3E%3Cpath d='M10 0H8v8H0v2h10V0z' fill='%23fff'/%3E%3Cpath d='M6 2H2v4h2V4h2V2z' fill='%23000'/%3E%3Cpath fill='%23fff' d='M4 4h2v2H4z'/%3E%3C/svg%3E") 4 4 repeat`,
  frameInsetThin: `url("data:image/svg+xml,%3Csvg width='10' height='10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23BDBEBD' d='M0 0h10v10H0z'/%3E%3Cpath d='M0 0v8h2V2h6V0H0z' fill='%237B7D7B'/%3E%3Cpath d='M10 0H8v8H0v2h10V0z' fill='%23fff'/%3E%3C/svg%3E") 4 4 repeat`,
  frameTop: `url("data:image/svg+xml,%3Csvg width='10' height='10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23BDBEBD' d='M0 0h10v10H0z'/%3E%3Cpath fill='%23fff' d='M0 0h10v2H0z'/%3E%3Cpath fill='%23E5E5E5' d='M0 2h10v2H0z'/%3E%3C/svg%3E") 4 4 repeat`,
  frameThin: `url("data:image/svg+xml,%3Csvg width='10' height='10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0v8h2V2h6V0H0z' fill='%23fff'/%3E%3Cpath d='M10 0H8v8H0v2h10V0z' fill='%237B7D7B'/%3E%3C/svg%3E") 4 4 repeat`,
};

const Backgrounds = {
  balloonTip: `url("data:image/svg+xml,%3Csvg width='36' height='20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 3H5V1h30v18h-4v-2h-4v-2h-4v-2h-2v-2h-4V9h-2V7h-4V5H7V3H6z' fill='%23FFC' stroke='%23000' stroke-width='2'/%3E%3Cpath fill='%23FFC' d='M34 2h2v16h-2z'/%3E%3C/svg%3E")`,
};

export enum Themes {
  balloon = 'balloon',
  balloonTipBottom = 'balloonTipBottom',
  balloonTipLeft = 'balloonTipLeft',
  balloonTipRight = 'balloonTipRight',
  balloonTipTop = 'balloonTipTop',
  basic = 'basic',
  button = 'button',
  buttonActive = 'buttonActive',
  buttonPressed = 'buttonPressed',
  disabled = 'disabled',
  frame = 'frame',
  frameInset = 'frameInset',
  frameInsetThin = 'frameInsetThin',
  frameTop = 'frameTop',
  frameThin = 'frameThin',
  link = 'link',
}

const ThemeStyleDefault: CSSObject = {
  ':focus': {
    outline: 'none',
  },
};

const ThemeStyleButtonBase: CSSObject = {
  ':active, :focus': {
    outline: `2px dotted ${Colors.black}`,
    outlineOffset: Scale * -4,
  },
};

const ThemeStyleBalloon: CSSObject = {
  ...ThemeStyleDefault,
  color: Colors.black,
  backgroundColor: Colors.balloonYellow,
  borderImage: BorderImages.balloon,
  borderRadius: 20,
  borderStyle: 'solid',
  borderWidth: 12,
};

const ThemeStyleBalloonWithTip: CSSObject = {
  ...ThemeStyleBalloon,
  '::before': {
    content: '" "',
    position: 'absolute',
    backgroundImage: Backgrounds.balloonTip,
    width: 36,
    height: 20,
  },
};

const ThemeStyleLink: CSSObject = {
  ...ThemeStyleDefault,
  color: Colors.pureBlue,
  cursor: 'pointer',
  textDecoration: 'underline',
};

export const ThemeStyles: Record<Themes, CSSObject> = {
  balloon: {
    ...ThemeStyleBalloon,
  },
  balloonTipBottom: {
    ...ThemeStyleBalloonWithTip,
    '::before': {
      ...ThemeStyleBalloonWithTip['::before'],
      bottom: -38,
      left: '50%',
      transform: 'rotate(-90deg) translateY(-100%)',
    },
  },
  balloonTipLeft: {
    ...ThemeStyleBalloonWithTip,
    '::before': {
      ...ThemeStyleBalloonWithTip['::before'],
      top: '50%',
      left: -46,
      transform: 'translateY(-100%)',
    },
  },
  balloonTipRight: {
    ...ThemeStyleBalloonWithTip,
    '::before': {
      ...ThemeStyleBalloonWithTip['::before'],
      right: -46,
      top: '50%',
      transform: 'rotate(180deg) translateY(100%)',
    },
  },
  balloonTipTop: {
    ...ThemeStyleBalloonWithTip,
    '::before': {
      ...ThemeStyleBalloonWithTip['::before'],
      top: -38,
      left: '50%',
      transform: 'rotate(90deg) translateY(100%)',
    },
  },
  basic: {
    ...ThemeStyleDefault,
    color: Colors.black,
    backgroundColor: Colors.gray,
  },
  button: {
    ...ThemeStyleButtonBase,
    color: Colors.black,
    backgroundColor: Colors.gray,
    borderImage: BorderImages.button,
    borderStyle: 'solid',
    borderWidth: 4,
    ':active': {
      borderImage: BorderImages.buttonPressed,
    },
  },
  buttonActive: {
    ...ThemeStyleButtonBase,
    color: Colors.black,
    backgroundColor: Colors.gray,
    borderImage: BorderImages.buttonPressed,
    borderStyle: 'solid',
    borderWidth: 4,
    backgroundImage: `
      linear-gradient(45deg, ${Colors.white} 25%, transparent 25%),
      linear-gradient(-45deg, ${Colors.white} 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, ${Colors.white} 75%),
      linear-gradient(-45deg, transparent 75%, ${Colors.white} 75%)`,
    backgroundSize: `${Scale * 2}px ${Scale * 2}px`,
    backgroundPosition: `0 0, 0 ${Scale * 1}px, ${Scale * 1}px -${
      Scale * 1
    }px, -${Scale * 1}px 0px`,
  },
  buttonPressed: {
    ...ThemeStyleButtonBase,
    color: Colors.black,
    backgroundColor: Colors.gray,
    borderImage: BorderImages.buttonPressed,
    borderStyle: 'solid',
    borderWidth: 4,
  },
  disabled: {
    ...ThemeStyleDefault,
    color: Colors.darkerGray,
    textShadow: `${Scale}px ${Scale}px 0 ${Colors.lightGray}`,
    ':hover': {
      textShadow: 'none',
    },
  },
  frame: {
    ...ThemeStyleDefault,
    color: Colors.black,
    backgroundColor: Colors.gray,
    borderImage: BorderImages.frame,
    borderStyle: 'solid',
    borderWidth: 4,
  },
  frameInset: {
    ...ThemeStyleDefault,
    color: Colors.black,
    backgroundColor: Colors.white,
    borderImage: BorderImages.frameInset,
    borderStyle: 'solid',
    borderWidth: 4,
  },
  frameInsetThin: {
    ...ThemeStyleDefault,
    color: Colors.black,
    backgroundColor: Colors.gray,
    borderImage: BorderImages.frameInsetThin,
    borderStyle: 'solid',
    borderWidth: 4,
  },
  frameTop: {
    ...ThemeStyleDefault,
    color: Colors.black,
    backgroundColor: Colors.gray,
    borderImage: BorderImages.frameTop,
    borderStyle: 'solid',
    borderWidth: 4,
  },
  frameThin: {
    ...ThemeStyleDefault,
    color: Colors.black,
    backgroundColor: Colors.gray,
    borderImage: BorderImages.frameThin,
    borderStyle: 'solid',
    borderWidth: 4,
  },
  link: {
    ...ThemeStyleLink,
    ':active': {
      color: Colors.pureRed,
    },
  },
};
