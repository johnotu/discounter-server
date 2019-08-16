'use strict';

const Account = require('../../models/account');

const createAccount = (req, res, next) => {
  // Ensure required params are present
  const { name, adminFirstName, adminLastName, adminEmail, adminPassword } = req.body;
  if (!name || !adminFirstName || !adminLastName || !adminEmail || !adminPassword) {
    const missingParams = ['name', 'adminFirstName', 'adminLastName', 'adminEmail', 'adminPassword'].filter(param => req.body[param] === undefined || req.body[param] === null);
    return res.status(400).json({ msg: `Missing params ${missingParams}` });
  }

  // Hash password

  // Create new account
  req.body.createdAt = Date.now();
  new Account(req.body).save((err, account) => {
    if (err) return next(err);
    const msg = 'Successfully created new account';
    res.status(201).json({ msg, account });
  });
};

module.exports = createAccount;
