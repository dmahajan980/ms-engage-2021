import { FC, useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from '@azure/msal-browser';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { Route, Switch } from 'react-router-dom';

import SideBar from '../SideBar';
import ChatPage from '../ChatPage';

import { useIpContext } from '../../context/IP';
import syncLoginWithServer from '../../utils/syncLoginWithServer';

import { SelectedSection } from '../../types/SelectedSection';

import styleProps from './styles';

const Home: FC<{}> = () => {
  const { instance, inProgress, accounts } = useMsal();
  const toast = useToast();
  const IP = useIpContext();

  const [selected, setSelected] = useState(SelectedSection.Chat);

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

  return (
    <Flex {...styleProps.wrapper}>
      <SideBar selectedSection={selected} onSectionClick={setSelected} />
      <Box {...styleProps.contentWrapper}>
        <Switch>
          <Route exact path='/chat'>
            <ChatPage />
          </Route>
          <Route exact path='/call'>
            Call
          </Route>
        </Switch>
      </Box>
    </Flex>
  );
};

export default Home;
