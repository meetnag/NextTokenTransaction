const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const coinValidation = require('../../validations/invoice.validation');
const coinController = require('../../controllers/invoice.controller');

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

router
  .route('/Approve/:coinId')
  .patch(auth('manageCoins'), validate(coinValidation.approveCoin), coinController.ApproveCoin);

router
  .route('/getInvoice/:tokenId')
  .get(auth('getCoins'), validate(coinValidation.getCoinByTokenId), coinController.getCoinsByToken);
module.exports = router;
