"use strict";

let mongoose = require('mongoose');
let types = mongoose.Schema.Types;

module.exports = new mongoose.Schema({
	token: { type: String },
	channel: { type: types.ObjectId, ref: 'channel'}
});
