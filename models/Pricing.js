const mongoose = require('mongoose');

const { Schema } = mongoose;
const pricingSchema = new Schema({
  time: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    trim: true,
    required: true,
  },
  img: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  highlight: {
    type: Array,
    default: [],
  },
});

const Pricing = mongoose.model('Pricing', pricingSchema);
module.exports = Pricing;
