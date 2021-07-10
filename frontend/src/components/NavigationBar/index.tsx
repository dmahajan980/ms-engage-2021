import { FC } from 'react';
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';

import { Props } from './interface';

import styleProps from './styles';

const NavigationBar: FC<Props> = ({ isLoading = false, ...props }) => {
  const { instance, inProgress, accounts } = useMsal();

  const account = accounts[0];
  let name = account.name ? account.name : 'Guest';
  let email = account.username ? account.username : '';

  const signOut = () => {
    const homeAccountId = localStorage.getItem('homeAccountId');
    if (homeAccountId) {
      const logoutRequest = {
        account: instance.getAccountByHomeId(homeAccountId),
        postLogoutRedirectUri: process.env.REACT_APP_REDIRECT_URI,
      };
      instance.logoutRedirect(logoutRequest);
    }
  };

  return (
    <Flex {...styleProps.wrapper} {...props}>
      <Flex {...styleProps.titleWrapper}>
        <Text {...styleProps.title}>Cheems</Text>
      </Flex>

      <Flex>
        {isLoading && <Spinner />}
        <Menu isLazy>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<Avatar name={name} {...styleProps.icon} />}
            {...styleProps.iconButton}
          />
          {inProgress !== InteractionStatus.None ? (
            <></>
          ) : (
            <MenuList {...styleProps.menuList}>
              <Box {...styleProps.detailsBox}>
                <Text {...styleProps.detailsLine}>Signed in as:</Text>
                <Text {...styleProps.name}>{name}</Text>
                {!email ? '' : <Text {...styleProps.email}>{email}</Text>}
              </Box>
              <MenuDivider />
              <MenuItem onClick={signOut} {...styleProps.menuOption}>
                Sign out
              </MenuItem>
            </MenuList>
          )}
        </Menu>
      </Flex>
    </Flex>
  );
};

export default NavigationBar;
