import React from 'react';
import ShowRoute from '../../components/routes/ShowRoute';
import Comments from '../../components/common/Comments';
// const Timestamp = require('react-timestamp');


// import ReactDOM from 'react-dom';
// const User = require('../models/user');

class IndividualUser extends React.Component {

  componentDidMount(){

  }


  render() {
    console.log(this.props);
    return (

      <section>
        <h1 className="title">Individual User Profile </h1>
        <ShowRoute userId={this.props.match.params.id} />




        <Comments />


      </section>

    );
  }
}

export default IndividualUser;
