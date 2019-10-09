'use strict';

const User = require('../models/auth/user-model');

const authenticate = function(request, response, next){
  let path = request.originalUrl.split( '/' )[1];
  let [ authType, authCredentials ] = request.headers.authorization.split(' ');
  authType = authType.toLowerCase();
  try {
    if (authType === 'basic' && path === 'signin') {
      return authenticateBasic(authCredentials);
    } else if (authType === 'bearer'){
      return authenticateBearer(authCredentials);
    } else response.send('Could not authenticate.');
  } catch (error){
    next(error);
  }

  //unbuffer, lookup with user static authbasic
  function authenticateBasic(credentials){
    let unBufferedCredentials = unBuffer(credentials);
    //unBufferedCredentials = {username,password}
    return User.authBasic(unBufferedCredentials)
      .then( response => {
        if(response.status){
          const user = response.payload;
          request.user = { id: user._id, username: user.username };
          request.token = user.generateToken();
          next();
        } else authError(response.payload);
      })
      .catch( error => authError(error));
  }

  function unBuffer(bufferedString){
    let unBufferedString = Buffer.from( bufferedString, 'base64' ).toString();
    let [ username, password ] = unBufferedString.split(':');
    return { username, password };
  }

  // authenticateBearer
  function authenticateBearer(token){
    return User.authBearer(token)
      .then(user => {
        if(user._id === request.params.userID){
          request.user = user._id;
          request.cookie('access_pass', token);
          next();
        } else {
          response.send('Invalid credentials');
        }
      })
      .catch(error => authError(error));
  }

  function authError(error){
    response.json({ status: false, message: error });
  }

};

module.exports = authenticate;
