import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

const ProtectedRoute = ({ component: Component, ...rest }) => {

  !Auth.isAuthenticated() && Flash.setMessage('danger', 'You must be logged in to view this page.');
  // console.log(rest);

  return (
    <Route {...rest} render={props =>
      // are we authenticated?
      Auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        // if not redirect here
        <Redirect to="/login" />
      )
    }
    />
  );
};

export default ProtectedRoute;
