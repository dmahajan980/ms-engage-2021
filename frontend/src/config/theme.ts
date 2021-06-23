import { extendTheme } from '@chakra-ui/react';

const config = {
  useSystemColorMode: false,
};

const colors = {
  theme: {
    purpleBlue: {
      light: '#6264A7',
      normal: '#565A96',
      dark: '#464775',
    },
  },
};

// Styles applied to matching HTML elements on the page.
const styles = {
  global: () => ({
    body: {
      bg: '#f5f5f5',

      // Font styles
      color: '#222222',
      fontFamily: `Hind, Helvetica, Arial`,
    },
  }),
};

const typography = {
  letterSpacings: {
    slightlyWide: '0.0125rem',
  },
};

export default extendTheme({ colors, config, styles, typography });
