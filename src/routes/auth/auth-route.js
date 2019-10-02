'use strict';

const express = require('express');
// eslint-disable-next-line new-cap
const authRoute = express.Router();
const authenticate = require('../../middleware/authenticate-middleware');
let User = require('../../models/auth/user-model');

authRoute.post('/signup', signUp);
authRoute.post('/signin', authenticate, signIn);

function signUp(request, response, next){
  let newUser = new User(request.body);
  newUser.save()
    .then(user => {
      response.status(200).json(user);
    })
    .catch( error => next(error));
}

function signIn(request, response){
  response.status(200).json({user:request.user, token:request.token});
}

module.exports = authRoute;
