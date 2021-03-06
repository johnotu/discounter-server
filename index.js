'use strict';

require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const winston = require('./winston');
const mongoose = require('mongoose');

const accountRoutes = require('./routes/account/account');
const groupRoutes = require('./routes/group/group');
const loginRoute = require('./routes/account/login');
const memberRoutes = require('./routes/member/member');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(m => {
    console.log('Successful connection to DB');
    m.connection.on('error', err => console.log('Error connecting to DB', err));
  }, err => console.log('Error connecting to DB', err));

const app = express();
const port = process.env.PORT || 3300;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined', { stream: winston.stream }));

app.use('/login', loginRoute);
app.use('/account', accountRoutes);
app.use('/group', groupRoutes);
app.use('/member', memberRoutes);

app.get('/', (req, res, next) => {
  res.send('Discounter');
});

app.use((err, req, res, next) => {
  winston.error(`${err.status || 500} - ${req.method} - ${err.message} - ${req.originalUrl} - ${req.ip}`);
  console.log('Server error', err);
  res.status(err.status || 500).json({ msg: 'An error has occured' });
});

app.listen(port, () => console.log('Discounter server running on port', port));

module.exports = app;
