'use strict';

const router = require('express').Router();
// const auth = require('../../auth');

// const getMembers = require('./getMembers');
const createMember = require('./createMember');

// router.get('/', auth.account, (req, res, next) => getMembers(req, res, next));
router.post('/', (req, res, next) => createMember(req, res, next));

module.exports = router;
