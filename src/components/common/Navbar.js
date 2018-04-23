import React from 'react';
import Auth from '../../lib/Auth';
import { Link, withRouter } from 'react-router-dom';
import '../../assets/scss/main.scss';

// const Navbar = () => {

class Navbar extends React.Component {


  state = {
    navIsOpen: false
  }

  // rather than binding we can just turn a method into an arrow function.
  // this means we don't have to worry about binding
  // because arrow functions don't care
  // handleToggle() {
  //   this.setState({ navIsOpen: !this.state.navIsOpen });
  // }

  handleToggle =() => {
    this.setState({ navIsOpen: !this.state.navIsOpen });
  }

  handleLogout = () => {
    Auth.logout();
    this.props.history.push('/login');
  }


  componentWillUpdate() {
    if(this.state.navIsOpen) this.setState({ navIsOpen: false });
  }
  // if the nav is open which is true, then JS will run this.state.  And then navisOpen is set to false.



  render() {

    console.log(Auth.isAuthenticated());

    return (
      <nav className="navbar is-white">
        <div className="navbar-brand">
          <Link className="navbar-item logo gold" to="/">
            hit me up
          </Link>
          <div
            className={`navbar-burger ${this.state.navIsOpen ? 'is-active' : ''}`}
            onClick={this.handleToggle}
          >
            {/* '' is helping with the toggle - when active is a cross*/}
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`navbar-menu ${this.state.navIsOpen ? 'is-active' : ''}`}>
          {/* when active is open */}
          <div className="navbar-end">


            {Auth.isAuthenticated() && <Link className="navbar-item" to="/hub">my travel hub</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/users">search users</Link>}
            {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.handleLogout} to="/">logout</a>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/">home</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">register</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">login</Link>}


          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
