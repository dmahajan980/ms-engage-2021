import { FC } from 'react';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatInput from '../ChatInput';
import Message from '../Message';

import { db } from '../../config/firebase';

import { Chat } from '../../types/Chat';

import styleProps from './styles';

interface Props {
  chat: Chat | null;
  myId: string;
}

// Takes in ID of the chatroom
const MessageWindow: FC<Props> = ({ chat, myId }) => {
  const [messages, isLoading] = useCollectionData(
    db && chat
      ? db
          .collection('chats')
          .doc(chat.chatroomId)
          .collection('messages')
          .orderBy('time', 'asc')
      : null
  );

  const renderedMessages: any[] = [];
  if (!isLoading) {
    if (messages) {
      messages.forEach((message) => {
        renderedMessages.push(
          <Flex
            key={message.id}
            justifyContent={
              message.sentBy === chat?.otherUserId ? 'flex-start' : 'flex-end'
            }
          >
            <Message
              timestamp={message.time}
              isTimeOnLeft={message.sentBy !== chat?.otherUserId}
            >
              {message.value}
            </Message>
          </Flex>
        );
      });
    }
  }

  const storeMessage = (message: string) => {
    if (db && chat) {
      const messageObj = {
        sentBy: myId,
        value: message,
        time: Date.now(),
      };
      db.collection('chats')
        .doc(chat.chatroomId)
        .collection('messages')
        .add(messageObj);

      db.collection('chatlist')
        .doc(myId)
        .collection('chatroomIds')
        .doc(chat.chatroomId)
        .update({
          lastMessage: messageObj,
        });

      db.collection('chatlist')
        .doc(chat.otherUserId)
        .collection('chatroomIds')
        .doc(chat.chatroomId)
        .update({
          lastMessage: messageObj,
        });
    }
  };

  return (
    <Flex {...styleProps.wrapper}>
      {chat ? (
        <>
          <Flex {...styleProps.detailsWrapper}>
            <Avatar name={chat.name} {...styleProps.avatar} />
            <Text {...styleProps.name}>{chat.name}</Text>
          </Flex>
          <Box {...styleProps.mainWindow}>
            <Box {...styleProps.chatBox}>{renderedMessages}</Box>
            <ChatInput onMessageSend={storeMessage} />
          </Box>
        </>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default MessageWindow;
