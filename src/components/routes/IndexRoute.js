import React from 'react';
import axios from 'axios';
// import moment from 'moment';
import Moment from 'react-moment';
import Timestamp from 'react-timestamp';
import { Link } from 'react-router-dom';
import _ from 'lodash';


class IndexRoute extends React.Component {

  state = {
    users: [],
    lastLogin: null
  }

  // GET USERS
  componentDidMount(){
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }, () =>  {
        console.log(this.state);
      }));
  }

  // LOG SEARCH FILTER INPUT
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({ search: e.target.value}, () => console.log(this.state));
  }

  // FILTER FUNCTION
  filterUsernames = () => {
    const regex = new RegExp(this.state.search, 'i'); //make a regex
    const filtered = _.filter(this.state.users, (user) => regex.test(user.username) || regex.test(user.travelling));
    return filtered.sort((a, b) => Date(a.last_login_date) < Date(b.last_login_date));
    // everytime state changes, it calls the render function again, because it knows something has changed
  }

  render() {
    return (

      <section className="section-top">
        <div className="container">
          <h1 className="has-text-centered sub-title">Search by username or travelling preference</h1>
          <div className="columns">
            <div className="column search">
              <div className="container">
                <div className="field">
                  <input className="input is-large"
                    type="text"
                    name="search"
                    placeholder="Eg... search John87"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-multiline">
            {this.filterUsernames().map((user, i) =>
              <div key={i} className="column is-one-third animated slideInUp">
                <Link to={`/users/${user._id}`}>
                  <div className="card">
                    <div className="card-image">
                      <figure className="image">
                        <img src={user.image} alt="Placeholder image" />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="media-content">
                        <p className="has-text-centered title is-4">{user.username}</p>
                        <p className="has-text-centered subtitle is-6">Last logged in:<br /><Timestamp time={user.last_login_date} precision={2} /></p>
                        <p className="has-text-centered">Age:&nbsp;
                        <Moment fromNow ago>{user.date}</Moment> old</p>
                        <p className="has-text-centered">Travelling with: {user.travelling}</p>
                        <p className="has-text-centered">location: </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>)}
          </div>
        </div>
      </section>
    );
  }
}

export default IndexRoute;
