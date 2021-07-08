import { FC } from 'react';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import MicrosoftLogin from 'react-microsoft-login';

import { Props } from './interface';

import styleProps from './styles';

const Home: FC<Props> = ({ onSignInSuccess }) => {
  const toast = useToast();
  
  const authHandler = (err: any, data: any) => {
    if (err) {
      toast({
        title: 'Failed to sign in',
        position: 'bottom-right',
        status: 'error',
        variant: 'left-accent',
        isClosable: true,
      });
      return;
    }
    
    // send ID_token or Token_ID
    const { name, userName, idToken } = data.account;
    localStorage.setItem('name', name);
    localStorage.setItem('username', userName);
    console.log(name, userName, idToken);
  };

  return (
    <Flex {...styleProps.wrapper}>
      <Text {...styleProps.title}>Welcome to Cheems</Text>
      <Text {...styleProps.subTitle}>
        A web-based communication platform inspired by Microsoft Teams.
      </Text>
      <MicrosoftLogin
        clientId={process.env.REACT_APP_MS_CLIENT_ID || ''}
        authCallback={authHandler}
        redirectUri='http://localhost:3000/'
      />
      <Box {...styleProps.borderBox} />
    </Flex>
  );
};

export default Home;
