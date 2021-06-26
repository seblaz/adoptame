const express = require('express');
const pino = require('express-pino-logger')();
const cors = require('cors');

const initRoutes = require('./routes');

const app = express();

/* eslint-disable */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
/* eslint-enable */

app.use(express.json({ limit: '50mb' }));
app.use(cors());
if (process.env.NODE_ENV !== 'testing') {
  app.use(pino);
}
initRoutes(app);

module.exports = app;
