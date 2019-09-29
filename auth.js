'use strict';

const crypto = require('crypto');

const Account = require('./models/account');

const superAdmin = (req, res, next) => {
  if (req.get('superAdminToken') !== process.env.SUPER_ADMIN_TOKEN) {
    const msg = 'Invalid superAdmin token';
    return res.status(401).json({ msg });
  }
  next();
};

const account = (req, res, next) => {
  if (!req.get('token')) return res.status(401).json({ msg: 'Missing header param: token' });
  const splitToken = req.get('token').split('-');
  if (splitToken.length !== 2 || splitToken[0].length !== 32) return res.status(401).json({ msg: 'Invalid token' });

  // Get account id and token expiry from token
  const iAm = decryptToken(req.get('token')).split('-');
  const id = iAm[0];
  const expiry = iAm[1];
  // Check that token has not expired
  if (expiry <= Date.now()) return res.status(401).json({ msg: 'Expired acount token. Please login' });

  // Get account details from id
  Account.findById(id, (err, account) => {
    if (err) return next(err);
    if (!account) return res.status(404).json({ msg: 'Account not found' });

    // add account id to header
    req.headers['account'] = account._id;
    // // Check that token matches user's
    // if (req.get('token') !== account.token) return res.status(401).json({ msg: 'Invalid account token' });

    next();
  });
};

// Make sure authenticated account is one to be updated
const accountOwner = (req, res, next) => String(req.get('account')) !== req.params.id ? res.status(403).json({ msg: 'Invalid owner account' }) : next();

const encryptId = id => {
  const initVector = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY), initVector);
  const encryptedId = cipher.update(`${id}-${Date.now() + 604800000}`);
  return `${initVector.toString('hex')}-${Buffer.concat([encryptedId, cipher.final()]).toString('hex')}`;
};

const decryptToken = token => {
  const splitToken = token.split('-');
  const initVector = Buffer.from(splitToken.shift(), 'hex');
  const encryptedId = Buffer.from(splitToken.join('-'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(process.env.ENCRYPTION_KEY), initVector);
  const decryptedId = decipher.update(encryptedId);
  return Buffer.concat([decryptedId, decipher.final()]).toString();
};

module.exports = { superAdmin, account, encryptId, decryptToken, accountOwner };
