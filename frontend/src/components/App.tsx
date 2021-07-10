import { FC, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';

import NavigationBar from './NavigationBar';
import CallPage from './CallPage';
import Login from './Login';
import Home from './Home';

import { IpProvider } from '../context/IP';

import pcaConfig from '../config/pca';

const pca = new PublicClientApplication(pcaConfig);

const App: FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Router>
      <IpProvider>
        <MsalProvider instance={pca}>
          <UnauthenticatedTemplate>
            <Login />
          </UnauthenticatedTemplate>

          <AuthenticatedTemplate>
            <NavigationBar isLoading={isLoading} />
            <Switch>
              <Route path='/:roomId'>
                <CallPage setIsCallLoading={setIsLoading} />
              </Route>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </AuthenticatedTemplate>
        </MsalProvider>
      </IpProvider>
    </Router>
  );
};

export default App;
export { pca };
