import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  actionBar: {
    alignItems: 'center',
    justifyContent: 'center',

    h: 'full',
    maxH: [16],
    w: 'full',

    pos: 'fixed',
    bottom: 0,
    zIndex: 2,
  },
  icon: {
    color: 'white',
  },
  iconButton: {
    bgColor: 'theme.purpleBlue.normal',
    boxShadow: 'dark-lg',
    ml: 3,

    transition: 'margin-bottom 50ms linear, background-color 50ms ease-in',

    _hover: {
      bgColor: 'theme.purpleBlue.light',
      mb: 1,
    },

    _active: {
      bgColor: 'theme.purpleBlue.light',
      mb: 1,
    },
  },
  selfVideo: {
    h: 'full',
    mx: 'auto',
  },
  selfVideoFloating: {
    pos: 'absolute',
    bottom: ['unset', 'unset', 5],
    right: [3, 3, 5],
    top: [3, 3, 'unset'],

    maxH: [16, 32],

    boxShadow: 'dark-lg',
    transform: 'scale(1)',

    transition: 'transform 100ms ease-in',
    _hover: {
      transform: 'scale(1.05)',
    },
    zIndex: 3,
  },
  wrapper: {
    bgColor: '#202124',

    h: '100vh',
    maxW: '100vw',
    w: 'full',
  },
};

export default styleProps;
