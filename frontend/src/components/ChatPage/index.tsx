import { FC, useRef, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import ChatList from '../ChatList';
import MessageWindow from '../MessageWindow';

import { db } from '../../config/firebase';

import { Chat } from '../../types/Chat';

const ChatPage: FC<{}> = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [myId] = useState<any>(() => localStorage.getItem('uniqueId'));

  const [chatList, isLoading] = useCollectionData(
    db ? db.collection('chatlist').doc(myId).collection('chatroomIds') : null
  );

  const chatsRef = useRef<any>([]);
  if (!isLoading) {
    chatsRef.current = chatList;
  }

  return (
    <Flex>
      <ChatList
        myId={myId}
        chats={chatsRef.current}
        selected={selectedChat}
        onChatSelect={setSelectedChat}
      />

      {selectedChat ? (
        <MessageWindow
          chatroomId={selectedChat.chatroomId}
          userName={selectedChat.name}
          userId={selectedChat.otherUserId}
          myId={myId}
        />
      ) : (
        <Flex
          h='calc(100vh - 3rem)'
          w='calc(100% - 20rem)'
          alignItems='center'
          justifyContent='center'
        >
          <Text fontSize='xl' fontWeight='light'>
            Open a chat or create a new chat to start messaging.
          </Text>
        </Flex>
      )}
    </Flex>
  );
};

export default ChatPage;
