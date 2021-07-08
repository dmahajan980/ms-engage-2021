import { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';

import { Props } from './interface';

import styleProps from './styles';

const ModalBox: FC<Props> = ({
  title,
  isOpen,
  onClose,
  message,
  children,
  hasCloseBtn = true,
  ...props
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    isCentered
    closeOnOverlayClick={hasCloseBtn}
    {...styleProps.wrapper}
    {...props}
  >
    <ModalOverlay />
    <ModalContent {...styleProps.modalContent}>
      <ModalHeader>{title}</ModalHeader>
      {hasCloseBtn && <ModalCloseButton />}
      <ModalBody>
        <Text>{message}</Text>
      </ModalBody>

      <ModalFooter>{children}</ModalFooter>
    </ModalContent>
  </Modal>
);

export default ModalBox;
