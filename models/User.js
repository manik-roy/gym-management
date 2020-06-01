const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  roles: {
    type: String,
    enum: ['user', 'admin', 'member'],
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
