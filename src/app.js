'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/errorHandler');
const authRoute = require('../src/routes/auth/auth-route');
const contentRoute = require('../src/routes/content/content-route');

//misc middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//routes
app.use(authRoute);
app.use(contentRoute);

//error middleware
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`💻➰➰${PORT}➰➰🔋`);
    });
  },
};
