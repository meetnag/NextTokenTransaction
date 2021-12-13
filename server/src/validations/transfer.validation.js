const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createTransfer = {
  body: Joi.object().keys({
    user: Joi.required().custom(objectId),
    tokenId: Joi.required(),
    numberOfToken: Joi.required(),
    description: Joi.required(),
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
    })
    .min(1),
};

const deleteTransfer = {
  params: Joi.object().keys({
    transferId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTransfer,
  getAllTransfers,
  getTransfers,
  getTransfer,
  updateTransfer,
  deleteTransfer,
};
