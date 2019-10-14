'use strict';

const createAccount = require('./functions/account/create-account');
const getAccount = require('./functions/account/get-account');
const updateAccount = require('./functions/account/update-account');
const deleteAccount = require('./functions/account/delete-account');
const loginAccount = require('./functions/account/login-account');

exports.createAccount = (req, res) => createAccount(req, res);
exports.getAccount = (req, res) => getAccount(req, res);
exports.updateAccount = (req, res) => updateAccount(req, res);
exports.deleteAccount = (req, res) => deleteAccount(req, res);
exports.loginAccount = (req, res) => loginAccount(req, res);