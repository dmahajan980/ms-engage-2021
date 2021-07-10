import { FC, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useMsal } from '@azure/msal-react';

import styleProps from './styles';
import MSLogo from '../Icons/MS';

const Login: FC<{}> = () => {
  const { instance } = useMsal();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authHandler = () => {
    setIsLoading(true);
    instance.loginPopup();
  };

  return (
    <Flex {...styleProps.wrapper}>
      <Text {...styleProps.title}>Welcome to Cheems</Text>
      <Text {...styleProps.subTitle}>
        A web-based communication platform inspired by Microsoft Teams.
      </Text>
      <Button
        isLoading={isLoading}
        leftIcon={<MSLogo mb={1} />}
        aria-label='Sign in with Microsoft'
        onClick={authHandler}
        {...styleProps.button}
      >
        Sign in with Microsoft
      </Button>
      <Box {...styleProps.borderBox} />
    </Flex>
  );
};

export default Login;
