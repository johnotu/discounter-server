'use strict';

const Group = require('../../models/group');

const createGroup = (req, res, next) => {
  // Ensure required params are present
  const { name, signupStarts, signupEnds, discountPercentage, totalMembers } = req.body;
  if (!name || !signupStarts || !signupEnds || !discountPercentage || !totalMembers) { return res.status(400).json({ msg: `Missing body params ${['name', 'signupStarts', 'signupEnds', 'discountPercentage', 'totalMembers'].filter(param => req.body[param] === undefined || req.body[param] === null).join(', ')}` }); }

  // Create new group
  req.body.account = String(req.get('account'));
  req.body.created = Date.now();
  new Group(req.body).save((err, group) => {
    if (err) return next(err);

    // Update group singupUrl
    Group.findByIdAndUpdate(group._id, { signupUrl: `${process.env.FRONTEND_URL}/group-signup/${group._id}`, lastUpdated: Date.now() }, { new: true }, (err, group) => {
      if (err) return next(err);

      const msg = 'Successfully created new group';
      res.status(201).json({ msg, group });
    });
  });
};

module.exports = createGroup;
