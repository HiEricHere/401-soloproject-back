'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const { start } = require('./src/app');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, options);

start( process.env.PORT);
