"use strict";

let Schema = require('mongoose').Schema;

module.exports = new Schema({
  name: { type: String },
  created: { type: Date },
});