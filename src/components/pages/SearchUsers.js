import React from 'react';
import IndexRoute from '../../components/routes/IndexRoute';
import '../../assets/scss/main.scss';

// import ReactDOM from 'react-dom';
// const User = require('../models/user');

class AllUsers extends React.Component {

  render() {
    return (

      <main>
        <section className="hero hub is-bold section-top">
          <div className="hero-body no-padding">
            <div className="has-text-centered">
              <h1 className="is-size-1 has-text-white headertitle">Search Users</h1>
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
