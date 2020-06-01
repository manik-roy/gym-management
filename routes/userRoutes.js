const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../auth/auth');

// get user
router.get('/', auth, userController.getSingleUser);

// sign up  a new user
router.post('/signup', userController.signup);

// sign in User
router.post('/login', userController.signIn);
router.get('/all', auth, userController.restricted, userController.getUsers);

module.exports = router;
