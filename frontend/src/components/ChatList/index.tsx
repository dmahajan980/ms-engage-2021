import { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { v4 as uuidv4 } from 'uuid';

import ChatListItem from '../ChatListItem';
import SearchBar from '../SearchBar';

import { db } from '../../config/firebase';

import { Chat } from '../../types/Chat';

import styleProps from './styles';

interface Props {
  chats: Chat[];
  selected: Chat | null;
  myId: string;
  onChatSelect: Dispatch<SetStateAction<Chat | null>>;
}

const ChatList: FC<Props> = ({ chats, myId, selected, onChatSelect }) => {
  const [guestData, setGuestData] = useState<any>(null);
  const [hasChatroom, setHasChatroom] = useState<boolean>(false);

  const renderedChats = chats.map((chat) => (
    <ChatListItem
      key={chat.chatroomId}
      data={chat}
      myId={myId}
      isSelected={selected?.otherUserId === chat.otherUserId}
      onClick={() => onChatSelect(chat)}
    />
  ));

  const { isOpen, onOpen, onClose } = useDisclosure();

  const createRoom = (guestData: any) => {
    if (db) {
      if (myId) {
        const chatroomId = uuidv4();
        const chatroomData = {
          chatroomId,
          name: guestData.name,
          otherUserId: guestData.value,
        };

        db.collection('chatroom').doc(chatroomId).set({
          messages: [],
        });
        db.collection('chatlist')
          .doc(myId)
          .collection('chatroomIds')
          .doc(chatroomId)
          .set(chatroomData);
        db.collection('chatlist')
          .doc(guestData.value)
          .collection('chatroomIds')
          .doc(chatroomId)
          .set({
            otherUserId: myId,
            name: localStorage.getItem('name'),
            chatroomId,
          });

        onChatSelect(chatroomData);
      }
    }
  };

  const onSearchSelection = async (data: any) => {
    if (db) {
      // If a user is found, it means that the user already has a chatroom with the
      // selected user. In that case, set the button to "Go to chatroom" and close popup.
      // Otherwise, create a new chatroom for them

      db.collection('chatlist')
        .doc(myId)
        .collection('chatroomIds')
        .where('otherUserId', '==', data.value)
        .get()
        .then((results) => {
          if (results.empty) {
            setGuestData(data);
            setHasChatroom(false);
          } else {
            results.forEach((doc) => {
              const result = doc.data();
              setHasChatroom(true);
              setGuestData(result);
            });
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <Box {...styleProps.wrapper}>
        <Flex {...styleProps.header}>
          <Text {...styleProps.chatText}>Chat</Text>
          <Tooltip label='Create new chat'>
            <IconButton
              icon={<AddIcon {...styleProps.icon} />}
              aria-label='Create new chat'
              onClick={onOpen}
              {...styleProps.iconButton}
            />
          </Tooltip>
        </Flex>
        <Box {...styleProps.chatListWrapper}>{renderedChats}</Box>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent {...styleProps.modal}>
          <ModalHeader>Create new Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SearchBar setTerm={onSearchSelection} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} {...styleProps.modalButton}>
              Close
            </Button>
            <Button
              isDisabled={!guestData}
              onClick={() => {
                if (!hasChatroom) {
                  createRoom(guestData);
                } else {
                  onChatSelect(guestData);
                }
                onClose();
              }}
              {...styleProps.createModalButton}
            >
              {hasChatroom ? 'Go to chatroom' : 'Create chatroom'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatList;
