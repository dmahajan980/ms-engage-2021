import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  button: {
    borderRadius: 0,
    bgColor: 'theme.purpleBlue.normal',
    color: 'white',

    _hover: {
      bgColor: 'theme.purpleBlue.light',
    },

    _active: {
      bgColor: 'theme.purpleBlue.light',
    },

    _focus: {
      bgColor: 'theme.purpleBlue.light',
    },
  },
  joinButton: {
    borderRadius: 0,
    bgColor: 'transparent',
    color: 'theme.purpleBlue.normal',

    _hover: {
      bgColor: 'transparent',
    },

    _active: {
      bgColor: 'transparent',
    },

    _focus: {
      bgColor: 'transparent',
    },
  },
  buttonWrapper: {
    mt: 7,
  },
  img: {
    h: 'xs',
    w: 'auto',
  },
  heading: {
    fontSize: '4xl',
    fontWeight: 'medium',
    mb: 2,
  },
  input: {
    borderRadius: 0,
    ml: 3,
    maxW: '2xs',
  },
  text: {
    fontSize: 'lg',
  },
  textWrapper: {
    mr: 20,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',

    bgColor: 'white',
    h: 'calc(100vh - 3rem)',
    w: 'full',
    px: 10,
    py: 20,
  },
};

export default styleProps;
