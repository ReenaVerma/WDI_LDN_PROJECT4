import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FlashMessages from './components/common/FlashMessages';
import ProtectedRoute from './components/common/ProtectedRoute';
import NotFound from './components/common/NotFound';

import Navbar from './components/common/Navbar';
import HomePage from './components/pages/HomePage';
import HubPage from './components/pages/HubPage';
import SearchUsers from './components/pages/SearchUsers';
import UserPage from './components/pages/UserPage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Show from './components/auth/Show';
import 'bulma';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <section>
          <Navbar />
          {/* <DarkSky /> */}
          <FlashMessages />
          <Switch>
            {/* <ProtectedRoute path="/hub" component={HubPage} /> */}
            <Route path="/hub" component={HubPage} />
            <ProtectedRoute path="/hub/:id" component={Show} />
            <ProtectedRoute path="/users/:id" component={UserPage} />
            <ProtectedRoute path="/users" component={SearchUsers} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/" component={HomePage} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
