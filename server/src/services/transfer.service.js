/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');
const { Transfer } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a transfer request
 * @param {Object} transferBody
 * @returns {Promise<Transfer>}
 */
const createTransfer = async (transferBody) => {
  let transfer = await Transfer.findOne({ user: transferBody.user });
  if (!transfer) {
    transfer = await Transfer.create(transferBody);
  } else {
    transfer = await updateTransferById(transfer.id, transferBody);
  }
  return transfer;
};

/**
 * Get all transfer request
 * @param {Object} user - user
 * @returns {Promise<Transfer>}
 */
const getAllTransfers = async (user) => {
  let transfers = [];
  // if (user.role === 'admin') {
  //   transfers = await Transfer.find({}).sort([['createdAt', 'desc']]);
  // } else {
  //   transfers = await Transfer.find({ user: user.id }).sort([['createdAt', 'desc']]);
  // }
  transfers = await Transfer.find({}).sort([['createdAt', 'desc']]);
  return transfers;
};

/**
 * Query for transfers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTransfers = async (filter, options) => {
  const transfers = await Transfer.paginate(filter, options);
  return transfers;
};

/**
 * Get transfer by id
 * @param {ObjectId} id
 * @returns {Promise<Transfer>}
 */
const getTransferById = async (id) => {
  return Transfer.findById(id);
};

/**
 * Update transfer by id
 * @param {ObjectId} transferId
 * @param {Object} updateBody
 * @returns {Promise<Transfer>}
 */
const updateTransferById = async (transferId, updateBody) => {
  const transfer = await getTransferById(transferId);
  if (!transfer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transfer Request not found');
  }
  Object.assign(transfer, updateBody);
  await transfer.save();
  return transfer;
};

/**
 * Delete transfer by id
 * @param {ObjectId} transferId
 * @returns {Promise<Transfer>}
 */
const deleteTransferById = async (transferId) => {
  const transfer = await getTransferById(transferId);
  if (!transfer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Transfer Request not found');
  }
  await transfer.remove();
  return transfer;
};

module.exports = {
  createTransfer,
  getAllTransfers,
  queryTransfers,
  getTransferById,
  updateTransferById,
  deleteTransferById,
};
