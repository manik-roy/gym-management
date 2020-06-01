const Pricing = require('../models/Pricing');

// CREATE pricing
const createPricing = async (req, res) => {
  try {
    let { highlight, title, img, time, price } = req.body;
    highlight = highlight.split(',').map(item => item.trim());
    const priceItem = await Pricing.create({
      highlight,
      title,
      img,
      time,
      price,
    });
    res.status(201).json({
      status: 'success',
      data: { priceItem },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error',
    });
  }
};

//  GET ALL  pricing
const allPrices = async (req, res) => {
  try {
    const prices = await Pricing.find();
    res.status(200).json({
      status: 'success',
      length: prices.length,
      data: prices,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error',
    });
  }
};

//  GET SINGLE price
const singlePrice = async (req, res) => {
  try {
    const price = await Pricing.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: price,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error',
    });
  }
};

// UPDATE price
const updatePrice = async (req, res) => {
  try {
    const price = await Pricing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!price) {
      return res.status(400).json({
        status: 'fail',
        message: 'No price item found with this id!',
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        price,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error',
    });
  }
};

//  DELETE single price
const deletePrice = async (req, res) => {
  try {
    await Pricing.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Delete successfully!',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error',
    });
  }
};

module.exports = {
  createPricing,
  allPrices,
  singlePrice,
  deletePrice,
  updatePrice,
};
