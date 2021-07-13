import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  chatListWrapper: {
    mt: 2,
  },
  chatText: {
    fontSize: 'xl',
    fontWeight: 'bold',
    mt: 0.5,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',

    bgGradient: 'linear-gradient(to right, #EEEEEE 96%, #aaa 150%)',
    borderBottomColor: 'blackAlpha.200',
    borderBottomWidth: 1,

    pos: 'sticky',
    top: 0,

    px: 5,
    py: 2.5,
    w: 'full',
    zIndex: 2,
  },
  icon: {
    h: 3.5,
    w: 'auto',
  },
  iconButton: {
    bgColor: 'transparent',
  },
  modal: {
    borderRadius: 0,
  },
  createModalButton: {
    bgColor: 'white',
    borderRadius: 0,
    color: 'theme.purpleBlue.light',
    mr: 2,

    _active: {
      bgColor: 'white',
    },

    _hover: {
      bgColor: 'white',
    },
  },
  modalButton: {
    bgColor: 'theme.purpleBlue.light',
    color: 'white',
    borderRadius: 0,

    _active: {
      bgColor: 'theme.purpleBlue.normal',
    },

    _hover: {
      bgColor: 'theme.purpleBlue.normal',
    },
  },
  wrapper: {
    bgGradient: 'linear-gradient(to right, #EEEEEE 96%, #aaa 150%)',
    h: 'calc(100vh - 3rem)',
    overflowY: 'auto',
    w: 'xs',
  },
};

export default styleProps;
