'use strict';

const mongoose = require('mongoose');

const test = new mongoose.Schema({
  blah: { type: String },
  poot: { type: String },
});

module.exports = mongoose.model('test', test);
