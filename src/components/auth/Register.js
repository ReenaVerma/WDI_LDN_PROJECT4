import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Footer from '../../components/common/Footer';
import '../../assets/scss/main.scss';
import ReactFilestack from 'filestack-react';


class Register extends React.Component {


  state = {

  }



  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => console.log(this.state));
  };
  // console.log(e.target.value);

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', this.state)
      // .then(res => localStorage.setItem('token', res.data.token))
      .then(res => Auth.setToken(res.data.token))
      .then(() => this.props.history.push('/hub'));
  }

  render() {

    const options = {
      accept: 'image/*',
      maxFiles: 1,
      transformations: {
        crop: { force: true,
          aspectRatio: 1.333
        }
      }
    };

    return (
      <main>
        <section className="section">
          <div className="has-text-centered">
            <h1 className="normal-title">Register</h1>
          </div>
          <video loop muted autoPlay poster="" className="is-hidden-mobile" id="video">
            <source src="../../assets/images/cut.mp4" type="video/mp4" />
          </video>

          <form className="registration-form" onSubmit={this.handleSubmit}>

            <div className="field">
              <label htmlFor="username"></label>
              <input className="input"
                placeholder="Username"
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="email"></label>
              <input
                className="input"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />
            </div>

            {/* GENDER */}
            {/* <div className="field">
              <label className="radio" htmlFor="gender">option1</label>
              <input
                type="radio"
                placeholder="gender"
                name="gender"
                onChange={this.handleChange}
                value="option1"
                checked={this.state.selectedOption === 'option1'}
              />
              <label className="radio" htmlFor="gender">option2</label>
              <input
                type="radio"
                placeholder="gender"
                name="gender"
                onChange={this.handleChange}
                value="option2"
                checked={this.state.selectedOption === 'option2'}
              />
            </div> */}
            {/* <label className="checkbox" htmlFor="gender">Female</label>
              <input
                type="checkbox"
                placeholder="female"
                name="female"
                onChange={this.handleChange}
              /> */}


            {/* AGE */}
            <div className="field">
              <label className="date" htmlFor="date">Date of Birth</label>
              <br />
              <input
                className="date"
                type="date"
                placeholder="date"
                name="date"
                onChange={this.handleChange}
              />
            </div>

            {/* TRAVELLING WITH */}
            <div className="field">
              <label>Travelling with:</label>
              <br />
              <div className="select">
                <select name="travelling" htmlFor="travelling" onChange={this.handleChange}>
                  <option>select an option</option>
                  <option>Solo</option>
                  <option>Friends</option>
                  <option>Boyfriend/Girlfriend</option>
                  <option>Travelling for work</option>
                </select>
              </div>
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
            <div className="field">
              <label htmlFor="passwordConfirmation"></label>
              <input
                type="password"
                className="input"
                placeholder="Password Confirmation"
                name="passwordConfirmation"
                onChange={this.handleChange}
              />
            </div>
            <label htmlFor="description">Profile picture:</label><br />
            <ReactFilestack
              apikey={'A8LoppjzCQMKU2LknClJcz'}
              options={options}
              buttonText="upload profile photo"
              buttonClass="button is-primary"
              // options={options}
              onSuccess={res => this.setState({ image: res.filesUploaded[0].url} )}
            />
            <div className="field">
              <label htmlFor="description">Short Description</label>
              <textarea
                type="description"
                className="textarea"
                placeholder="Write a short bio about yourself"
                name="description"
                onChange={this.handleChange}
              />
            </div>

            <button className="button is-primary is-outlined">Submit</button>
          </form>
        </section>
        <Footer />

      </main>
    );
  }
}

export default Register;
