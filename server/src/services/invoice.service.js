/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { Invoice } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a coin request
 * @param {Object} coinBody
 * @returns {Promise<Invoice>}
 */
const createCoin = async (coinBody) => {
  const coin = await Invoice.create(coinBody);
  return coin;
};

/**
 * Get all coin request
 * @returns {Promise<Invoice>}
 */
const getAllCoins = async () => {
  let coins = [];
  coins = await Invoice.find({}).sort([['createdAt', 'desc']]);
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
  const coins = await Invoice.paginate(filter, options);
  return coins;
};

/**
 * Get coin by id
 * @param {ObjectId} id
 * @returns {Promise<Invoice>}
 */
const getCoinById = async (id) => {
  return Invoice.findById(id);
};

/**
 * Update coin by id
 * @param {ObjectId} coinId
 * @param {Object} updateBody
 * @returns {Promise<Invoice>}
 */
const updateCoinById = async (coinId, updateBody) => {
  const coin = await getCoinById(coinId);
  if (!coin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invoice Token not found');
  }
  Object.assign(coin, updateBody);
  await coin.save();
  return coin;
};

/**
 * Delete coin by id
 * @param {ObjectId} coinId
 * @returns {Promise<Invoice>}
 */
const deleteCoinById = async (coinId) => {
  const coin = await getCoinById(coinId);
  if (!coin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invoice Token not found');
  }
  await coin.remove();
  return coin;
};

const getCoinsByToken = async (tokenId) => {
  let coins = [];
  coins = await Invoice.find({ tokenId }).sort([['createdAt', 'desc']]);
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
