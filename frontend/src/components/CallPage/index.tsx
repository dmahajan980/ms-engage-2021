import { FC, useState } from 'react';

import VideoWindow from './VideoWindow';
import ExitWindow from './ExitWindow';

import { Props } from './interface';

const CallPage: FC<Props> = ({ setIsCallLoading, ...props }) => {
  const [hasLeft, setHasLeft] = useState<boolean>(false);
  const renderedWindow = hasLeft ? (
    <ExitWindow rejoinCall={() => setHasLeft(false)} />
  ) : (
    <VideoWindow
      setIsCallLoading={setIsCallLoading}
      onLeave={() => setHasLeft(true)}
      {...props}
    />
  );

  return renderedWindow;
};

export default CallPage;
