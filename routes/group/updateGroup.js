'use strict';

const Group = require('../../models/group');

const updateGroup = (req, res, next) => {
  const { members, account } = req.body;
  // Prevent members from being updated
  if (members || account) return res.status(400).json({ msg: 'Invalid params. Group account and membership cannot be updated.' });

  // Update group by id
  req.body.lastUpdated = Date.now();
  Group.findOneAndUpdate({ _id: req.params.id, account: req.get('account') }, req.body, { new: true }, (err, group) => {
    if (err) return next(err);
    const msg = 'Successfully updated group';
    res.status(200).json({ msg, group });
  });
};

module.exports = updateGroup;
