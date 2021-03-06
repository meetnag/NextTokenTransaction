const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createCoin = {
  body: Joi.object().keys({
    user: Joi.required().custom(objectId),
    invoiceNo: Joi.required(),
    tokenId: Joi.allow('', null),
    tokens: Joi.required(),
    description: Joi.required(),
    agreement1: Joi.required(),
    agreement2: Joi.required(),
    agreement1_id: Joi.required(),
    agreement2_id: Joi.required(),
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
      tokens: Joi.allow('', null),
      description: Joi.allow('', null),
      uri: Joi.allow('', null),
      address: Joi.allow('', null),
      owner_approver: Joi.allow('', null),
      invbuyer_signer: Joi.allow('', null),
      cashTxn: Joi.allow('', null),
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
      owner_approver: Joi.allow('', null),
      invbuyer_signer: Joi.allow('', null),
      cashTxn: Joi.allow('', null),
    })
    .min(1),
};
const getCoinByTokenId = {
  params: Joi.object().keys({
    tokenId: Joi.string(),
  }),
};
const updateDocument = {
  params: Joi.object().keys({
    coinId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    agreement3: Joi.string().required(),
    agreement3_id: Joi.string().required(),
  }),
};
module.exports = {
  createCoin,
  getAllCoins,
  getCoins,
  getCoin,
  updateCoin,
  deleteCoin,
  approveCoin,
  getCoinByTokenId,
  updateDocument,
};
