const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const coinSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    numberOfToken: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
coinSchema.plugin(toJSON);

/**
 * @typedef Coin
 */
const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;
