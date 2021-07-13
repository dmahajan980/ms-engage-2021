import { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Flex, IconButton, Input, Tooltip } from '@chakra-ui/react';

import SendIcon from '../Icons/Send';

import { Props } from './interface';

import styleProps from './styles';

const ChatInput: FC<Props> = ({ onMessageSend, ...props }) => {
  const [message, setMessage] = useState('');

  const inputHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value);

  const sendButtonHandler = async () => {
    try {
      setMessage('');
      await onMessageSend(message);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessageOnEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && message.length) {
      sendButtonHandler();
    }
  };

  return (
    <Flex {...styleProps.wrapper} {...props}>
      <Input
        value={message}
        placeholder='Type a message'
        onChange={inputHandler}
        onKeyDown={sendMessageOnEnter}
        {...styleProps.input}
      />
      <Tooltip label='Send message'>
        <IconButton
          isDisabled={!message.length}
          aria-label='Send Message Button'
          icon={<SendIcon {...styleProps.icon} />}
          onClick={sendButtonHandler}
          {...styleProps.sendButton}
        />
      </Tooltip>
    </Flex>
  );
};

export default ChatInput;
