const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const transferValidation = require('../../validations/transfer.validation');
const transferController = require('../../controllers/transfer.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageTransfers'), validate(transferValidation.createTransfer), transferController.createTransfer)
  .get(auth('getTransfers'), validate(transferValidation.getTransfers), transferController.getTransfers);

router
  .route('/all')
  .get(auth('getTransfers'), validate(transferValidation.getAllTransfers), transferController.getAllTransfers);

router
  .route('/:transferId')
  .get(auth('getTransfers'), validate(transferValidation.getTransfer), transferController.getTransfer)
  .patch(auth('manageTransfers'), validate(transferValidation.updateTransfer), transferController.updateTransfer)
  .delete(auth('manageTransfers'), validate(transferValidation.deleteTransfer), transferController.deleteTransfer);

router
  .route('/find')
  .post(auth('findTransfers'), validate(transferValidation.findTransfer), transferController.findTransfer);
module.exports = router;
