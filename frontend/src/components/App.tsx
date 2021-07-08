import { FC, useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import CallPage from './CallPage';
import Home from './Home';
import RedirectRouter from './RedirectRouter';

const App: FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  if (!isSignedIn) {
    localStorage.removeItem('name');
    localStorage.removeItem('username');
  }
  
  return (
    <Router>
      {isSignedIn && <NavigationBar isLoading={isLoading} />}
      <Switch>
        <RedirectRouter path='/:roomId' redirectCondition={isSignedIn}>
          <CallPage setIsCallLoading={setIsLoading} />
        </RedirectRouter>
        <RedirectRouter
          path='/'
          redirectCondition={!isSignedIn}
          redirectPath='/52'
        >
          <Home onSignInSuccess={() => setIsSignedIn(true)} />
        </RedirectRouter>
      </Switch>
    </Router>
  );
};

export default App;
