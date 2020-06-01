const Catagories = require('../models/Catagories');

// CREATE catagories
const createCatagories = async (req, res) => {
  try {
    let { highlight, name, img, description, schedule } = req.body;
    highlight = highlight.split(',').map(item => item.trim());
    const catagories = await Catagories.create({
      highlight,
      name,
      img,
      description,
      schedule,
    });
    res.status(201).json({
      status: 'success',
      data: { catagories },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error',
    });
  }
};

//  GET ALL  catagories
const allCatagories = async (req, res) => {
  try {
    const catagories = await Catagories.find();
    res.status(200).json({
      status: 'success',
      length: catagories.length,
      data: catagories,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error',
    });
  }
};

//  GET SINGLE catagories
const singleCatagories = async (req, res) => {
  try {
    const category = await Catagories.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error',
    });
  }
};

// UPDATE catagories
const updateCatagories = async (req, res) => {
  try {
    const catagories = await Catagories.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!catagories) {
      return res.status(400).json({
        status: 'fail',
        message: 'No catagories found with this id!',
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        catagories,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Error',
    });
  }
};
//  DELETE single catagories
const deleteCatagories = async (req, res) => {
  try {
    const category = await Catagories.findByIdAndDelete(req.params.id);
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
  createCatagories,
  allCatagories,
  singleCatagories,
  deleteCatagories,
  updateCatagories,
};
