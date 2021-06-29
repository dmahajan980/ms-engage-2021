import { FC, useEffect, useRef } from 'react';
import { chakra } from '@chakra-ui/react';

import { Props } from './interface';

const Video = chakra('video');

const VideoTile: FC<Props> = ({ stream, ...props }) => {
  const tileRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (tileRef.current) {
      tileRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <Video
      ref={tileRef}
      autoPlay
      playsInline
      h='full'
      w='auto'
      mx='auto'
      {...props}
    />
  );
};

export default VideoTile;
