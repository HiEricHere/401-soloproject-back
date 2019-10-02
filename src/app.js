'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const authRoute = require('../src/routes/auth/auth-route');

//misc middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//error middleware

//routes
app.use(authRoute);
app.get('/', (req,res)=>{res.send('im aliiiiiive');});

module.exports = {
  server: app,
  start: (port) => {
    let PORT = port || process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`BATTLECRUISER OPERATIONAL: ${PORT}`);
    });
  },
};
