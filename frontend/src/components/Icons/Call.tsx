import { FC } from 'react';
import { Icon } from '@chakra-ui/icons';

import AllChakraProps from '../../types/AllChakraProps';

interface Props {
  isSelected: boolean;
  props?: {
    [key: string]: AllChakraProps;
  };
}

const Call: FC<Props> = ({ isSelected, ...props }) => (
  <Icon viewBox='0 0 24 24' {...props}>
    <path
      fill='currentColor'
      d={
        isSelected
          ? 'M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z'
          : 'M6.176 1.322l2.844-1.322 4.041 7.89-2.724 1.341c-.538 1.259 2.159 6.289 3.297 6.372.09-.058 2.671-1.328 2.671-1.328l4.11 7.932s-2.764 1.354-2.854 1.396c-7.862 3.591-19.103-18.258-11.385-22.281zm1.929 1.274l-1.023.504c-5.294 2.762 4.177 21.185 9.648 18.686l.971-.474-2.271-4.383-1.026.5c-3.163 1.547-8.262-8.219-5.055-9.938l1.007-.497-2.251-4.398z'
      }
    />
  </Icon>
);

export default Call;
