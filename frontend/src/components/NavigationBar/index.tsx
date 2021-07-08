import { FC } from 'react';
import { Flex, IconButton, Image, Spinner, Text } from '@chakra-ui/react';

import { Props } from './interface';

import MenuIcon from '../Icons/Menu';

import styleProps from './styles';

const NavigationBar: FC<Props> = ({
  isSignedIn = true,
  isLoading = false,
  ...props
}) => {
  return (
    <Flex {...styleProps.wrapper} {...props}>
      <Flex {...styleProps.titleWrapper}>
        {/* {isSignedIn ? (
          <IconButton
            aria-label='Open Menu'
            icon={<MenuIcon {...styleProps.icon} />}
            {...styleProps.iconButton}
          />
        ) : (
          <Image
            src='/img/logo.png'
            alt='Microsoft Logo'
            {...styleProps.logo}
          />
        )} */}
        <Text {...styleProps.title}>Cheems</Text>
      </Flex>

      {isLoading && <Spinner />}
    </Flex>
  );
};

export default NavigationBar;
