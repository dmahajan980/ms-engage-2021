import { FC } from 'react';
import {
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

import copyToClipboard from '../../utils/copyToClipboard';

import { Props } from './interface';

import styleProps from './styles';

const JoiningDialog: FC<Props> = ({ url, isOpen, onClose, ...props }) => {
  const toast = useToast();
  const copySuccessToast = () => {
    toast({
      title: 'Text copied',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
      {...styleProps.wrapper}
      {...props}
    >
      <ModalOverlay />
      <ModalContent {...styleProps.modalContent}>
        <ModalHeader>Your call is ready</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Share the call link with someone you want to talk</Text>
          <Flex {...styleProps.copyBox}>
            <Text isTruncated>{url}</Text>
            <IconButton
              icon={<CopyIcon />}
              aria-label='Copy link'
              onClick={() => copyToClipboard(url, copySuccessToast)}
              {...styleProps.copyButton}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default JoiningDialog;
