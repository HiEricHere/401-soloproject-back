'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const capabilities = {
//   user: [ 'create','read','update','delete' ],
//   admin: [ 'create','read','update','delete' ],
// };

//user Schema
const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: [ 'admin', 'user' ] },
});

// save() pre-hook
user.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPW => {
      this.password = hashedPW;
      next();
    })
    .catch(error => next(error));
});

// statics: user lookup & authenticate basic
user.statics.authBasic = function(credentials){
  //lookup user, get pw, compare pw passed in with db pw, generate token
  let query = { username: credentials.username };
  return this.findOne(query)
    .then(user => {
      if(user && user.comparePassword(credentials.password)){
        return user;
      } else console.log('Invalid password');
    })
    .catch( error => console.log('Basic Auth:', error));
};

user.methods.comparePassword = function(password){
  //bcrypt.compare(data, hash)
  return bcrypt.compare(password, this.password)
    .then(result => result ? true : null)
    .catch(error => console.log('Compare Password Failed', error));
};

//statics: user lookup & authenticate bearer
user.statics.authBearer = function(credentials){
  let payload = jwt.verify(credentials, process.env.SECRET).id;
  return this.findById(payload)
    .then(user => {
      return user ? user : null;
    })
    .catch(error => console.log('Bearer Auth:', error));
};

// flesh out front end first
// user.methods.can = function(){
//   return capabilities[this.role]
// };

// generate token
user.methods.generateToken = function () {
  let payload = { id: this._id };
  let options = {};
  // jwt.sign( payload, secret, options);
  return jwt.sign( payload, process.env.SECRET, options );
};

module.exports = mongoose.model('user', user );
