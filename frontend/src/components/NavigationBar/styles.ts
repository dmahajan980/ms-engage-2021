import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  avatar: {
    h: [7, 7, 8],
    w: [7, 7, 8],
  },
  avatarButton: {
    variant: 'ghost',
  },
  detailsBox: {
    pl: 3,
    pr: 12,
    py: 5,
  },
  detailsLine: {
    fontSize: 'sm',
  },
  email: {
    fontWeight: 'medium',
    fontSize: 'sm',
  },
  icon: {
    size: 'sm',
  },
  iconButton: {
    px: 10,
    variant: 'ghost',
    w: [8, 10, 14],

    _active: {
      bgColor: 'theme.purpleBlue.normal',
    },

    _focus: {
      bgColor: 'theme.purpleBlue.normal',
    },

    _hover: {
      bgColor: 'theme.purpleBlue.normal',
    },
  },
  logo: {
    h: 6,
    ml: 2,
    mr: [1.5, 1, 0],
    w: 'auto',
  },
  menuList: {
    bgColor: 'theme.purpleBlue.light',
    borderRadius: 0,
  },
  menuOption: {
    _active: {
      bgColor: 'theme.purpleBlue.normal',
    },

    _focus: {
      bgColor: 'theme.purpleBlue.normal',
    },

    _hover: {
      bgColor: 'theme.purpleBlue.normal',
    },
  },
  name: {
    fontSize: 'xl',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 'lg',
    fontWeight: 'medium',
    ml: [2, 3.5, 5],
    mt: 1,
  },
  titleWrapper: {
    alignItems: 'center',
  },
  wrapper: {
    alignItems: 'center',
    bgColor: 'theme.purpleBlue.dark',
    color: '#fff',
    h: 12,
    justifyContent: 'space-between',
    left: 0,
    p: 1,
    pos: 'absolute',
    pr: [2, 3, 4],
    top: 0,
    w: 'full',
  },
};

export default styleProps;
