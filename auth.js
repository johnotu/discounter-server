'use strict';

const Account = require('./models/account');

const superAdmin = (req, res, next) => {
  if (req.get('superAdminToken') !== process.env.SUPER_ADMIN_TOKEN) {
    const msg = 'Invalid superAdmin token';
    return res.status(401).json({ msg });
  }
  next();
};

const account = (req, res, next) => {
  if (!req.get('token')) return res.status(400).json({ msg: 'Missing header param: token' });

  Account.findById(req.params.id, (err, account) => {
    if (err) return next(err);

    if (!account) return res.status(404).json({ msg: 'Account not found' });

    if (req.get('token') !== account.token || new Date(account.tokenExpiry) < Date.now()) return res.status(401).json({ msg: 'Invalid or expired account token' });

    next();
  });
};

module.exports = { superAdmin, account };
