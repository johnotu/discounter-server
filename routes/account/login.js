'use strict';

const crypto = require('crypto');

const Account = require('../../models/account');

const login = (req, res, next) => {
  // Ensure required params are present
  const { email, password } = req.body;
  console.log('email', email, '\npassword', password);
  if (!email || !password) {
    const missingParams = ['email', 'password'].filter(param => req.body[param] === undefined || req.body[param] === null);
    return res.status(400).json({ msg: `Missing params ${missingParams}` });
  }

  // Obtain account by email
  Account.find({ email }, (err, accountArray) => {
    if (err) return next(err);

    if (accountArray.length < 1) return res.status(404).json({ msg: 'Account not found' });

    if (accountArray.length > 1) return res.status(400).json({ msg: 'Multiple accounts exist for this email.We will resolve this and get back to you' });

    const account = accountArray[0];
    console.log('account', account);

    // Check password is correct
    crypto.pbkdf2(password, account.salt, 1000, 64, 'sha512', (err, derivedKey) => {
      if (err) return next(err);
      const givenHash = derivedKey.toString('hex');
      console.log('hash compare', account.password, givenHash);

      if (account.password !== givenHash) return res.status(403).json({ msg: 'Wrong password' });

      // Genenrate new token and expiry
      crypto.randomBytes(20, (err, buf) => {
        if (err) return next(err);
        const update = {
          token: buf.toString('hex'),
          tokenExpiry: Date.now() + 720000000,
          lastUpdated: Date.now()
        };

        Account.findByIdAndUpdate(account._id, update, (err, account) => {
          if (err) return next(err);
          res.status(200).json({ msg: 'Successfully verified user', account });
        });
      });
    });
  });
};

module.exports = login;
