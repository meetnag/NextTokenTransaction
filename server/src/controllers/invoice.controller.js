const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { invoiceService } = require('../services');

const createCoin = catchAsync(async (req, res) => {
  const coin = await invoiceService.createCoin(req.body);
  res.status(httpStatus.CREATED).send(coin);
});

const getAllCoins = catchAsync(async (req, res) => {
  const result = await invoiceService.getAllCoins();
  res.send(result);
});

const getCoins = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await invoiceService.queryCoins(filter, options);
  res.send(result);
});

const getCoin = catchAsync(async (req, res) => {
  const coin = await invoiceService.getCoinById(req.params.coinId);
  if (!coin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invoice Token not found');
  }
  res.send(coin);
});

const updateCoin = catchAsync(async (req, res) => {
  const coin = await invoiceService.updateCoinById(req.params.coinId, req.body);
  res.send(coin);
});

const deleteCoin = catchAsync(async (req, res) => {
  await invoiceService.deleteCoinById(req.params.coinId);
  res.status(httpStatus.NO_CONTENT).send();
});

const ApproveCoin = catchAsync(async (req, res) => {
  const coin = await invoiceService.updateCoinById(req.params.coinId, req.body);
  res.send(coin);
});

module.exports = {
  createCoin,
  getAllCoins,
  getCoins,
  getCoin,
  updateCoin,
  deleteCoin,
  ApproveCoin,
};
