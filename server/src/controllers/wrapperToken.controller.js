const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { wrapperTokenService } = require('../services');

const createCoin = catchAsync(async (req, res) => {
  const coin = await wrapperTokenService.createCoin(req.body);
  res.status(httpStatus.CREATED).send(coin);
});

const getAllCoins = catchAsync(async (req, res) => {
  const result = await wrapperTokenService.getAllCoins();
  res.send(result);
});

const getCoins = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await wrapperTokenService.queryCoins(filter, options);
  res.send(result);
});

const getCoin = catchAsync(async (req, res) => {
  const coin = await wrapperTokenService.getCoinById(req.params.coinId);
  if (!coin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Wrapper Token not found');
  }
  res.send(coin);
});

const updateCoin = catchAsync(async (req, res) => {
  const coin = await wrapperTokenService.updateCoinById(req.params.coinId, req.body);
  res.send(coin);
});

const deleteCoin = catchAsync(async (req, res) => {
  await wrapperTokenService.deleteCoinById(req.params.coinId);
  res.status(httpStatus.NO_CONTENT).send();
});

const ApproveCoin = catchAsync(async (req, res) => {
  const coin = await wrapperTokenService.updateCoinById(req.params.coinId, req.body);
  res.send(coin);
});

const getCoinsByToken = catchAsync(async (req, res) => {
  const result = await wrapperTokenService.getCoinsByToken(req.params.tokenId);
  res.send(result);
});

module.exports = {
  createCoin,
  getAllCoins,
  getCoins,
  getCoin,
  updateCoin,
  deleteCoin,
  ApproveCoin,
  getCoinsByToken,
};
