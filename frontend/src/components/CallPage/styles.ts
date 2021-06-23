import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  selfVideo: {
    pos: 'absolute',
    bottom: 5,
    right: 5,

    maxH: 32,
    h: 'full',
    w: 'auto',

    boxShadow: 'dark-lg',

    transition: 'bottom 100ms ease-in, box-shadow 100ms ease-in',
    _hover: {
      bottom: 7,
      boxShadow: 'dark-lg',
    },
  },
  wrapper: {
    h: '100vh',
    maxW: '100vw',
    w: 'full',
  },
};

export default styleProps;
