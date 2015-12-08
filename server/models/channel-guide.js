"use strict";

let mongoose = require('mongoose');
let types = mongoose.Schema.Types;
let schema = new mongoose.Schema({
  key: { type: String },
  channels: [{ type: types.ObjectId, ref: 'channel'}]
});

module.exports = mongoose.model('channelGuide', schema);