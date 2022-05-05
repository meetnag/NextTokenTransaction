/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { WrapperToken } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a coin request
 * @param {Object} coinBody
 * @returns {Promise<WrapperToken>}
 */
const createCoin = async (coinBody) => {
  const coin = await WrapperToken.create(coinBody);
  return coin;
};

/**
 * Get all coin request
 * @returns {Promise<WrapperToken>}
 */
const getAllCoins = async () => {
  let coins = [];
  coins = await WrapperToken.find({}).sort([['createdAt', 'desc']]);
  return coins;
};

/**
 * Query for coins
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCoins = async (filter, options) => {
  const coins = await WrapperToken.paginate(filter, options);
  return coins;
};

/**
 * Get coin by id
 * @param {ObjectId} id
 * @returns {Promise<WrapperToken>}
 */
const getCoinById = async (id) => {
  return WrapperToken.findById(id);
};

/**
 * Update coin by id
 * @param {ObjectId} coinId
 * @param {Object} updateBody
 * @returns {Promise<WrapperToken>}
 */
const updateCoinById = async (coinId, updateBody) => {
  const coin = await getCoinById(coinId);
  if (!coin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'WrapperToken Token not found');
  }
  Object.assign(coin, updateBody);
  await coin.save();
  return coin;
};

/**
 * Delete coin by id
 * @param {ObjectId} coinId
 * @returns {Promise<WrapperToken>}
 */
const deleteCoinById = async (coinId) => {
  const coin = await getCoinById(coinId);
  if (!coin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'WrapperToken Token not found');
  }
  await coin.remove();
  return coin;
};

const getCoinsByToken = async (tokenId) => {
  let coins = [];
  coins = await WrapperToken.find({ tokenId }).sort([['createdAt', 'desc']]);
  return coins;
};

const updateDocument = async (id, updateBody) => {
  const updateData = {
    id: updateBody.agreement3_id,
    name: updateBody.agreement3,
  };
  const coins = await WrapperToken.updateOne({ _id: id }, { $push: { agreement: updateData } });
  return coins;
};
module.exports = {
  createCoin,
  getAllCoins,
  queryCoins,
  getCoinById,
  updateCoinById,
  deleteCoinById,
  getCoinsByToken,
  updateDocument,
};
