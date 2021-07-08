import { FC, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  chakra,
  Flex,
  Icon,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { io, Socket } from 'socket.io-client';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Peer from 'simple-peer';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { motion } from 'framer-motion';

import VideoTile from '../VideoTile';
import ModalBox from '../ModalBox';
import Time from '../Time';
import JoiningDialog from '../JoiningDialog';

import useAudioVideoStream from '../../hooks/useAudioVideoStream';

import { VideoWindowProps as Props } from './interface';

import styleProps from './styles';
import Camera from '../Icons/Camera';
import Mic from '../Icons/Mic';
import CallEnd from '../Icons/CallEnd';

// Defined components.
const Video = chakra('video');
const MotionVideo = motion(Video);

// TODO: Create a socket connection post render (i.e. create this inside a useEffect hook)
// Establish socket connection.

const VideoWindow: FC<Props> = ({ setIsCallLoading, onLeave, ...props }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const [videoRef, stream] = useAudioVideoStream(!isMuted, !isCameraOff);

  const userIdRef = useRef('');
  const isInitiatorRef = useRef<boolean>(true);
  const [guestStream, setGuestStream] = useState<MediaStream | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isInfoDialogOpen,
    onOpen: onInfoDialogOpen,
    onClose: onInfoDialogClose,
  } = useDisclosure();

  let { roomId } = useParams<{ roomId: string }>();

  // Instantiates peer and signal.
  const [peer, setPeer] = useState<Peer.Instance | null>(null);
  const callerRef = useRef<string | null>(null);
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );

  useEffect(() => {
    socketRef.current = io(
      process.env.REACT_APP_SOCKET_IP || 'http://127.0.0.1:9000/'
    );
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      const myUserIdListener = (data: any) => {
        userIdRef.current = data.id;
        isInitiatorRef.current = !data.isFirstUser;
        if (data.isFirstUser) {
          setIsCallLoading(false);
        }
      };
      socketRef.current.on('my-user-id', myUserIdListener);

      const callUserListener = (otherUserId: string, signalData: any) => {
        if (peer) {
          callerRef.current = otherUserId;
          peer.signal(signalData);
        }
      };
      socketRef.current.on('call-user', callUserListener);

      const acceptedCallListener = (otherUserId: string, signalData: any) => {
        if (peer) {
          callerRef.current = otherUserId;
          peer.signal(signalData);
          setIsCallLoading(false);
        }
      };
      socketRef.current.on('accepted-call', acceptedCallListener);

      const maxLimitListener = () => {
        onOpen();
        setIsCallLoading(false);
      };
      socketRef.current.on('max-limit', maxLimitListener);

      const userLeftListener = (otherUserId: string) => {
        if (otherUserId === callerRef.current) {
          if (peer) {
            peer.destroy();
            callerRef.current = null;
            setGuestStream(null);
            if (stream) {
              setPeer(null);
            }
          }
        }
      };
      socketRef.current.on('user-left', userLeftListener);

      return () => {
        if (socketRef.current) {
          socketRef.current.off('my-user-id', myUserIdListener);
          socketRef.current.off('call-user', callUserListener);
          socketRef.current.off('accepted-call', acceptedCallListener);
          socketRef.current.off('max-limit', maxLimitListener);
          socketRef.current.off('user-left', userLeftListener);
        }
      };
    }
  }, [stream, roomId, setIsCallLoading, onOpen, peer]);

  useEffect(() => {
    // "Stream" won't change as it is stored inside ref.
    // Might get mutated, but the original reference remains the same.
    if (stream && !peer) {
      const peerInstance = new Peer({
        stream,
        initiator: isInitiatorRef.current,
        trickle: false,
      });
      isInitiatorRef.current = false;

      // Join room while signalling self info at the same time
      // Notify backend about self joining in (to enroll self in a room).
      peerInstance.on('signal', (signalData) => {
        if (socketRef.current) {
          if (callerRef.current) {
            socketRef.current.emit('accept-call', {
              signalData,
              calledBy: callerRef.current,
            });
          } else {
            socketRef.current.emit('join', {
              roomId,
              signalData,
            });
          }
        }
      });

      peerInstance.on('stream', setGuestStream);
      peerInstance.on('close', () => setGuestStream(null));
      setPeer(peerInstance);

      return () => {
        peerInstance.removeAllListeners('close');
      };
    }
  }, [roomId, stream, peer]);

  const disconnectButtonListener = () => {
    socketRef.current?.disconnect();
    callerRef.current = null;
    peer?.destroy();
    setPeer(null);
    setGuestStream(null);
    onLeave();
  };

  return (
    <Box {...styleProps.wrapper} {...props}>
      {guestStream && <VideoTile stream={guestStream} />}
      <MotionVideo
        ref={videoRef}
        layout
        autoPlay
        playsInline
        {...(guestStream ? styleProps.selfVideoFloating : styleProps.selfVideo)}
      />
      <Flex {...styleProps.actionBar}>
        <Time />
        <Flex>
          <IconButton
            aria-label={isMuted ? 'Unmute mic' : 'Mute mic'}
            icon={<Mic isMuted={isMuted} {...styleProps.icon} />}
            onClick={() => setIsMuted((prevState) => !prevState)}
            {...styleProps.iconButton}
          />
          <IconButton
            aria-label={`Turn ${isCameraOff ? 'on' : 'off'} camera`}
            icon={<Camera isOff={isCameraOff} {...styleProps.icon} />}
            onClick={() => setIsCameraOff((prevState) => !prevState)}
            {...styleProps.iconButton}
          />
          <IconButton
            aria-label='Disconnect call'
            icon={<CallEnd {...styleProps.icon} />}
            onClick={disconnectButtonListener}
            {...styleProps.iconButton}
            {...styleProps.disconnectButton}
          />
        </Flex>
        <IconButton
          aria-label={'Show call joining info'}
          icon={
            <Icon
              as={InfoOutlineIcon}
              {...styleProps.icon}
              {...styleProps.infoIcon}
            />
          }
          onClick={onInfoDialogOpen}
          {...styleProps.infoIconButton}
        />
      </Flex>

      <ModalBox
        title='Room Fully Occupied'
        message='The call you are trying to join is at max capacity. Please try again later.'
        isOpen={isOpen}
        onClose={onClose}
        hasCloseBtn={false}
      >
        <Button as={RouterLink} to='/' {...styleProps.button}>
          Return to Homepage
        </Button>
      </ModalBox>

      <JoiningDialog
        url={window.location.host + window.location.pathname}
        isOpen={isInfoDialogOpen}
        onClose={onInfoDialogClose}
      />
    </Box>
  );
};

export default VideoWindow;
