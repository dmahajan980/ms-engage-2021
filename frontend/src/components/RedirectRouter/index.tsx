import { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Props } from './interface';

const RedirectRouter: FC<Props> = ({
  path,
  redirectCondition,
  redirectPath = '/login',
  children,
}) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        redirectCondition ? (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: location },
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default RedirectRouter;
