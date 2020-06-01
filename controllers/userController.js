const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const signupValidation = require('../utils/validation/signup');
const signInValidation = require('../utils/validation/signin');
const User = require('../models/User');

dotenv.config({ path: './config.env' });

const signup = async (req, res) => {
  // check user data is valid
  const validate = signupValidation(req.body);
  if (!validate.isValid) {
    res.status(400).json(validate.errors);
  } else {
    const { firstName, lastName, email, password, roles } = req.body;
    User.findOne({ email })
      .then(user => {
        const errors = {};
        if (user) {
          errors.email = 'Email Already Exist!';
          return res.status(409).json(errors);
        }
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
          roles,
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (!err) {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash;
              newUser
                .save()
                .then(result => {
                  res.status(200).json({
                    result,
                    msg: 'User Create Successfully',
                  });
                })
                .catch(err => {
                  res.json({
                    message: 'Please try again later',
                  });
                });
            });
          } else {
            res.json({ message: 'Please Try again later!' });
          }
        });
      })
      .catch(err => {
        res.json({ status: 'fail', message: 'Please try again' });
      });
  }
};

const signIn = (req, res) => {
  const validate = signInValidation(req.body);
  if (!validate.isValid) {
    res.status(400).json(validate.errors);
  } else {
    const { email, password } = req.body;
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ status: 'fail', email: 'This email not found!' });
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (!err) {
            if (result) {
              const payload = {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
              };
              const token = jwt.sign(payload, process.env.SECRET, { expiresIn: process.env.jwtExpire });
              return res
                .status(200)
                .json({ token: `Bearer ${token}`, status: 'success', message: 'Successfully Login' });
            }
            return res.status(401).json({ status: 'fail', password: 'Password does not match' });
          }
        });
      })
      .catch(err => res.json(err));
  }
};

// get a single user
const getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Error',
    });
  }
};

// get all user
const getUsers = async (req, res) => {
  try {
    const user = await User.find().select('-password');
    res.status(200).json({
      status: 'success',
      length: user.length,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Error',
    });
  }
};

// restricted route middleware
const restricted = (req, res, next) => {
  const { roles } = req.user;
  if (roles !== 'admin') {
    res.status(403).json({ status: 'fail', message: 'You do not have permission to this action' });
  }
  next();
};

module.exports = {
  signup,
  signIn,
  getSingleUser,
  getUsers,
  restricted,
};
