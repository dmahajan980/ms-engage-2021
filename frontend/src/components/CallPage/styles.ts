import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  actionBar: {
    alignItems: 'center',
    justifyContent: 'space-between',

    h: 'full',
    maxH: 16,
    w: 'full',
    px: 5,

    pos: 'fixed',
    bottom: 0,
    zIndex: 2,
  },
  button: {
    bgColor: 'theme.purpleBlue.light',
    borderRadius: 0,

    _hover: {
      bgColor: 'theme.purpleBlue.dark',
    },
  },
  disconnectButton: {
    bgColor: '#C24042',
    _hover: {
      bgColor: '#FF4042',
      transform: 'translateY(-3px)',
    },
  },
  icon: {
    color: 'white',
  },
  iconButton: {
    bgColor: 'theme.purpleBlue.normal',
    boxShadow: 'dark-lg',
    ml: 3,

    transition: 'transform 50ms linear, background-color 50ms ease-in',

    _hover: {
      bgColor: 'theme.purpleBlue.light',
      transform: 'translateY(-3px)',
    },

    _active: {
      bgColor: 'theme.purpleBlue.light',
      transform: 'translateY(-3px)',
    },
  },
  infoIcon: {
    h: 6,
    w: 'auto'
  },
  infoIconButton: {
    variant: 'ghost',
    _active: {
      bgColor: 'transparent',
    },
    _hover: {
      bgColor: 'transparent',
    },
  },
  selfVideo: {
    h: 'full',
    mx: 'auto',
  },
  selfVideoFloating: {
    pos: 'absolute',
    bottom: ['unset', 'unset', 16],
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
    pb: 16,
    pt: 12,
    w: 'full',
  },
};

export default styleProps;
