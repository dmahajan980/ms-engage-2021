import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  button: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',

    bgColor: 'transparent',

    h: 'auto',
    mb: 1,
    p: 1.5,
    w: '95%',

    _hover: {
      bgColor: 'transparent',
    },

    _active: {
      bgColor: 'transparent',
    },

    borderRadius: 0,
  },
  buttonSelected: {
    borderLeftColor: 'theme.purpleBlue.light',
    borderLeftWidth: 2,
  },
  buttonIcon: {
    color: 'theme.purpleBlue.dark',
    h: 5,
    w: 'auto',
    mb: 1.5,
  },
  buttonLabel: {
    fontSize: 'xs',
    fontWeight: 'light',
  },
  wrapper: {
    alignItems: 'center',
    bgGradient: 'linear-gradient(to right, #EBEBEB 90%, #aaa 150%)',
    flexDirection: 'column',

    h: '100vh',
    pt: 14,
    w: 16,
  },
};

export default styleProps;
