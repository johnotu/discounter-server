'use strict';

const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
