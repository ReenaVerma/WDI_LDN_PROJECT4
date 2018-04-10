import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

class IndexRoute extends React.Component {

  state = {
    users: [],
    lastLogin: null
  }

  // componentDidMount(req, res) {
  //
  //   axios.get('api/users')
  //     .then(users => res.json(users)
  //       .then(console.log('this is logging ' + users))
  //     );
  // }

  componentDidMount(){
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }, () =>  {
        console.log(this.state);
        const now = moment();
        this.setState({ lastLogin: moment(this.state.last_login_date).from(now) });
      }));
  }

  // age() {
  //   console.log(this.state.user.travelling);
  // }


  render() {
    return (

      <section>

        <div className="container">
          <h1 className="title has-text-centered has-text-primary">Users Nearby:</h1>
          <div className="has-text-centered">

          </div>
          <ul className="columns is-multiline">
            {this.state.users.map((user, i) =>
              <li key={i} className="column is-one-third">
                <Link to={`/users/${user._id}`}>
                  <div className="card-content">
                    <div className="card-image">
                      <figure className="image">
                        <h2 className="subtitle is-3 has-text-centered">User: {user.username}</h2>
                        <p className="has-text-centered">Last login time: {this.state.lastLogin}</p>
                        <p className="has-text-centered">Age: {user.date}</p>
                        <p className="has-text-centered">Travelling with: {user.travelling}</p>
                      </figure>
                    </div>
                  </div>
                </Link>
              </li>)}
          </ul>
        </div>
      </section>
    );
  }
}

export default IndexRoute;
