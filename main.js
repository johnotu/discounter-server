'use strict';

const createAccount = require('./functions/account/create-account');
const getAccount = require('./functions/account/get-account');
const updateAccount = require('./functions/account/update-account');
const deleteAccount = require('./functions/account/delete-account');
const loginAcount = require('./functions/account/login-account');

exports.createAccount = (req, res) => createAccount(req, res);
exports.getAccount = (req, res) => createAccount(req, res);
exports.updateAccount = (req, res) => updateAccount(req, res);
exports.deleteAccount = (req, res) => deleteAccount(req, res);
exports.loginAcount = (req, res) => loginAcount(req, res);