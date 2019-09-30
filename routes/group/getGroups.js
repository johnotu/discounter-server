'use strict';

const Group = require('../../models/group');

const getGroups = (req, res, next) => {
  // Obtain all groups
  Group.find({ account: String(req.get('account')) }, (err, groups) => {
    if (err) return next(err);

    // Check if there are no groups
    if (groups.length < 1) return res.status(404).json({ msg: 'No groups found. Please create a new group.' });

    const msg = 'Successfully obtained all groups';
    res.status(200).json({ msg, groups });
  });
};

module.exports = getGroups;
