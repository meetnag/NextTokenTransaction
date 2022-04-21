/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { Coin } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a coin request
 * @param {Object} coinBody
 * @returns {Promise<Coin>}
 */
const createCoin = async (coinBody) => {
  const coin = await Coin.create(coinBody);
  return coin;
};

/**
 * Get all coin request
 * @returns {Promise<Coin>}
 */
const getAllCoins = async () => {
  let coins = [];
  coins = await Coin.find({}).sort([['createdAt', 'desc']]);
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
  const coins = await Coin.paginate(filter, options);
  return coins;
};

/**
 * Get coin by id
 * @param {ObjectId} id
 * @returns {Promise<Coin>}
 */
const getCoinById = async (id) => {
  return Coin.findById(id);
};

/**
 * Update coin by id
 * @param {ObjectId} coinId
 * @param {Object} updateBody
 * @returns {Promise<Coin>}
 */
const updateCoinById = async (coinId, updateBody) => {
  const coin = await getCoinById(coinId);
  if (!coin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
  }
  Object.assign(coin, updateBody);
  await coin.save();
  return coin;
};

/**
 * Delete coin by id
 * @param {ObjectId} coinId
 * @returns {Promise<Coin>}
 */
const deleteCoinById = async (coinId) => {
  const coin = await getCoinById(coinId);
  if (!coin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
  }
  await coin.remove();
  return coin;
};

const getCoinsByToken = async (tokenId) => {
  let coins = [];
  coins = await Coin.find({ tokenId }).sort([['createdAt', 'desc']]);
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
