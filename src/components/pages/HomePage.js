import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import FooterHomepage from '../../components/common/FooterHomepage';
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
      <main>
        <section className="section-top">
          <video loop muted autoPlay poster="" className="is-hidden-mobile" id="video">
            <source src="../../assets/images/cut.mp4" type="video/mp4" />
          </video>
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column has-text-centered">
                  <h1 className="header-title animated fadeIn">hit me up</h1>
                  <h1 className="subtitle-title animated fadeIn">search for likeminded travellers abroad</h1>

                  <form className="homepage-form" onSubmit={this.handleSubmit}>

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

                    <button className="button is-primary is-outlined">login</button>
                  </form>
                </div>
              </div>

            </div>
          </div>

        </section>
        <FooterHomepage />
      </main>






    );
  }
}

export default  Home;
