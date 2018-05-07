import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Moment from 'react-moment';
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

      <section className="section comments-section">
        {this.state.user &&
        <div className="has-text-centered">
          <div className="profile-title">user: {this.state.user.username}</div>
          {/* <h1 className=""></h1> */}
          <div className="columns is-multiline">



            <div className="column is-half">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={this.state.user.image} />
                </figure>

              </div>
            </div>

            <div className="column is-half">
              <p className="profile-subtitle has-text-left"><strong>Last Login: {this.state.lastLogin}</strong></p>
              <br />

              {/* <div className="columns">
                <div className="column"><i className="fas fa-venus fa-2x"></i></div>
                <div className="column"><i className="fas fa-2x fa-bicycle"></i></div>
                <div className="column"><i className="fas fa-glass-martini fa-2x"></i></div>
              </div> */}

              <p className="profile-subtitle has-text-left">Age: <Moment fromNow ago>{this.state.user.date}</Moment></p>
              <p className="profile-subtitle has-text-left">Travelling with: {this.state.user.travelling}</p>
              <hr />
              <p className="profile-subtitle has-text-left">About me: </p>
              <p className="has-text-left">{this.state.user.description}</p>

            </div>

            <div className="column">
              <div className="profile-title">Post on {this.state.user.username}s wall!</div>
            </div>
          </div>
        </div>}
      </section>



    );
  }
}

export default ShowRoute;

{/* <p className="has-text-centered">Age: {this.state.user.userLocation}</p>  */}
