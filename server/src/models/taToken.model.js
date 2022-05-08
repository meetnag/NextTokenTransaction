const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const agreement = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    flag: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const coinSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    tokenId: {
      type: String,
    },
    invoiceNo: {
      type: String,
      required: true,
    },
    tokens: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    agreement: {
      type: [agreement],
      default: [],
    },
    external_signer: {
      type: Number,
      default: 2,
    },
    owner_approver: {
      type: Number,
      default: 2,
    },
    vendor_signer: {
      type: Number,
      default: 2,
    },
    lender_approver: {
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
 * @typedef TaToken
 */
const TaToken = mongoose.model('taToken', coinSchema);

module.exports = TaToken;
