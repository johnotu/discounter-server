'use strict';

const db = require('../../firestore');
const userRef = db.collection('user');

const requestDemo = (req, res) => {
  // Treat ony POST requests
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST requests are allowed!' });

  // Ensure required params are present
  const { organisationName, firstName, lastName, email, organisationDescription } = req.body;
  if (!organisationName || !firstName || !lastName || !email || !organisationDescription) return res.status(400).json({ msg: `Missing params ${['organisationName', 'firstName', 'lastName', 'email', 'organisationDescription'].filter(param => req.body[param] === undefined || req.body[param] === null).join(', ')}` });

  // Confirm that email does not already exist
  userRef.doc(email).get()
    .then( doc => {
      if (doc.exists) {
        // console.log("Document data:", doc.data());
        return res.status(400).json({ msg: 'Account already exists.' });
      } else {
        // doc.data() will be undefined in this case
        console.log(`No such user ${email}. Creating new user... `);
        userRef.doc(email).set({ firstName, lastName, email, organisationName, organisationDescription })
          .then( ref => {
            console.log(`User ${email} successfully created with ref ${ref.id}`);
            // Send a welcome email @TODO


            res.status(201).json({ message: 'Successfully created new account', user: {firstName, lastName, email, organisationName, organisationDescription} });
          })
          .catch( error => {
            console.error(`Error creating user: `, error);
            res.status(500).json({ message: 'Oops! Something went wrong from our end' });
          });
      }
    }).catch(function (error) {
      console.error("Error getting user by email:", error);
      res.status(500).json({ message: 'Oops! Something went wrong from our end' });
    });
}

module.exports = requestDemo;