"use strict";

let Schema = require('mongoose').Schema;

module.exports = new Schema({
  key: { type: String },
  channels: [{ type: Schema.Types.ObjectId, ref: 'channel'}]
});