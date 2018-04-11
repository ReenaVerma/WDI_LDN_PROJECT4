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
        {/* 
        <video loop muted autoPlay poster="" className="fullscreen-bg__video">
          <source src="../../assets/images/vid2.mov" type="video/mov" />

        </video> */}


        <div className="hero-body">



          <div className="container">
            <div className="columns is-centered">
              <div className="is-half has-text-centered">
                <h1 className="title">Homepage</h1>
              </div>
            </div>

            <div className="columns is-pulled-right is-hidden-mobile">
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
            </div>
          </div>
        </div>

      </section>








    );
  }
}

export default  Home;
