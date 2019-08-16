'use strict';

const Account = require('../../models/account');

const getAccounts = (req, res, next) => {
  // Obtain all accounts
  Account.find((err, accounts) => {
    if (err) return next(err);
    const msg = 'Successfully obtained all accounts';
    res.status(200).json({ msg, accounts });
  });
};

module.exports = getAccounts;
