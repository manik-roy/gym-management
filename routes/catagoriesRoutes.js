const express = require('express');
const catagoriesController = require('../controllers/catagoriesController');
const userController = require('../controllers/userController');
const auth = require('../auth/auth');

const router = express.Router();

router
  .route('/')
  .get(catagoriesController.allCatagories)
  .post(auth, userController.restricted, catagoriesController.createCatagories);

router
  .route('/:id')
  .get(catagoriesController.singleCatagories)
  .put(auth, userController.restricted, catagoriesController.updateCatagories)
  .delete(auth, userController.restricted, catagoriesController.deleteCatagories);

module.exports = router;
