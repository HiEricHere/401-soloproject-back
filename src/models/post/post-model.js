'use strict';

const mongoose = require('mongoose');

const post = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user: { type: String },
  title: { type: String },
  body: { type: String },
  children: { type: Object },
});

module.exports = mongoose.model('post', post);
