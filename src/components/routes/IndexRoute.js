import React from 'react';
import axios from 'axios';
// import moment from 'moment';
import Moment from 'react-moment';
import Timestamp from 'react-timestamp';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import '../../assets/scss/main.scss';


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

        <div className="container card">
          <h1 className="title has-text-centered has-text-primary">Users Nearby:</h1>

          <div className="container">
            <div className="field">
              <input className="input is-large"
                type="text"
                name="search"
                placeholder="search by travelling preferences or username..."
                onChange={this.handleChange}
              />
            </div>
          </div>



          <div className="columns is-multiline">
            {this.filterUsernames().sort((a, b) => Number(a.last_login_date) - Number(b.last_login_date)).map((user, i) =>
              <div key={i} className="column is-one-third">
                <Link to={`/users/${user._id}`}>


                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-square">
                        <img src={user.image} alt="Placeholder image" />
                      </figure>
                    </div>
                    <div className="card-content">

                      <div className="media-content">
                        <p className="has-text-centered title is-4">{user.username}</p>
                        <p className="has-text-centered subtitle is-6">Last logged in:<br /><Timestamp time={user.last_login_date} precision={2} /></p>

                        <p className="has-text-centered">location: </p>
                        <p className="has-text-centered">Age:&nbsp;
                        <Moment fromNow ago>{user.date}</Moment> old
                        </p>
                        <p className="has-text-centered">Travelling with: {user.travelling}</p>
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
