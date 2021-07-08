import { FC } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { ExitWindowProps } from './interface';

const ExitWindow: FC<ExitWindowProps> = ({ rejoinCall, ...props }) => {
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      h='100vh'
      direction='column'
      {...props}
    >
      <Text fontSize={['2xl', '3xl', '4xl']} mb={5}>
        You left the meeting
      </Text>
      <Flex>
        <Button
          as={RouterLink}
          to='/'
          mr={3}
          borderRadius={0}
          bg='transparent'
          _active={{ bg: 'transparent' }}
          _hover={{ bg: 'transparent' }}
          borderWidth={2}
          borderColor='theme.purpleBlue.normal'
        >
          Go to Home Page
        </Button>
        <Button
          onClick={rejoinCall}
          borderRadius={0}
          bg='theme.purpleBlue.normal'
          _active={{ bg: 'theme.purpleBlue.normal' }}
          _hover={{ bg: 'theme.purpleBlue.normal' }}
          color='white'
        >
          Rejoin call
        </Button>
      </Flex>
    </Flex>
  );
};

export default ExitWindow;
