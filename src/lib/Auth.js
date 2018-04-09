class Auth {
// helper class
// also a constructor function as we use class

  static logout() {
    //when we log out, we remove the token
    localStorage.removeItem('token');
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }


  static getToken() {
    return localStorage.getItem('token');
  }


  // at the moment theres a 6 hours timeout on tokens
  static getPayload() {
    const token = this.getToken();
    if(!token) return false; // if there's no token return false, as we couldnt find the payload

    const parts = token.split('.');
    if (parts.length < 3) return false;

    return JSON.parse(atob(parts[1]));
  }


  static isAuthenticated() {

    const payload = this.getPayload();
    if(!payload || !payload.exp) return false;
    // payload.exp;
    // check that it hasnt expired
    const now = Math.round(Date.now() / 1000 );

    // we want to make sure the token is still valid

    return now < payload.exp;

  }
}

export default Auth;
