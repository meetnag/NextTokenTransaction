/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { TaToken } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a coin request
 * @param {Object} coinBody
 * @returns {Promise<TaToken>}
 */
const createCoin = async (coinBody) => {
  const coin = await TaToken.create(coinBody);
  return coin;
};

/**
 * Get all coin request
 * @returns {Promise<TaToken>}
 */
const getAllCoins = async () => {
  let coins = [];
  coins = await TaToken.find({}).sort([['createdAt', 'desc']]);
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
  const coins = await TaToken.paginate(filter, options);
  return coins;
};

/**
 * Get coin by id
 * @param {ObjectId} id
 * @returns {Promise<TaToken>}
 */
const getCoinById = async (id) => {
  return TaToken.findById(id);
};

/**
 * Update coin by id
 * @param {ObjectId} coinId
 * @param {Object} updateBody
 * @returns {Promise<TaToken>}
 */
const updateCoinById = async (coinId, updateBody) => {
  const coin = await getCoinById(coinId);
  if (!coin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TaToken Token not found');
  }
  Object.assign(coin, updateBody);
  await coin.save();
  return coin;
};

/**
 * Delete coin by id
 * @param {ObjectId} coinId
 * @returns {Promise<TaToken>}
 */
const deleteCoinById = async (coinId) => {
  const coin = await getCoinById(coinId);
  if (!coin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TaToken Token not found');
  }
  await coin.remove();
  return coin;
};

const getCoinsByToken = async (tokenId) => {
  let coins = [];
  coins = await TaToken.find({ tokenId }).sort([['createdAt', 'desc']]);
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
};
