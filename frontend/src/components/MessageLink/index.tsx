import { FC } from 'react';
import { Link } from '@chakra-ui/react';

import styleProps from './styles';

const MessageLink: FC = ({ children, ...props }) => {
  return (
    <Link {...styleProps.link} {...props}>
      {children}
    </Link>
  );
};

export default MessageLink;
