const router = require('express').Router();

// CALLLING CONTROLLERS & SECURE ROUTE
const auth = require('../controllers/auth'); //REG, LOGIN
const darksky = require('../controllers/darksky'); //WIP
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

// SEARCH USERS
router.route('/users')
  .get(users.index);

// PROFILE PAGE
router.route('/users/:id')
  .get(users.show)
  .put(users.update);

// REGISTER
router.route('/register')
  .post(auth.register);

// LOGIN
router.route('/login')
  .post(auth.login);

// POST COMMENT
router.route('/users/:id/messages')
  .post(secureRoute, users.messagesCreate);

// DELETE COMMENT
router.route('/users/:id/messages/:messageId')
  .delete(secureRoute, users.messagesDelete);

// DARKSKY API
router.get('/forecast', darksky.forecast);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
