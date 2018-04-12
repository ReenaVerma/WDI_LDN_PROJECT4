import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
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
        crop: {aspectRatio: 1.333}
      }
    };

    return (
      <section className="section-top">
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input className="input"
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              placeholder="Email"
              name="email"
              onChange={this.handleChange}
            />
          </div>

          {/* FILESTACK */}
          {/* <div className="field">
            <label htmlFor="image">Upload an image</label>
            <input
              type="hidden"
              placeholder="upload a profile pic!"
              name="image"
              onChange={this.handleChange}
              onClick={this.filestack()}

            />
            <a className="button is-large has-text-centered is-primary" id="upload">
              <span className="icon is-medium"><i className="fab fa-github"></i></span>
              <span>Upload your photos</span>
            </a>
          </div> */}
          <ReactFilestack
            apikey={'A8LoppjzCQMKU2LknClJcz'}
            options={options}
            buttonText="Click me"
            buttonClass="classname"
            // options={options}
            onSuccess={res => this.setState({ image: res.filesUploaded[0].url} )}
          />

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
            <input
              type="date"
              placeholder="date"
              name="date"
              onChange={this.handleChange}
            />
          </div>

          {/* TRAVELLING WITH */}
          <div className="field">
            <p>Travelling with:</p>
            <div className="select">
              <select name="travelling" htmlFor="travelling" onChange={this.handleChange}>
                <option>Solo</option>
                <option>Friends</option>
                <option>Boyfriend/Girlfriend</option>
                <option>Travelling for work</option>
              </select>
            </div>
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
          <div className="field">
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input
              type="password"
              className="input"
              placeholder="Password Confirmation"
              name="passwordConfirmation"
              onChange={this.handleChange}
            />
          </div>

          <button className="button is-primary">Submit</button>
        </form>
      </section>
    );
  }
}

export default Register;
