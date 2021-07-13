import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  avatar: {
    size: 'sm'
  },
  chatBox: {
    h: 'calc(100vh - 3.75rem - 3rem - 4rem)',
    px: 2,
    w: 'full',
    overflowX: 'auto',
  },
  detailsWrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    bgColor: '#DEDEDE',

    h: '3.75rem',
    px: 5,
    w: 'full',
  },
  details: {
    alignItems: 'center',
  },
  inviteIcon: {
    h: 5,
    w: 5,
  },
  inviteIconButton: {
    bgColor: 'transparent',
  },
  mainWindow: {
    w: 'full',
    maxW: '4xl',
    mt: 3,
  },
  name: {
    fontSize: '2xl',
    fontWeight: 'bold',
    ml: 1.5,
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'column',

    h: 'calc(100vh - 3rem)',
    w: 'calc(100% - 20rem)',
  },
};

export default styleProps;
