const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .then(users => res.json(users))
    .catch(next);
}


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
  req.body.user = req.currentUser;
  //set the currentuser as the owner of the post created
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

function messagesDeleteRoute(req, res, next) {
  User.findById(req.params.id)
    .then(user => {
      // push req.body/conten for the form into the comments area
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
