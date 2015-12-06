"use strict";

let mongoose = require('mongoose');
let types = mongoose.Schema.Types;

module.exports = new mongoose.Schema({
	name: { type: String },
	created: { type: Date },
});
