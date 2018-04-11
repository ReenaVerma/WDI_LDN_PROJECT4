import React from 'react';
import IndexRoute from '../../components/routes/IndexRoute';
import '../../assets/scss/main.scss';

// import ReactDOM from 'react-dom';
// const User = require('../models/user');

class AllUsers extends React.Component {

  render() {
    return (

      <main>
        <section className="hero is-medium hub is-bold">
          <div className="hero-body no-padding">
            <div className="has-text-centered">
              <h1 className="title">Search Users</h1>
            </div>
          </div>

        </section>

        <section className="section">
          <div className="columns">
            <div className="column"><IndexRoute /></div>
          </div>
        </section>
      </main>

    );
  }
}

export default  AllUsers;
