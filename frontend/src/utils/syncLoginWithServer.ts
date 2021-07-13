import { AuthenticationResult } from '@azure/msal-browser';
import axios from 'axios';

const syncLoginWithServer = async (
  authTokenResponse: AuthenticationResult,
  IP: string
) => {
  const { idToken, account, uniqueId } = authTokenResponse;

  if (account) {
    const { name, username: email } = account;
    if (!name || !email) {
      return;
    }

    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('uniqueId', uniqueId);

    try {
      const { data: resData } = await axios.post(`${IP}/auth/sign-in/`, {
        data: {
          name,
          idToken,
          email,
          id: uniqueId,
        },
      });

      localStorage.setItem('msAuthToken', resData.data);
    } catch (error) {
      throw new Error(error);
    }
  }
};

export default syncLoginWithServer;
