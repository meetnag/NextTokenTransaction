const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createCoin = {
  body: Joi.object().keys({
    user: Joi.required().custom(objectId),
    tokenId: Joi.allow('', null),
    numberOfToken: Joi.required(),
    description: Joi.required(),
    agreement: Joi.required(),
    credit_Enhancement: Joi.required(),
    guarantee: Joi.required(),
    agreement_id: Joi.required(),
    credit_Enhancement_id: Joi.required(),
    guarantee_id: Joi.required(),
    address: Joi.required(),
    renewal: Joi.required(),
    days: Joi.required(),
    date_of_Expiration: Joi.required(),
  }),
};

const getAllCoins = {
  query: Joi.object().keys({}),
};

const getCoins = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCoin = {
  params: Joi.object().keys({
    coinId: Joi.string().custom(objectId),
  }),
};

const updateCoin = {
  params: Joi.object().keys({
    coinId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      user: Joi.allow('', null).custom(objectId),
      tokenId: Joi.allow('', null),
      numberOfToken: Joi.allow('', null),
      description: Joi.allow('', null),
      uri: Joi.allow('', null),
      address: Joi.allow('', null),
    })
    .min(1),
};

const deleteCoin = {
  params: Joi.object().keys({
    coinId: Joi.string().custom(objectId),
  }),
};

const approveCoin = {
  params: Joi.object().keys({
    coinId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      internal_approver: Joi.allow('', null),
      external_signer: Joi.allow('', null),
    })
    .min(1),
};

module.exports = {
  createCoin,
  getAllCoins,
  getCoins,
  getCoin,
  updateCoin,
  deleteCoin,
  approveCoin,
};
