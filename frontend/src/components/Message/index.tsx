import { FC, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';

import styleProps from './styles';

const Message: FC<{ timestamp: number; isTimeOnLeft: boolean }> = ({
  children,
  timestamp,
  isTimeOnLeft,
  ...props
}) => {
  const date = new Date(timestamp);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Flex
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...styleProps.messageWrapper}
      flexDir={isTimeOnLeft ? 'row' : 'row-reverse'}
    >
      {isHovering && (
        <Text {...styleProps.time}>
          {date.getHours()}:{date.getMinutes() < 10 ? '0' : ''}
          {date.getMinutes()}
        </Text>
      )}
      <Text {...styleProps.message} {...props}>
        {children}
      </Text>
    </Flex>
  );
};

export default Message;
