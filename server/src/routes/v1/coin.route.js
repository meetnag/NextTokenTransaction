const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const coinValidation = require('../../validations/coin.validation');
const coinController = require('../../controllers/coin.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCoins'), validate(coinValidation.createCoin), coinController.createCoin)
  .get(auth('getCoins'), validate(coinValidation.getCoins), coinController.getCoins);

router.route('/all').get(auth('getCoins'), validate(coinValidation.getAllCoins), coinController.getAllCoins);

router
  .route('/:coinId')
  .get(auth('getCoins'), validate(coinValidation.getCoin), coinController.getCoin)
  .patch(auth('manageCoins'), validate(coinValidation.updateCoin), coinController.updateCoin)
  .delete(auth('manageCoins'), validate(coinValidation.deleteCoin), coinController.deleteCoin);

module.exports = router;
