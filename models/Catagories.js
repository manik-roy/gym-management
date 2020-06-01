const mongoose = require('mongoose');

const { Schema } = mongoose;
const catagoriesSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  img: {
    type: String,
    trim: true,
  },
  schedule: {
    type: [
      {
        date: String,
        time: String,
      },
    ],
    default: [],
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  highlight: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model('Catagories', catagoriesSchema);
module.exports = User;
