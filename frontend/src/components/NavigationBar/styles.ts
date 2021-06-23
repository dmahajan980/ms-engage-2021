import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  avatar: {
    h: [7, 7, 8],
    w: [7, 7, 8],
  },
  avatarButton: {
    variant: 'ghost',
  },
  badgeOnline: {
    bgColor: '#92C353',
    boxSize: 3.5,
    borderColor: 'theme.purpleBlue.dark',
    borderWidth: 2.5,
  },
  badgeOffline: {
    bgColor: '#6F7A87',
    boxSize: 3.5,
    borderColor: 'theme.purpleBlue.dark',
    borderWidth: 2.5,
  },
  icon: {
    h: 8,
    w: 'auto',
  },
  iconButton: {
    px: 10,
    variant: 'ghost',
    w: [8, 10, 14],
  },
  logo: {
    h: 6,
    ml: 2,
    mr: [1.5, 1, 0],
    w: 'auto',
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
