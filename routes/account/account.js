'use strict';

const router = require('express').Router();
const createAccount = require('./createAccount');
const getAccounts = require('./getAccounts');
const getAccount = require('./getAccount');
const deleteAccount = require('./deleteAccount');

router.post('/', (req, res, next) => createAccount(req, res, next));
router.get('/', (req, res, next) => getAccounts(req, res, next));
router.get('/:id', (req, res, next) => getAccount(req, res, next));
router.delete('/:id', (req, res, next) => deleteAccount(req, res, next));

module.exports = router;
