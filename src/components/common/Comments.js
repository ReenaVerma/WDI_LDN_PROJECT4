import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import '../../assets/scss/main.scss';
// import { Link, withRouter } from 'react-router-dom';

// const Navbar = () => {

class Comments extends React.Component {

  state = {
    user: null,
    newMessage: ''
  }

  componentDidMount(){
    axios.get(`/api/users/${this.props.userId}`)
      .then(res => this.setState({ user: res.data }, () => {
        console.log('profile page', this.state.user);
      }));
  }
  handleChange = (e) => {
    this.setState({ newMessage: e.target.value }, () => console.log(this.state));
  };



  handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: `/api/users/${this.state.user._id}/messages`,
      headers: { Authorization: `Bearer ${Auth.getToken()}`},
      data: { content: this.state.newMessage }
    })
      .then(res => {
        console.log('RES',res.data);
        this.setState({ user: res.data, newMessage: '' });
      });
  }

  deleteComment = (id) => {

    axios({
      method: 'DELETE',
      url: `/api/users/${this.state.user._id}/messages/${id}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.error(err));

  }


  render() {
    return (
    // console.log(Auth.isAuthenticated());

      <section>
      Comments
        <div className="columns mobile">
          <div className="column">


            <div className="columns">
              <div className="column">
                <hr />
                <ul className="comments">
                  <li>
                    <div className="box">

                      <article className="media">


                        {this.state.user && this.state.user.messages.map(message =>

                          <div key={message._id} className="media-content">
                            <div className="content">



                              <button onClick={() => this.deleteComment(message._id)} className="delete is-right">x</button>


                              <strong><p>Posted by member: {message.user.username}</p></strong>
                              <div className="media-left">
                                <figure className="image is-64x64">

                                  <i className="far fa-smile fa-3x"></i>
                                </figure>
                              </div>

                              <p>{message.content}</p>
                            </div>
                          </div>
                        )}
                      </article>
                    </div>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>


        <div className="columns mobile">
          <div className="column">


            <form onSubmit={this.handleSubmit}>
              <textarea
                className="textarea"
                name="content"
                onChange={this.handleChange}
                value={this.state.newMessage}
              ></textarea>
              <br />
              <button id="reviewButton" className="button is-primary">submit</button>
            </form>
          </div>
        </div>
      </section>


    );
  }
}






export default Comments;
