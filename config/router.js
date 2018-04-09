const router = require('express').Router();

const auth = require('../controllers/auth');
const darksky = require('../controllers/darksky');
const users = require('../controllers/users');

// const secureRoute = require('../lib/secureRoute');

// router.route('/allusers')
//   .get(users.index);
router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show);

// CREATE COMMENTS
router.route('/users/:id/comments')
  .post(users.commentsCreate);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.get('/forecast', darksky.forecast);

router.route('/*')
  .all((req, res) => res.status(404).json({ message: 'Not found' }));

module.exports = router;
