import StyleSheet from '../../types/StyleSheet';

const styleProps: StyleSheet = {
  borderBox: {
    pos: 'fixed',
    bottom: 0,
    left: 0,

    w: 'full',
    h: 4,

    bgColor: 'theme.purpleBlue.normal',
  },
  button: {
    bgColor: 'white',

    borderColor: 'black',
    borderRadius: 0,
    borderWidth: 1,

    fontWeight: 'normal',

    pb: 3,
    pt: 3.5,
  },
  subTitle: {
    fontSize: ['md', 'lg', 'xl', '2xl'],
    fontWeight: 'light',
    mb: [5, 6, 8, 10],
    mt: [1, 2, 3],

    pos: 'relative',
  },
  title: {
    fontSize: ['2xl', '3xl', '4xl', '5xl'],
    fontWeight: 'medium',
  },
  wrapper: {
    alignItems: 'center',
    flexDir: 'column',
    justifyContent: 'center',

    h: '100vh',
    maxW: '100vw',
    w: 'full',
  },
};

export default styleProps;
