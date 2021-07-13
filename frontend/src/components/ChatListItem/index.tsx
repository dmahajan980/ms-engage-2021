import { FC, MouseEventHandler } from 'react';
import { Avatar, Flex, Text } from '@chakra-ui/react';

import { Chat } from '../../types/Chat';

import styleProps from './styles';

interface Props {
  data: Chat;
  onClick: MouseEventHandler<HTMLDivElement>;
  isSelected: boolean;
  myId: string;
  [key: string]: any;
}

const ChatListItem: FC<Props> = ({
  data,
  onClick,
  myId,
  isSelected,
  ...props
}) => {
  const { name, lastMessage } = data;
  const date = lastMessage && new Date(lastMessage.time);

  return lastMessage ? (
    <Flex
      onClick={onClick}
      {...styleProps.wrapper}
      {...(isSelected && styleProps.selected)}
      {...props}
    >
      <Flex {...styleProps.dataWrapperParent}>
        <Avatar name={name} {...styleProps.avatar} />
        <Flex {...styleProps.dataWrapper}>
          <Text {...styleProps.name}>{name}</Text>
          <Text isTruncated {...styleProps.message}>
            {myId === lastMessage.sentBy ? 'You: ' : ''}
            {lastMessage.value}
          </Text>
        </Flex>
      </Flex>

      {date ? (
        <Flex>
          <Text {...styleProps.time}>
            {date.getHours()}:{date.getMinutes()}
          </Text>
        </Flex>
      ) : null}
    </Flex>
  ) : null;
};

export default ChatListItem;
