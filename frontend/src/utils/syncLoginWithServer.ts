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

    console.log(name, email, uniqueId)

    localStorage.setItem('name', name);
    localStorage.setItem('email', email);

    try {
      const { data: resData } = await axios.post(`${IP}/auth/sign-in/`, {
        data: {
          name,
          idToken,
          email,
          id: uniqueId,
        },
      });

      localStorage.setItem('authToken', resData.data);
    } catch (error) {
      throw new Error(error);
    }
  }
};

export default syncLoginWithServer;
