'use strict';

const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  signupStarts: { type: Date },
  signupEnds: { type: Date },
  emailTriggerNumbers: [{ type: Number }],
  discountPercentage: { type: Number },
  totalMembers: { type: Number },
  signupUrl: { type: String },
  isActive: { type: Boolean },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Member' }],
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
