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
    agreement1: {
      type: String,
      required: true,
    },
    agreement2: {
      type: String,
      required: true,
    },
    agreement: {
      type: [agreement],
      default: [],
    },
    agreement1_id: {
      type: String,
      required: true,
    },
    agreement2_id: {
      type: String,
      required: true,
    },
    invbuyer_signer: {
      type: Number,
      default: 2,
    },
    owner_approver: {
      type: Number,
      default: 2,
    },
    cashTxn: {
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
 * @typedef WrapperToken
 */
const WrapperToken = mongoose.model('wrapperToken', coinSchema);

module.exports = WrapperToken;
