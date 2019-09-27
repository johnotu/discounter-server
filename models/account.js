'use strict';

const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  organisationName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String },
  token: { type: String },
  tokenExpiry: { type: Date },
  created: { type: Date },
  lastUpdated: { type: Date }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
