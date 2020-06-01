const validator = require('validator');

const signIn = data => {
  const errors = {};

  if (!data.email) {
    errors.email = 'Please Provide your Email';
  } else if (!validator.isEmail(data.email)) {
    errors.email = 'Please Provide your Valid Email';
  }
  if (!data.password) {
    errors.password = 'Please Provide your Password';
  } else if (!validator.isLength(data.password, { min: 6, max: 25 })) {
    errors.password = 'Password  must be 6 to 25 Character';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = signIn;
