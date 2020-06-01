const validator = require('validator');

const signup = data => {
  const errors = {};

  if (!data.firstName) {
    errors.firstName = 'Please Provide your first name';
  } else if (!validator.isLength(data.firstName, { min: 3, max: 25 })) {
    errors.firstName = 'First name must be 3 to 25 Character';
  }
  if (!data.lastName) {
    errors.lastName = 'Please Provide your Last name';
  } else if (!validator.isLength(data.lastName, { min: 3, max: 25 })) {
    errors.lastName = 'First name must be 3 to 25 Character';
  }
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
  if (!data.confirmPassword) {
    errors.confirmPassword = 'Confirm Password must be required!';
  } else if (!validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Confirm Password must be Match!';
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = signup;
