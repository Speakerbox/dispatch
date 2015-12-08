'use strict';

let mongoose = require('mongoose');
let schema = require('../models/channel');
let channel = mongoose.model('channel', schema);

module.exports = {
	createChannel: createChannel
}

function createChannel(params, done) {
	if(!params.name){
		done('Please provide a name');
		return;
	}

	let params = {
		name: params.name,
		created: new Date()
	}

	channel.create(params, done);
}