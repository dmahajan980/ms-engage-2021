import { FC } from 'react';
import { Icon } from '@chakra-ui/icons';

import AllChakraProps from '../../types/AllChakraProps';

interface Props {
  isSelected: boolean;
  props?: {
    [key: string]: AllChakraProps;
  };
}

const Chat: FC<Props> = ({ isSelected, ...props }) => (
  <Icon viewBox='0 0 24 24' {...props}>
    <path
      fill='currentColor'
      d={
        isSelected
          ? 'M0 1v16.981h4v5.019l7-5.019h13v-16.981h-24zm13 12h-8v-1h8v1zm6-3h-14v-1h14v1zm0-3h-14v-1h14v1z'
          : 'M22 3v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981zm-5 6h-14v-1h14v1zm0 2h-14v1h14v-1zm-6 3h-8v1h8v-1z'
      }
    />
  </Icon>
);

export default Chat;
