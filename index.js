'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const winston = require('./winston');

require('dotenv').config();

const app = express();
const port = 3300 || process.env.PORT;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined', { stream: winston.stream }));

app.get('/', (req, res, next) => {
  res.send('Discounter Server');
});

app.use((err, req, res, next) => {
  winston.error(`${err.status || 500} - ${req.method} - ${err.message} - ${req.originalUrl} - ${req.ip}`);
  res.status(err.status || 500).json({ msg: 'An error has occured' });
})

app.listen(port, () => console.log('Discounter server running on port', port));

module.exports = app;