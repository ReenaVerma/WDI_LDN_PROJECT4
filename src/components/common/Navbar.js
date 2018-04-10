import React from 'react';
import Auth from '../../lib/Auth';
import { Link, withRouter } from 'react-router-dom';

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
    this.props.history.push('/bangers');
  }


  componentWillUpdate() {
    if(this.state.navIsOpen) this.setState({ navIsOpen: false });
  }
  // if the nav is open which is true, then JS will run this.state.  And then navisOpen is set to false.



  render() {

    console.log(Auth.isAuthenticated());

    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            SMART TRAVEL
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


            {Auth.isAuthenticated() && <Link className="navbar-item" to="/hub">My Travel Hub</Link>}
            {Auth.isAuthenticated() && <Link className="navbar-item" to="/users">Search Users</Link>}
            {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.handleLogout} to="/">Logout</a>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/">Home</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
            {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>}


          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);

{/* {Auth.isAuthenticated() && <Link className="navbar-item" to="/bangers/new">New Bangers</Link>}
{Auth.isAuthenticated() && <a className="navbar-item" onClick={this.handleLogout} to="/bangers">Logout</a>}
{!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Register</Link>}
{!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Login</Link>} */}
