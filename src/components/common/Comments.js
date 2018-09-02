import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import '../../assets/scss/main.scss';


class Comments extends React.Component {

  state = {
    user: null,
    newMessage: ''
  }

  // GET USER BY ID
  componentDidMount(){
    axios.get(`/api/users/${this.props.userId}`)
      .then(res => this.setState({ user: res.data }, () => {
        console.log('profile page', this.state.user);
      }));
  }

  // SET MESSAGE TO STATE
  handleChange = (e) => {
    this.setState({ newMessage: e.target.value }, () => console.log(this.state));
  };

  // POST MESSAGE TO USERS/ID/MESSAGES
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

  // DELETE MESSAGE
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
    console.log(this.state.user);
    return (
      <section className="section">
        {this.state.user && this.state.user.messages.map(message =>
          <div key={message._id} className="columns is-multiline">
            <div className="column">
              <div className="media-content">
                <p className="user-title has-text-black">Posted by member: {message.user.username}</p>
                <div className="media-left">
                  <figure className="image is-64x64 is-rounded">
                    <img src={message.user.image} />
                  </figure>
                </div>
                <p>{message.content}</p>
                <a href="" onClick={() => this.deleteComment(message._id)} className="is-right pink">delete your message</a>
              </div>
            </div>
          </div>
        )}
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
              <button id="reviewButton" className="button is-primary">post message</button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Comments;
