import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  copyBox: {
    alignItems: 'center',
    justifyContent: 'space-between',

    bgColor: 'whiteAlpha.100',
    
    h: 10,
    mt: 5,
    pl: 2,
    w: 'full',
  },
  copyButton: {
    bg: 'transparent',
    _hover: {
      bg: 'transparent',
    }
  },
  memeListCaption: {
    alignSelf: 'center',
    color: 'text',
    fontFamily: 'source-sans',
    textAlign: 'center',
  },
  modalContent: {
    bgColor: '#222222',
    color: 'white',

    borderRadius: 0,
    pb: 2.5,
  },
  wrapper: {
    size: 'sm',
  },
};

export default styleProps;
