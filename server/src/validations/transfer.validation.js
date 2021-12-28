const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createTransfer = {
  body: Joi.object().keys({
    user: Joi.required().custom(objectId),
    tokenId: Joi.required(),
    numberOfToken: Joi.required(),
    invoice_no: Joi.required(),
    description: Joi.required(),
    vendor_accepted_token: Joi.required(),
    status: Joi.allow('', null),
  }),
};

const getAllTransfers = {
  query: Joi.object().keys({}),
};

const getTransfers = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTransfer = {
  params: Joi.object().keys({
    transferId: Joi.string().custom(objectId),
  }),
};

const updateTransfer = {
  params: Joi.object().keys({
    transferId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      user: Joi.allow('', null).custom(objectId),
      tokenId: Joi.allow('', null),
      numberOfToken: Joi.allow('', null),
      description: Joi.allow('', null),
      status: Joi.allow('', null),
      vendor_accepted_token: Joi.allow('', null),
      ar_account: Joi.allow('', null),
    })
    .min(1),
};

const deleteTransfer = {
  params: Joi.object().keys({
    transferId: Joi.string().custom(objectId),
  }),
};

const findTransfer = {
  body: Joi.object().keys({
    status: Joi.required(),
    vendor_accepted_token: Joi.required(),
  }),
};

module.exports = {
  createTransfer,
  getAllTransfers,
  getTransfers,
  getTransfer,
  updateTransfer,
  deleteTransfer,
  findTransfer,
};
