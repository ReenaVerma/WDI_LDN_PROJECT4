import React from 'react';
import axios from 'axios';
// import moment from 'moment';
import Timestamp from 'react-timestamp';
import { Link } from 'react-router-dom';
import _ from 'lodash';


class IndexRoute extends React.Component {

  state = {
    users: [],
    lastLogin: null
  }


  componentDidMount(){
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }, () =>  {
        console.log(this.state);
        // const now = moment();
        // this.setState({ lastLogin: moment(this.state.users.last_login_date).from(now) });
      }));
  }

  // lastLogin = () => {
  //   axios.get(`/api/users/${this.props.userId}`)
  //     .then(res => this.setState({ users: res.data }, () => {
  //       const now = moment();
  //       this.setState({ lastLogin: moment(this.state.users.last_login_date).from(now) });
  //     }));
  // }

  handleChange = (e) => {
  // console.log(e.target.value);
    console.log(e.target.value);
    this.setState({ search: e.target.value}, () => console.log(this.state));
  }

  filterUsernames = () => {
    // return this.state.bangers;
    //make a regex
    const regex = new RegExp(this.state.search, 'i');

    //use _filter to filter the bangers
    const filtered = _.filter(this.state.users, (user) => regex.test(user.username) || regex.test(user.travelling));
    return filtered;
    //state.bangers is what we want filter
    // everytime state changes, it calls the render function again, because it knows something has changed
  }


  render() {
    return (


      <section>

        <div className="container">
          <h1 className="title has-text-centered has-text-primary">Users Nearby:</h1>

          <div className="container">
            <div className="field">
              <input
                type="text"
                name="search"
                placeholder="search by username"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <ul className="columns is-multiline">
            {this.filterUsernames().map((user, i) =>
              <li key={i} className="column is-one-third">
                <Link to={`/users/${user._id}`}>
                  <div className="card-content">
                    <div className="card-image">
                      <figure className="image">
                        <img src={user.image} />
                        <h2 className="subtitle is-3 has-text-centered">User: {user.username}</h2>
                        <p className="has-text-centered">Last Login:<Timestamp time={user.last_login_date} precision={2} /> </p>
                        <p className="has-text-centered">location: </p>
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
