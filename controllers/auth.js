const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

// CREATE USER RECORD AND ASSIGN JWT AND SECRET
function register(req, res, next) {
  User.create(req.body)
    .then(user => {
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
      res.json({ user, token, message: 'Sign up successful!  Now go meet some people!' });
    })
    .catch(next);
}

// LOGIN - 401 IF PASSWORD DOESNT MATCH, OR ASSIGN JWT/SECRET AND LOGIN
// HERE WE'RE SAVING THE LOGIN DATE
function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
      // const date = user.updateLastLoginTime(user._id, Date.now());
      // console.log('login date is :' + date);
      res.json({ user, token, message: `Welcome back ${user.username}` });
      user.last_login_date = Date.now();
      user.save();
    })

    .catch(next);
}

module.exports = {
  register,
  login
};
