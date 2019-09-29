'use strict';

const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  // account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  created: { type: Date }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
