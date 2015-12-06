"use strict";

let mongoose = require('mongoose');
let types = mongoose.Schema.Types;

module.exports = new mongoose.Schema({
	ip: { type: String }
	opened: { type: Date },
	closed: { type: Date }
});
