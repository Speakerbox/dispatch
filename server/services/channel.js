'use strict';

let channel = require('mongoose').model('channel');

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