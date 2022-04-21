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
    agreement3: {
      type: String,
      required: true,
    },
    agreement4: {
      type: String,
      required: true,
    },
    agreement5: {
      type: String,
    },
    agreement1_id: {
      type: String,
      required: true,
    },
    agreement2_id: {
      type: String,
      required: true,
    },
    agreement3_id: {
      type: String,
      required: true,
    },
    agreement4_id: {
      type: String,
      required: true,
    },
    agreement5_id: {
      type: String,
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
