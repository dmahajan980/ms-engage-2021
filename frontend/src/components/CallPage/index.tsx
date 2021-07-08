import { FC, useEffect, useRef, useState } from 'react';
import { Box, chakra, Flex, IconButton } from '@chakra-ui/react';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Peer from 'simple-peer';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { motion } from 'framer-motion';

import VideoTile from '../VideoTile';

import useAudioVideoStream from '../../hooks/useAudioVideoStream';

import styleProps from './styles';
import Camera from '../Icons/Camera';
import Mic from '../Icons/Mic';

// Defined components.
const Video = chakra('video');
const MotionVideo = motion(Video);

// TODO: Create a socket connection post render (i.e. create this inside a useEffect hook)
// Establish socket connection.

const CallPage: FC<{}> = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const [videoRef, stream] = useAudioVideoStream(!isMuted, !isCameraOff);

  const userIdRef = useRef('');
  const [guestStreams, setGuestStreams] = useState<MediaStream[]>([]);

  let { roomId } = useParams<{ roomId: string }>();

  // Instantiates peer and signal.
  const callerRef = useRef<string | null>(null);
  const peerRef = useRef<Peer.Instance | null>(null);
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SOCKET_IP || 'http://127.0.0.1:9000/');

    socketRef.current.on('my-user-id', (userId) => {
      console.log(userId);
      userIdRef.current = userId;
    });

    socketRef.current.on('call-user', (otherUserId, signalData) => {
      if (peerRef.current) {
        callerRef.current = otherUserId;
        peerRef.current.signal(signalData);
      }
    });

    socketRef.current.on('accepted-call', (otherUserId, signalData) => {
      if (peerRef.current) {
        callerRef.current = otherUserId;
        peerRef.current.signal(signalData);
      }
    });
  }, [stream, roomId]);

  useEffect(() => {
    if (stream && !peerRef.current) {
      peerRef.current = new Peer({
        stream,
        initiator: true,
        trickle: false,
      });

      // Join room while signalling self info at the same time
      // Notify backend about self joining in (to enroll self in a room).
      peerRef.current.on('signal', (signalData) => {
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

      peerRef.current.on('stream', (guestStream) =>
        setGuestStreams((prevStreams) => [...prevStreams, guestStream])
      );
    }
  }, [roomId, stream]);

  const renderedVideos = guestStreams.map((stream) => (
    <VideoTile key={stream.id} stream={stream} />
  ));

  return (
    <Box {...styleProps.wrapper}>
      {renderedVideos}
      <MotionVideo
        ref={videoRef}
        layout
        autoPlay
        playsInline
        {...(guestStreams.length === 0
          ? styleProps.selfVideo
          : styleProps.selfVideoFloating)}
      />
      <Flex {...styleProps.actionBar}>
        <IconButton
          aria-label={isMuted ? 'Unmute Mic' : 'Mute Mic'}
          icon={<Mic isMuted={isMuted} {...styleProps.icon} />}
          onClick={() => setIsMuted((prevState) => !prevState)}
          {...styleProps.iconButton}
        />
        <IconButton
          aria-label={`Turn ${isCameraOff ? 'on' : 'off'} Camera`}
          icon={<Camera isOff={isCameraOff} {...styleProps.icon} />}
          onClick={() => setIsCameraOff((prevState) => !prevState)}
          {...styleProps.iconButton}
        />
      </Flex>
    </Box>
  );
};

export default CallPage;
