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
function commentsCreateRoute(req, res, next) {
  req.body.user = req.currentUser;
  //set the currentuser as the owner of the post created
  console.log(req.body);

  // find the user by ID
  User.findById(req.params.id)
    .then(users => {
      // push comment into the the body area of the popup page
      users.comments.push(req.body);
      req.flash('success', 'Comment added!');
      return users.save();

    })
    .then(users => {
      console.log(users);
      res.redirect(`/users/${users._id}`);

    })
    .catch(next); //catch any errors
}





module.exports = {
  index: indexRoute,
  show: showRoute,
  update: updateRoute,
  commentsCreate: commentsCreateRoute
};
