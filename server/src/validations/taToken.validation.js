const Joi = require('@hapi/joi');
const { objectId } = require('./custom.validation');

const createCoin = {
  body: Joi.object().keys({
    user: Joi.required().custom(objectId),
    invoiceNo: Joi.required(),
    tokenId: Joi.allow('', null),
    tokens: Joi.required(),
    description: Joi.required(),
    agreement: Joi.required(),
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
      agreement: Joi.allow('', null),
      external_signer: Joi.allow('', null),
      vendor_signer: Joi.allow('', null),
      owner_approver: Joi.allow('', null),
      lender_approver: Joi.allow('', null),
      invbuyer_signer: Joi.allow('', null),
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
      external_signer: Joi.allow('', null),
      vendor_signer: Joi.allow('', null),
      owner_approver: Joi.allow('', null),
      lender_approver: Joi.allow('', null),
      agreement: Joi.allow('', null),
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
    id: Joi.string().required(),
    name: Joi.string().required(),
    flag: Joi.allow('', null),
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
