const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  User.create(req.body)
    .then(user => {
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' });
      res.json({ user, token, message: 'Sign up successful!  Now go meet some people!' });
    })
    .catch(next);
}

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

    // .then(user => {
    //   const update = {
    //     last_login_date: Date.now()
    //   };
    //   const options = {
    //        new: true
    //    };
    //    User.findOneAndUpdate(user, update, options, function(err, user) {
    //        if (err) {
    //            console.log(update);
    //        }
    // })
    .catch(next);
}

// set the current login time, when the user logs in.
// save it in the model.
// when user is logged out, you can still see their last log in time.
// display this on homepage map pins, user search page and user profile pages
// when they Login



module.exports = {
  register,
  login
  // show
};
