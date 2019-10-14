'use strict';

const crypto = require('crypto');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const serverError = require('../../util/serverError');

const db = require('../../firestore');
const accountRef = db.collection('account');

const login = (req, res) => {
  // Treat ony POST requests
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST requests are allowed!' });

  // Accept only JSON
  if (req.get('Content-Type') !== 'Application/json') return res.status(400).json({ message: 'Only JSON formatted request body is accepted' });

  // Ensure required params are present
  let { email, password } = req.body;
  if (!email || !password ) return res.status(400).json({ msg: `Missing params ${['email', 'password'].filter(param => req.body[param] === undefined || req.body[param] === null).join(', ')}` });

  // Confirm that email does not already exist
  accountRef.where('email', '==', email).get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log(`Account ${email} does not exist`);
        return res.status(403).json({ msg: 'Account does not exist. Please signup' });
      } else {
        let account;
        snapshot.forEach(doc => {
          account = doc.data();
        });

        // Check password match
        bcrypt.compare(password, account.password, (err, isMatch) => {
          if (err) return serverError(`Error comparing password hash for account ${email}`, err, res);
        
          if (!isMatch) {
            console.log(`Invalid password for account ${email}`);
            return res.status(403).json({ message: 'Invalid password' })
          }

          // Password match

          // Generate token
          crypto.randomBytes(15, (err, buf) => {
            if (err) return serverError(`Error generating token for account ${email}`, err, res);

            const token = buf.toString('hex');

            const lastUpdated = Date.now();

            accountRef.doc(account.id).update({ token, lastUpdated })
              .then(ref => {
                console.log(`Successfully logged-in account ${email}`);
                res.status(200).json({ message: 'Successfully logged in account', account });
              })
              .catch(error => {
                console.error(`Error logging in user: `, error);
                res.status(500).json({ message: 'Error logging in user' });
              });
          });
        });
      }
    }).catch(function (error) {
      console.error("Error getting user by email for login:", error);
      res.status(500).json({ message: 'Oops! Something went wrong from our end' });
    });
}

module.exports = login;