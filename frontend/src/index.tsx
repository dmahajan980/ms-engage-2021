import React from 'react';
import { render as renderReactDOM } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './components/App';

import HindFont from './config/HindFont';
import theme from './config/theme';

renderReactDOM(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <HindFont />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
