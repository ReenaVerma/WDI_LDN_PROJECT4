const User = require('../models/user');

// FIND ALL USERS
function indexRoute(req, res, next) {
  User
    .find()
    .then(users => res.json(users))  //passes object/array and also converts non objects at are not json
    .catch(next);
}

// FIND USERS BY ID
function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    .then(users => res.json(users))
    .catch(next);
}

// UPDATE USER PROFILE
function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => {
      user = Object.assign(user, req.body);
      return user.save();
    })
    .then(users => res.json(users))
    .catch(next);
}


// CREATE FUNCTION FOR COMMENT
function messagesCreateRoute(req, res, next) {
  //set the currentuser as the owner of the post created
  req.body.user = req.currentUser;
  console.log(req.body);

  // find the user by ID
  User.findById(req.params.id)
    .then(user => {
      console.log('USER', user);
      if (!user.messages) user.messages = [];
      // push comment into the the body area of the popup page
      user.messages.push(req.body);
      return user.save();
    })
    // .then(user => {
    //   console.log(user);
    //   res.redirect(`/user/${user._id}`);
    // })
    // .then(user => User.populate('user', { path: 'comments.user' }))
    .then(user => res.json(user))
    .catch(next);
}

// DELETE COMMENT
function messagesDeleteRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      // push req.body/contenT for the form into the comments area
      console.log(user);
      const message = user.messages.id(req.params.messageId);
      console.log(message);
      message.remove();
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);  //any problems send to error handler
}


module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  messagesCreate: messagesCreateRoute,
  messagesDelete: messagesDeleteRoute
};
