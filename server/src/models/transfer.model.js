const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const transferSchema = mongoose.Schema(
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
    invoice_no: {
      type: String,
      required: true,
    },
    vendor_accepted_token: {
      type: Number,
      default: 2,
    },
    ar_account: {
      type: String,
      default: '',
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
    status: {
      type: String,
      enum: ['REQUESTED', 'ACCEPTED', 'REJECTED', 'TRANSFERRED'],
      default: 'REQUESTED',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
transferSchema.plugin(toJSON);

/**
 * @typedef Transfer
 */
const Transfer = mongoose.model('Transfer', transferSchema);

module.exports = Transfer;
