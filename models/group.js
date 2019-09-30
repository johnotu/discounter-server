'use strict';

const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  signupStarts: { type: Date, required: true },
  signupEnds: { type: Date, required: true },
  emailTriggerNumbers: [{ type: Number }],
  discountPercentage: { type: Number, required: true },
  totalMembers: { type: Number, required: true },
  signupUrl: { type: String },
  status: { type: String, enum: ['Not started', 'Active', 'Expired'], default: 'Not started' },
  image: { type: String },
  token: { type: String },
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  created: { type: Date },
  lastUpdated: { type: Date }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
