import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import FlashMessages from './components/common/FlashMessages';
import Navbar from './components/common/Navbar';
// import DarkSky from './components/common/DarkSky';

import HomePage from './components/pages/HomePage';
import HubPage from './components/pages/HubPage';
import SearchUsers from './components/pages/SearchUsers';
import UserPage from './components/pages/UserPage';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Show from './components/auth/Show';
import ProtectedRoute from './components/common/ProtectedRoute';
// import ShowRoute from './components/routes/ShowRoute';

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

            <ProtectedRoute path="/hub/:id" component={Show} />
            <ProtectedRoute path="/users/:id" component={UserPage} />
            <ProtectedRoute path="/users" component={SearchUsers} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/hub" component={HubPage} />
            <Route path="/" component={HomePage} />

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
