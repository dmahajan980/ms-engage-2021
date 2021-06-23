import { MutableRefObject, useEffect, useRef } from 'react';

type AudioVideoStreamHook = (
  isAudioEnabled?: boolean,
  isVideoEnabled?: boolean
) => [
  MutableRefObject<HTMLVideoElement | null>,
  MutableRefObject<MediaStream | null>
];

const useAudioVideoStream: AudioVideoStreamHook = (
  isAudioEnabled = true,
  isVideoEnabled = true
) => {
  const videoElemRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Gets the stream data related to the user.
    window.navigator.mediaDevices
      .getUserMedia({
        audio: isAudioEnabled,
        video: isVideoEnabled && {
          width: { min: 480, ideal: 1080, max: 1440 },
          height: { min: 480, ideal: 720, max: 1080 },
          facingMode: 'user',
        },
      })
      .then((stream) => {
        streamRef.current = stream;
        if (videoElemRef.current) {
          videoElemRef.current.srcObject = stream;
        }
      })
      // TODO: Handle errors / corner cases.
      .catch((err) => console.error(err));

    // Stops the old stream to avoid any memory leaks.
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          if (track.readyState === 'live') {
            track.stop();
          }
        });
      }
    };
  }, [isAudioEnabled, isVideoEnabled]);

  return [videoElemRef, streamRef];
};

export default useAudioVideoStream;
