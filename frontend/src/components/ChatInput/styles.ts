import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  icon: {
    color: 'theme.purpleBlue.dark',
    h: 7,
    w: 'auto',
  },
  input: {
    bgColor: '#DEDEDE',
    borderRadius: 0,
    variant: 'filled',

    _active: {
      bgColor: '#DEDEDE',
    },
    _hover: {
      bgColor: '#DEDEDE',
    },
  },
  sendButton: {
    borderRadius: 'full',
    ml: 1.5,
    variant: 'ghost',
  },
  wrapper: {
    alignItems: 'center',
    px: 2,
    py: 2,
  },
};

export default styleProps;
