'use strict';

const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: { type: String, required: true },
  adminFirstName: { type: String, required: true },
  adminLastName: { type: String, required: true },
  adminEmail: { type: String, required: true },
  adminPassword: { type: String, required: true },
  createdAt: { type: Date },
  lastUpdateAt: { type: Date }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
