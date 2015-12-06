"use strict";

let mongoose = require('mongoose');
let types = mongoose.Schema.Types;

module.exports = new mongoose.Schema({
	key: { type: String },
	channels: [{ type: types.ObjectId, ref: 'channel'}]
});
