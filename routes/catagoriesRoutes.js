const express = require('express');
const catagoriesController = require('../controllers/catagoriesController');
const userController = require('../controllers/userController');
const auth = require('../auth/auth');

const router = express.Router();

router
  .route('/')
  .get(catagoriesController.allCatagories)
  .post(catagoriesController.createCatagories);

router
  .route('/:id')
  .get(catagoriesController.singleCatagories)
  .put(catagoriesController.updateCatagories)
  .delete(auth, userController.restricted, catagoriesController.deleteCatagories);

module.exports = router;
