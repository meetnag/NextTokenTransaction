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
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['REQUESTED', 'APPROVED', 'REJECTED', 'TRANSFERED'],
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
