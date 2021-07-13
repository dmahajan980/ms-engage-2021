import { FC, useRef, useState } from 'react';
import { Flex } from '@chakra-ui/react';
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

      <MessageWindow chat={selectedChat} myId={myId} />
    </Flex>
  );
};

export default ChatPage;
