import { FC, useLayoutEffect, useRef } from 'react';
import { Avatar, Box, Flex, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { PlusSquareIcon } from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';

import ChatInput from '../ChatInput';
import Message from '../Message';

import { db } from '../../config/firebase';

import styleProps from './styles';

interface Props {
  myId: string;
  chatroomId: string;
  userName: string;
  userId: string;
}

// Takes in ID of the chatroom
const MessageWindow: FC<Props> = ({ myId, chatroomId, userId, userName }) => {
  const [messages, isLoading] = useCollectionData(
    db && chatroomId
      ? db
          .collection('chats')
          .doc(chatroomId)
          .collection('messages')
          .orderBy('time', 'asc')
      : null
  );

  const lastMessageRef = useRef<HTMLDivElement>(null);
  const renderedMessages: any[] = [];
  if (!isLoading) {
    if (messages) {
      messages.forEach((message, index) => {
        renderedMessages.push(
          <Flex
            key={`${message.time}${message.sentBy}`}
            justifyContent={
              message.sentBy === userId ? 'flex-start' : 'flex-end'
            }
            ref={lastMessageRef}
            {...(index === messages.length - 1 && { ref: lastMessageRef })}
          >
            <Message
              timestamp={message.time}
              isTimeOnLeft={message.sentBy !== userId}
            >
              {message.value}
            </Message>
          </Flex>
        );
      });
    }
  }

  const storeMessage = (message: string) => {
    if (db && chatroomId) {
      const messageObj = {
        sentBy: myId,
        value: message,
        time: Date.now(),
      };
      db.collection('chats')
        .doc(chatroomId)
        .collection('messages')
        .add(messageObj);

      db.collection('chatlist')
        .doc(myId)
        .collection('chatroomIds')
        .doc(chatroomId)
        .update({
          lastMessage: messageObj,
        });

      db.collection('chatlist')
        .doc(userId)
        .collection('chatroomIds')
        .doc(chatroomId)
        .update({
          lastMessage: messageObj,
        });
    }
  };

  const inviteUser = () => {
    storeMessage(`
      Hey, I would like to have a call with you.
      To join the call, click on this invite link below:
    `);
    setTimeout(() => {
      storeMessage(`${window.location.href}room/${uuidv4()}`);
    }, 300);
  }

  useLayoutEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <Flex {...styleProps.wrapper}>
      {chatroomId ? (
        <>
          <Flex {...styleProps.detailsWrapper}>
            <Flex {...styleProps.details}>
              <Avatar name={userName} {...styleProps.avatar} />
              <Text {...styleProps.name}>{userName}</Text>
            </Flex>
            <Flex>
              <Tooltip
                label={`Invite ${userName.split(' ')[0]} for a call`}
                placement='left'
              >
                <IconButton
                  icon={<PlusSquareIcon {...styleProps.inviteIcon} />}
                  aria-label='Invite user'
                  onClick={inviteUser}
                  {...styleProps.inviteIconButton}
                />
              </Tooltip>
            </Flex>
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
