'use strict';

const Group = require('../../models/group');

const deleteGroup = (req, res, next) => {
  // Delete a specific group by id
  Group.findOneAndRemove({ _id: req.params.id, account: req.get('account') }, (err, group) => {
    if (err) return next(err);

    if (!group) return res.status(400).json({ msg: 'Could not delete group' });

    const msg = 'Successfully deleted group';
    res.status(200).json({ msg, group });
  });
};

module.exports = deleteGroup;
