import { MutableRefObject, useEffect, useRef, useState } from 'react';

type AudioVideoStreamHook = (
  isAudioEnabled?: boolean,
  isVideoEnabled?: boolean
) => [MutableRefObject<HTMLVideoElement | null>, MediaStream | null];

const useAudioVideoStream: AudioVideoStreamHook = (
  isAudioEnabled = true,
  isVideoEnabled = true
) => {
  const videoElemRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    let streamData: MediaStream | null = null;

    // Gets the stream data related to the user.
    window.navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: { min: 480, ideal: 1080, max: 1440 },
          height: { min: 480, ideal: 720, max: 1080 },
          facingMode: 'user',
        },
      })
      .then((stream) => {
        streamData = stream;
        setStream(stream);
        if (videoElemRef.current) {
          videoElemRef.current.srcObject = stream;
        }
      })
      // TODO: Handle errors / corner cases.
      .catch((err) => console.error(err));

    // Stops the old stream to avoid any memory leaks.
    return () => {
      if (streamData) {
        streamData.getTracks().forEach((track) => {
          if (track.readyState === 'live') {
            track.stop();
          }
        });
      }
    };
  }, []);

  useEffect(() => {
    stream
      ?.getAudioTracks()
      .forEach((track) => (track.enabled = isAudioEnabled));
  }, [isAudioEnabled, stream]);

  useEffect(() => {
    stream
      ?.getVideoTracks()
      .forEach((track) => (track.enabled = isVideoEnabled));
  }, [isVideoEnabled, stream]);

  return [videoElemRef, stream];
};

export default useAudioVideoStream;
