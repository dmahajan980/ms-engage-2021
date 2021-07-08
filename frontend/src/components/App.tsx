import { FC, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import CallPage from './CallPage';

const App: FC<{}> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Router>
      <NavigationBar isLoading={isLoading} />
      <Switch>
        <Route path='/:roomId'>
          <CallPage setIsCallLoading={setIsLoading} />
        </Route>
        <Route path='/'>{/* <div>hello, homepage</div> */}</Route>
      </Switch>
    </Router>
  );
};

export default App;
