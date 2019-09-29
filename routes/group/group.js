'use strict';

const router = require('express').Router();
const auth = require('../../auth');
const createGroup = require('./createGroup');
const getGroups = require('./getGroups');
const getGroup = require('./getGroup');
const deleteGroup = require('./deleteGroup');
const updateGroup = require('./updateGroup');

router.post('/', auth.account, (req, res, next) => createGroup(req, res, next));
router.get('/', auth.account, (req, res, next) => getGroups(req, res, next));
router.get('/:id', auth.account, (req, res, next) => getGroup(req, res, next));
router.delete('/:id', auth.account, (req, res, next) => deleteGroup(req, res, next));
router.put('/:id', auth.account, (req, res, next) => updateGroup(req, res, next));

module.exports = router;
