const express = require('express');
const pricingController = require('../controllers/pricingController');
const userController = require('../controllers/userController');
const auth = require('../auth/auth');

const router = express.Router();

router
  .route('/')
  .get(pricingController.allPrices)
  .post(auth, userController.restricted, pricingController.createPricing);

router
  .route('/:id')
  .get(pricingController.singlePrice)
  .put(auth, userController.restricted, pricingController.updatePrice)
  .delete(auth, userController.restricted, pricingController.deletePrice);

module.exports = router;
