'use strict';

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const serverError = require('../../util/serverError');

const db = require('../../firestore');
const accountRef = db.collection('account');

const createAccount = (req, res) => {
  // Treat ony POST requests
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST requests are allowed!' });

  // Accept only JSON
  if (req.get('Content-Type') !== 'Application/json') return res.status(400).json({ message: 'Only JSON formatted request body is accepted' });

  // Ensure required params are present
  let { organisationName, firstName, lastName, email, password, organisationDescription } = req.body;
  if (!organisationName || !firstName || !lastName || !email || !password || !organisationDescription) return res.status(400).json({ msg: `Missing params ${['organisationName', 'firstName', 'lastName', 'email', 'password', 'organisationDescription'].filter(param => req.body[param] === undefined || req.body[param] === null).join(', ')}` });

  // Confirm that email does not already exist
  accountRef.where('email', '==', email).get()
    .then(snapshot => {
      if (!snapshot.empty) {
        console.log(`Account ${email} already exists`);
        return res.status(400).json({ msg: 'Account already exists. Please login' });
      } else {
        // doc.data() will be undefined in this case
        console.log(`Account ${email} does not exist. Creating new account... `);

        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
          if (err) return serverError(`Error generating salt for account ${email}`, err, res);

          bcrypt.hash(password, salt, (err, hash) => {
            if (err) return serverError(`Error hashing password for account ${email}`, err, res);
          password = hash;

            // Generate token
            crypto.randomBytes(15, (err, buf) => {
              if (err) return serverError(`Error generating token for account ${email}`, err, res);

              const token = buf.toString('hex');
          

              // Create new account
              const created = Date.now();
              const id = uuidv4();

              accountRef.doc(id).set({ firstName, lastName, email, password, organisationName, organisationDescription, token, id, created })
                .then(ref => {
                  console.log(`Account ${email} successfully created.`);
                  // Send a welcome email @TODO


                  res.status(201).json({ message: 'Successfully created new account', user: { firstName, lastName, email, organisationName, organisationDescription, token, id } });
                })
                .catch(error => {
                  console.error(`Error creating user: `, error);
                  res.status(500).json({ message: 'Oops! Something went wrong from our end' });
                });
            });
          });
        });
      }
    }).catch(function (error) {
      console.error("Error getting user by email:", error);
      res.status(500).json({ message: 'Oops! Something went wrong from our end' });
    });
}

module.exports = createAccount;