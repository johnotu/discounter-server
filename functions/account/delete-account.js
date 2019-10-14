const db = require('../../firestore');
const accountRef = db.collection('account');

const deleteAccount = (req, res) => {
  // Treat ony POST requests
  if (req.method !== 'POST') return res.status(405).json({ message: 'Only POST requests are allowed!' });

  // Accept only JSON
  if (req.get('Content-Type') !== 'Application/json') return res.status(400).json({ message: 'Only JSON formatted request body is accepted' });

  //check token and id
  const { token, id } = req.body;

  if (!token || !id) {
    console.log(`Missing token or id in request body`)
    return res.status(403).json({ message: `Missing param(s) ${['token', 'id'].filter(param => req.body[param] === undefined || req.body[param] === null).join(', ')} in request body` });
  }

  accountRef.doc(id).get()
    .then(doc => {
      if (!doc.exists) {
        console.log(`Account ${id} does not exist`);
        return res.status(403).json({ message: 'Account does not exist' });
      }

      const account = doc.data();

      // Match account token
      if (account.token !== token) {
        console.log(`Invalid account token`);
        return res.status(403).json({ message: 'Invalid account token' });
      }
      
      accountRef.doc(id).delete()
        .then(ref => {
          console.log(`Account ${id} successfully deleted.`);

          // Send account delete email @TODO

          res.status(200).json({ message: 'Successfully deleted account' });
        })
        .catch(error => {
          console.error(`Error deleting account: `, error);
          res.status(500).json({ message: 'Oops! Something went wrong from our end' });
        });
    });
};

module.exports = deleteAccount;