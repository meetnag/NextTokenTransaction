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
 * @typedef Invoice
 */
const Invoice = mongoose.model('Invoice', coinSchema);

module.exports = Invoice;
