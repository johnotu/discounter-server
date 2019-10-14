const Firestore = require('@google-cloud/firestore');
const firestore = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: './auth-discounter-dev.json'
});

module.exports = firestore;
