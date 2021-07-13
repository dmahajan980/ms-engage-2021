import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  avatar: {
    size: 'sm',
  },
  dataWrapper: {
    flexDir: 'column',
    justifyContent: 'space-between',

    ml: 2,
  },
  dataWrapperParent: {
    alignItems: 'center',
  },
  message: {
    fontSize: 12,
    lineHeight: 1.2,
    w: 44,
  },
  name: {
    fontSize: 14,
    lineHeight: 1,
  },
  time: {
    fontSize: 12,
    lineHeight: 1,
  },
  selected: {
    bgColor: '#FFFFFFA0',
  },
  wrapper: {
    cursor: 'pointer',
    justifyContent: 'space-between',

    pl: 5,
    pr: 7,
    py: 3.5,

    _hover: {
      bgColor: '#FFFFFF88',
    },
  },
};

export default styleProps;
