import { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import CallPage from './CallPage';

const App: FC<{}> = () => {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path='/:roomId'>
          <CallPage />
        </Route>
        <Route path="/">
          {/* <div>hello, homepage</div> */}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
