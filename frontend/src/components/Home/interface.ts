import { Dispatch, SetStateAction } from 'react';

interface Props {
  onSignInSuccess: Dispatch<SetStateAction<boolean>>;
}

export type { Props };
