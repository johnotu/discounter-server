'use strict';

const Account = require('../../models/account');

const getAccount = (req, res, next) => {
  // Obtain a specific account by id
  Account.findById(req.params.id, (err, account) => {
    if (err) return next(err);

    if (!account) {
      const msg = 'Account not found';
      return res.status(404).json({ msg });
    }

    const msg = 'Successfully obtained account';
    res.status(200).json({ msg, account });
  });
};

module.exports = getAccount;
