'use strict';

const Group = require('../../models/group');

const getGroup = (req, res, next) => {
  // Obtain a specific group by id
  Group.find({ _id: req.params.id, account: req.get('account') }, (err, groupArr) => {
    if (err) return next(err);

    if (groupArr.length < 1) {
      const msg = 'Group not found';
      return res.status(404).json({ msg });
    }
    const group = groupArr[0];
    const msg = 'Successfully obtained group';
    res.status(200).json({ msg, group });
  });
};

module.exports = getGroup;
