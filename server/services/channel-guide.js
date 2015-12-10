'use strict';
let async = require('async');
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
  
  async.waterfall([
    function checkForExistingLookup(next){
      ChannelGuide.findOne({key: params.key}, next);
    },
    function addNewLookup(existingLookup, next){
      if(existingLookup){
        next('A lookup already exists for that key.');
        return;
      }

      let newLookup = {
        key: params.key,
        channels: params.channels
      };

      ChannelGuide.create(newLookup, next);
    }
  ], done);
}

