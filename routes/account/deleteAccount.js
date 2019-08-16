'use strict';

const Account = require('../../models/account');

const deleteAccount = (req, res, next) => {
  // Delete a specific account by id
  Account.findByIdAndDelete(req.params.id, (err, account) => {
    if (err) return next(err);
    const msg = 'Successfully deleted account';
    res.status(200).json({ msg, account });
  });
};

module.exports = deleteAccount;
