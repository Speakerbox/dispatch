'use strict';

let channelGuide = require('mongoose').model('channelGuide');

module.exports = {
	addLookup: addLookup,
  lookupChannel: lookupChannel
}

function lookupChannel(params, done){
	if(!params.key){
		done('Please provide a key.');
		return;
	}

  channelGuide.findOne({key: params.key}, done);
}

function addLookup(params, done){
	if(!params.key){
		done('Please provide a key.');
		return;
	}

	if(!params.channels){
		done('Please provide a channel.');
		return;
	}

	let lookup = {
		key: params.key,
		channels: params.channels
	}

  channelGuide.addLookup(lookup, done);
}

