"use strict";

let Schema = require('mongoose').Schema;

module.exports = new Schema({
	ip: { type: String },
	opened: { type: Date },
	closed: { type: Date }
});
