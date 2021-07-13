import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  message: {
    bgColor: `theme.purpleBlue.normal`,
    borderRadius: 0,
    color: 'white',
    fontSize: 'sm',
    maxW: ['2xs', 'xs', 'sm', 'md', 'lg'],
    mx: 0,
    my: 1,
    px: 4,
    py: 2,
  },
  messageWrapper: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 'xs',
    fontWeight: 'thin',
    mx: 2,
  },
};

export default styleProps;
