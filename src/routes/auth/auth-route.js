'use strict';

const express = require('express');
// eslint-disable-next-line new-cap
const authRoute = express.Router();
const authenticate = require('../../middleware/authenticate-middleware');
let User = require('../../models/auth/user-model');

authRoute.post('/signup', signUp);
authRoute.post('/signin', authenticate, signIn);

function signUp(request, response){
  let newUser = new User(request.body);
  newUser.save()
    .then(user => {
      console.log( user );
      response.status(200).json({ status: true, message: user.username });
    })
    .catch(error => {
      response.json({ status: false, message: error });
    });
}

function signIn(request, response){
  response.status(200).json({ status: true, message: request.user, funPass: request.token });
}

module.exports = authRoute;
