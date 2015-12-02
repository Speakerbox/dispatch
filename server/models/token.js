"use strict";

let mongoose = require('mongoose');
let types = mongoose.Schema.Types;

let token = new mongoose.Schema({
	token: { type: String },
	channel: { type: types.ObjectId, ref: 'channel'}
});

module.exports = token;