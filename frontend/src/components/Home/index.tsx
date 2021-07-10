import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from '@azure/msal-browser';
import { useToast } from '@chakra-ui/react';

import { useIpContext } from '../../context/IP';

import syncLoginWithServer from '../../utils/syncLoginWithServer';

const Home = () => {
  const { instance, inProgress, accounts } = useMsal();
  const toast = useToast();
  const IP = useIpContext();

  useEffect(() => {
    const accessTokenRequest = {
      scopes: ['user.read'],
      account: accounts[0],
    };
    if (accounts[0].homeAccountId) {
      localStorage.setItem('homeAccountId', accounts[0].homeAccountId);
    }

    if (inProgress === InteractionStatus.None) {
      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((authTokenRes) => syncLoginWithServer(authTokenRes, IP))
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance
              .acquireTokenPopup(accessTokenRequest)
              .then((authTokenRes) => syncLoginWithServer(authTokenRes, IP))
              .catch((err) => console.error(err));
          }
          toast({
            title: 'Failed to sign in',
            position: 'bottom-right',
            status: 'error',
            variant: 'left-accent',
            isClosable: true,
          });
          console.error(error);
        });
    }
  }, [instance, accounts, inProgress, toast, IP]);

  return <div></div>;
};

export default Home;
