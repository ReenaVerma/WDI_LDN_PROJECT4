import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import '../../assets/scss/main.scss';
import Flash from '../../lib/Flash';
import FooterHomepage from '../../components/common/FooterHomepage';

class Login extends React.Component {

  state = {}

  // LOGGING FORM VALUES
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  }; // console.log(e.target.value);


  // POSTING FORM DATA TO API
  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => Auth.setToken(res.data.token)) //when you login, everytime you get a new token
      .then(() => Flash.setMessage('success animated slideInRight', 'Welcome back! Now go meet some people!'))
      .then(() => this.props.history.push('/hub'));
    console.log(this.state);
  }

  render() {
    return (
      <main>
        <section className="section login-header animated fadeIn">
          <div className="columns">
            <div className="column">
              <div className="has-text-centered">
                <h1 className="normal-title">Login</h1>
              </div>
              <form className="credentials-form" onSubmit={this.handleSubmit}>
                <div className="field">
                  <label htmlFor="email"></label>
                  <input
                    className="input"
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="password"></label>
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                <button className="button is-primary is-outlined">Submit</button>
              </form>
            </div>
          </div>
        </section>
        <FooterHomepage />
      </main>
    );
  }
}

export default Login;
