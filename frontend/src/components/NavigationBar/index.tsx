import { FC } from 'react';
import {
  Avatar,
  AvatarBadge,
  Flex,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';

import { Props } from './interface';

import MenuIcon from '../Icons/Menu';

import styleProps from './styles';

const NavigationBar: FC<Props> = ({ isSignedIn = true, ...props }) => {
  return (
    <Flex {...styleProps.wrapper} {...props}>
      <Flex {...styleProps.titleWrapper}>
        {isSignedIn ? (
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
        )}
        <Text {...styleProps.title}>Microsoft Teams</Text>
      </Flex>

      {isSignedIn && (
        <IconButton
          aria-label='User options'
          icon={
            <Avatar {...styleProps.avatar}>
              <AvatarBadge {...styleProps.badgeOnline} />
            </Avatar>
          }
          {...styleProps.avatarButton}
        />
      )}
    </Flex>
  );
};

export default NavigationBar;
