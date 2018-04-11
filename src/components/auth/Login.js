import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import '../../assets/scss/main.scss';
// import Flash from '../../lib/Flash';


class Login extends React.Component {


  state = {}

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  };
  // console.log(e.target.value);

  handleSubmit = (e) => {
    // prevent default behaviour
    e.preventDefault();
    // make a post request to /api/Register
    //send the form data
    axios.post('/api/login', this.state)
      //when you login, everytime you get a new token
      // .then(res => localStorage.setItem('token', res.data.token))
      .then(res => Auth.setToken(res.data.token))
      // .then(() => Flash.setMessage('success', 'Welcome back!'))
      .then(() => this.props.history.push('/hub'));
    console.log(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            className="input"
            placeholder="Email"
            name="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
          />
        </div>


        <button className="button is-primary">Submit</button>
      </form>
    );
  }
}

export default Login;
