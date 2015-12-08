"use strict";

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Types = Schema.Types;

let channelGuideSchema = new Schema({
  key: { type: String },
  channels: [{ type: Types.ObjectId, ref: 'channel'}]
});

module.exports = mongoose.model('channelGuide', channelGuideSchema);