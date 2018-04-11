import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import '../../assets/scss/main.scss';

class Home extends React.Component {

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

      // <section className="hero is-large homepage hero-head animated fadeIn is-bold is-mobile">
      <section className="">
        <video loop muted autoPlay poster="" className="" id="video">
          <source src="../../assets/images/cut.mp4" type="video/mp4" />
        </video>


        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="is-half has-text-centered">
                <h1 className="is-size-1 has-text-white">smart travel</h1>
                <h1 className="is-size-3 has-text-white">search for likeminded travellers abroad</h1>

                <form onSubmit={this.handleSubmit}>

                  <div className="field">
                    <label htmlFor="email"></label>
                    <input
                      className="input is-medium"
                      placeholder="Email"
                      name="email"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="password"></label>
                    <input
                      type="password"
                      className="input is-medium"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                    />
                  </div>

                  <button className="button is-primary">login</button>
                </form>
              </div>
            </div>

          </div>
        </div>

      </section>








    );
  }
}

export default  Home;
