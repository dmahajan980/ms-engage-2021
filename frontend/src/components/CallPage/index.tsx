import { FC, useEffect } from 'react';
import { Box, chakra } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

import useAudioVideoStream from '../../hooks/useAudioVideoStream';

import styleProps from './styles';

// Defined components.
const Video = chakra('video');

// Establish socket connection.
const socket = io('http://127.0.0.1:8000/');

const CallPage: FC<{}> = () => {
  let { roomId } = useParams<{ roomId: string }>();
  useEffect(() => {
    // Notifies backend about current user joining in.
    socket.emit('join', roomId, 10);

    // Listens for other users joining in.
    socket.on('user-joined', (userId) => console.log(userId));
  }, [roomId]);

  const [videoRef] = useAudioVideoStream();

  return (
    <Box {...styleProps.wrapper}>
      <Video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        {...styleProps.selfVideo}
      />
    </Box>
  );
};

export default CallPage;
