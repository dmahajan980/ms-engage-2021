import { Dispatch, SetStateAction } from 'react';
import { Instance } from 'simple-peer';

interface PeerConnections {
  key?: Instance;
}

interface Props {
  setIsCallLoading: Dispatch<SetStateAction<boolean>>;
  props?: any[];
}

export type { PeerConnections, Props };
