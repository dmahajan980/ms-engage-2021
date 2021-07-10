import { FC } from 'react';
import { Box, Flex, Text, useToast } from '@chakra-ui/react';
import MicrosoftLogin from 'react-microsoft-login';
import axios from 'axios';

import { Props } from './interface';

import styleProps from './styles';

const Login: FC<Props> = ({ onSignInSuccess }) => {
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

    onSignInSuccess();
    
    const { name, userName, accessToken } = data.account;
    localStorage.setItem('name', name);
    localStorage.setItem('username', userName);
    localStorage.setItem('accessToken', accessToken);

    axios.post('http://localhost:9000/auth/sign-in/', { data });
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

export default Login;
