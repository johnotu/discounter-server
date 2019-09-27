'use strict';

const router = require('express').Router();
const createAccount = require('./createAccount');
const getAccounts = require('./getAccounts');
const getAccount = require('./getAccount');
const updateAccount = require('./updateAccount');
const deleteAccount = require('./deleteAccount');

const auth = require('../../auth');

router.post('/', (req, res, next) => createAccount(req, res, next));
router.get('/', auth.superAdmin, (req, res, next) => getAccounts(req, res, next));
router.get('/:id', auth.account, (req, res, next) => getAccount(req, res, next));
router.put('/:id', auth.account, (req, res, next) => updateAccount(req, res, next));
router.delete('/:id', auth.account, (req, res, next) => deleteAccount(req, res, next));

module.exports = router;
