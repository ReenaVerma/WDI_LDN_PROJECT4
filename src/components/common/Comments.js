import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
// import { Link, withRouter } from 'react-router-dom';

// const Navbar = () => {

class Comments extends React.Component {

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  };

  handleSubmit = (e) => {
    // prevent default behaviour
    e.preventDefault();
    // make a post request to /api/Register
    //send the form data
    axios.post('api/users/:id/comments', this.state)
      // .then(res => localStorage.setItem('token', res.data.token))
      .then(res => Auth.setToken(res.data.token))
      .then(() => this.props.history.push('/users/:id'));
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
                        <div className="media-left">
                          <figure className="image is-64x64">
                            <i className="far fa-smile fa-3x"></i>
                          </figure>
                        </div>

                        <div className="media-content">
                          <div className="content">

                            <strong><p>Posted by member: </p></strong>
                            <strong><p>Date posted: </p></strong>

                            <p>comment.content</p>
                          </div>
                        </div>

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
