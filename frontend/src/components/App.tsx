import { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import CallPage from './CallPage';
import Login from './Login';
import RedirectRouter from './RedirectRouter';

const App: FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  useEffect(() => {
    if (!isSignedIn) {
      localStorage.removeItem('name');
      localStorage.removeItem('username');
    }
  }, [isSignedIn]);

  return (
    <Router>
      {isSignedIn && <NavigationBar isLoading={isLoading} />}
      <Switch>
        <RedirectRouter
          path='/login'
          redirectCondition={isSignedIn}
          redirectPath='/'
        >
          <Login onSignInSuccess={() => setIsSignedIn(true)} />
        </RedirectRouter>
        <RedirectRouter path='/:roomId' redirectCondition={!isSignedIn}>
          <CallPage setIsCallLoading={setIsLoading} />
        </RedirectRouter>
      </Switch>
    </Router>
  );
};

export default App;
