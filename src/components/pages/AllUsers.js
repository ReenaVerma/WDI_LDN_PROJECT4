import React from 'react';
import IndexRoute from '../../components/routes/IndexRoute';

// import ReactDOM from 'react-dom';
// const User = require('../models/user');

class AllUsers extends React.Component {

  render() {
    return (

      <section>
        <h1 className="title">Show All Users </h1>
        <IndexRoute />
      </section>

    );
  }
}

export default  AllUsers;
