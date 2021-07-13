import { FC, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { Anchorme } from 'react-anchorme';

import MessageLink from "../MessageLink";

import styleProps from './styles';

const Message: FC<{ timestamp: number; isTimeOnLeft: boolean; children: string; }> = ({
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
      <Text
        {...styleProps.message}
        {...props}
        {...(isTimeOnLeft && { bgColor: '#E9EAF6', color: 'black' })}
      >
        <Anchorme linkComponent={MessageLink}>{children}</Anchorme>
      </Text>
    </Flex>
  );
};

export default Message;
