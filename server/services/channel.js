'use strict';

let Channel = require('mongoose').model('Channel');

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
    
	Channel.create(params, done);
}