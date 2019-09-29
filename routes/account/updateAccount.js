'use strict';

const Account = require('../../models/account');

const updateAccount = (req, res, next) => {
  // Make sure password, token and salt can not be updated
  if (req.body.password || req.body.token || req.body.salt) return res.status(403).json({ msg: `Invalid update parameter(s) ${['password', 'token', 'salt'].filter(param => req.body[param]).join(', ')}` });

  req.body.lastUpdated = Date.now();

  // Update a specific account by id
  Account.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false }, (err, account) => {
    if (err) return next(err);

    if (!account) {
      const msg = 'Account not found';
      return res.status(404).json({ msg });
    }

    const msg = 'Successfully updated account';
    res.status(200).json({ msg, account });
  });
};

module.exports = updateAccount;
