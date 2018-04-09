import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import FlashMessages from './components/common/FlashMessages';
import Navbar from './components/common/Navbar';
// import DarkSky from './components/common/DarkSky';

import Home from './components/pages/Home';
import Hub from './components/pages/Hub';
import AllUsers from './components/pages/AllUsers';
import User from './components/pages/User';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// import ShowRoute from './components/routes/ShowRoute';

import 'bulma';

class App extends React.Component {
  render() {
    return (



      <BrowserRouter>
        <main>
          <Navbar />

          <section className="section">
            <h1 className="title">Smart Travel</h1>
            {/* <DarkSky /> */}
            <Switch>

              <Route path="/users/:id" component={User} />
              <Route path="/users" component={AllUsers} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/hub" component={Hub} />
              <Route path="/" component={Home} />

            </Switch>

          </section>
        </main>
      </BrowserRouter>

    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
