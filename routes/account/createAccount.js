'use strict';

const crypto = require('crypto');
const Account = require('../../models/account');
const encryptId = require('../../auth').encryptId;

const createAccount = (req, res, next) => {
  // Ensure required params are present
  const { organisationName, firstName, lastName, email, password } = req.body;
  if (!organisationName || !firstName || !lastName || !email || !password) {
    const missingParams = ['organisationName', 'firstName', 'lastName', 'email', 'password'].filter(param => req.body[param] === undefined || req.body[param] === null);
    return res.status(400).json({ msg: `Missing params ${missingParams}` });
  }

  // Confirm that email does not already exist
  Account.find({ email: email }, (err, account) => {
    if (err) return next(err);
    console.log('existing account', account);
    if (account.length > 0) return res.status(400).json({ msg: 'Account already exists. Please login or signup with another email' });

    // Hash password
    crypto.randomBytes(15, (err, buf) => {
      if (err) return next(err);
      const salt = buf.toString('hex');
      crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
        if (err) return next(err);
        req.body.password = derivedKey.toString('hex');
        req.body.salt = salt;

        // Create new account
        req.body.created = Date.now();
        new Account(req.body).save((err, account) => {
          if (err) return next(err);

          // create token and update account
          const token = encryptId(account._id);
          Account.findByIdAndUpdate(account._id, { token, lastUpdated: Date.now() }, { new: true }, (err, account) => {
            if (err) return next(err);
            const msg = 'Successfully created new account';
            res.status(201).json({ msg, account });
          });
        });
      });
    });
  });
};

module.exports = createAccount;
