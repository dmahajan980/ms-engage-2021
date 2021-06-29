import { FC } from 'react';
import { Icon } from '@chakra-ui/icons';

import AllChakraProps from '../../types/AllChakraProps';

interface Props {
  isOff: boolean;
  props?: {
    [key: string]: AllChakraProps;
  };
}

const Camera: FC<Props> = ({ isOff, ...props }) => (
  <Icon viewBox='0 0 24 24' {...props}>
    <path
      fill='currentColor'
      d={
        isOff
          ? 'M18 10.48V6c0-1.1-.9-2-2-2H6.83l2 2H16v7.17l2 2v-1.65l4 3.98v-11l-4 3.98zM16 16L6 6 4 4 2.81 2.81 1.39 4.22l.85.85C2.09 5.35 2 5.66 2 6v12c0 1.1.9 2 2 2h12c.34 0 .65-.09.93-.24l2.85 2.85 1.41-1.41L18 18l-2-2zM4 18V6.83L15.17 18H4z'
          : 'M18 10.48V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.48l4 3.98v-11l-4 3.98zm-2-.79V18H4V6h12v3.69z'
      }
    />
  </Icon>
);

export default Camera;
