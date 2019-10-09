'use strict';

const mongoose = require('mongoose');

const todo = new mongoose.Schema({
  userID: { type: String, required: true },
  todo: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('todo', todo);
