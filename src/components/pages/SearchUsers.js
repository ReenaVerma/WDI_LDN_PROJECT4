import React from 'react';
import IndexRoute from '../../components/routes/IndexRoute';
import Footer from '../../components/common/Footer';
import '../../assets/scss/main.scss';

// import ReactDOM from 'react-dom';
// const User = require('../models/user');

class AllUsers extends React.Component {

  render() {
    return (

      <main className="grey">
        <section className="hero hub-image">
          <div className="hero-body no-padding">
            <div className="has-text-centered">
              <h1 className="hub-title">Search Users</h1>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="columns">
            <div className="column"><IndexRoute /></div>
          </div>
        </section>
        <Footer />
      </main>

    );
  }
}

export default  AllUsers;
