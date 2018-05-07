const router = require('express').Router();

const auth = require('../controllers/auth');
const darksky = require('../controllers/darksky');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

// router.route('/allusers')
//   .get(users.index);
router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update);

// my user profile routes
router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

// CREATE COMMENTS
router.route('/users/:id/messages')
  .post(secureRoute, users.messagesCreate);

router.route('/users/:id/messages/:messageId')
  .delete(secureRoute, users.messagesDelete);

// darksky api
router.get('/forecast', darksky.forecast);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
