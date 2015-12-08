"use strict";

let mongoose = require('mongoose');
let types = mongoose.Schema.Types;
let schema = new mongoose.Schema({
  name: { type: String },
  created: { type: Date },
});

module.exports = mongoose.model('channel', schema);