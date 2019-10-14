'use strict';

const serverError = (msg, err, res) => {
  console.error(msg, err);
  res.status(500).json({ message: 'Oops! Something went wrong from our end' });
}

module.exports = serverError;