const config = {
  auth: {
    clientId: process.env.REACT_APP_MS_CLIENT_ID || '',
    redirectUri: process.env.REACT_APP_REDIRECT_URI || '',
  },
};

export default config;
