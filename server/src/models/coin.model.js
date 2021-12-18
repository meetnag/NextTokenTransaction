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
    agreement: {
      type: String,
      required: true,
    },
    credit_Enhancement: {
      type: String,
      required: true,
    },
    guarantee: {
      type: String,
      required: true,
    },
    renewal: {
      type: Boolean,
      default: true,
    },
    days: {
      type: Number,
      required: true,
    },
    date_of_Expiration: {
      type: String,
      required: true,
    },
    internal_approver: {
      type: Number,
      default: 2,
    },
    external_signer: {
      type: Number,
      default: 2,
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
