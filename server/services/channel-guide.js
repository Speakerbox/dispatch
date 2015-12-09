'use strict';

let ChannelGuide = require('mongoose').model('ChannelGuide');

module.exports = {
	addLookup: addLookup,
  lookupChannel: lookupChannel
}

function lookupChannel(params, done){
	if(!params.key){
		done('Please provide a key.');
		return;
	}

  ChannelGuide.findOne({key: params.key}, done);
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

  ChannelGuide.create(lookup, done);
}

