"use strict";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Types = Schema.Types;

let channelSchema = new Schema({
  name: { type: String },
  created: { type: Date },
});

module.exports = mongoose.model('channel', channelSchema);