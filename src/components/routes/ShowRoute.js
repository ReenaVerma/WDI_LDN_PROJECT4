import React from 'react';
import axios from 'axios';
import moment from 'moment';
import '../../assets/scss/main.scss';

class ShowRoute extends React.Component {

  state = {
    user: null,
    lastLogin: null
  };

  // && wait for user to show and then render it
  //  if left is false, stop.  if true run everything else.
  componentDidMount(){
    axios.get(`/api/users/${this.props.userId}`)
      .then(res => this.setState({ user: res.data }, () => {
        const now = moment();
        this.setState({ lastLogin: moment(this.state.user.last_login_date).from(now) });
      }));
  }


  render() {
    return (

      <section>

        <div className="container">
          <h1 className="title has-text-centered has-text-primary">Individual User Profile:</h1>
          <h1 className="title">Last Login: {this.state.lastLogin}</h1>
          <ul className="columns is-multiline">
            {this.state.user &&
              <li className="column is-one-third">
                <div className="card-content">
                  <div className="card-image">
                    <figure className="image">
                      <img src={this.state.user.image} />
                      <h2 className="subtitle is-3 has-text-centered">User: {this.state.user.username}</h2>
                      {/* <p className="has-text-centered">Age: {this.state.user.userLocation}</p> */}
                      <p className="has-text-centered">Age: {this.state.user.date}</p>
                      <p className="has-text-centered">Travelling with: {this.state.user.travelling}</p>
                    </figure>
                  </div>
                </div>
                <h2 className="subtitle is-3 has-text-centered">Chat with: {this.state.user.username}</h2>
              </li>}
          </ul>
        </div>
      </section>

    );
  }
}

export default ShowRoute;
