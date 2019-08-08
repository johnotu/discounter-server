'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = 3300 || process.env.PORT;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => console.log('Discounter server running on port', port));