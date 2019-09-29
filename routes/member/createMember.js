'use strict';

const Member = require('../../models/member');
const decryptGroup = require('../../auth').decryptGroup;

const createMember = (req, res, next) => {
  // Ensure required params are present
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ msg: `Missing body params ${['firstName', 'lastName', 'email'].filter(param => req.body[param] === undefined || req.body[param] === null).join(', ')}` });
  }

  // Check group token
  if (!req.get('token')) return res.status(401).json({ msg: 'Missing group token in header' });

  const groupId = decryptGroup(req.get('token'));

  // Create new member
  req.body.group = groupId;
  req.body.created = Date.now();
  new Member(req.body).save((err, member) => {
    if (err) return next(err);

    // Send a confirmation mail that they have been enrolled

    // Automation
    // Check remaining group members and trigger reminder email or discount email as required

    const msg = 'Successfully created new member';
    res.status(201).json({ msg, member });
  });
};

module.exports = createMember;
