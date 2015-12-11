'use strict';
let async = require('async');
let ChannelGuide = require('mongoose').model('ChannelGuide');

module.exports = {
	addLookup: addLookup,
  findChannels: findChannels,
  addChannel: addChannel,
  removeChannel: removeChannel
}

function findChannels(params, done){
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
		done('Please provide at least one channel.');
		return;
	}
  
  async.waterfall([
    function(next) {
      checkForExistingLookup(params.key, next);
    },
    function(existingLookup, next) {
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

function addChannel(params, done){
  if(!params.key){
    done('Please provide a key.');
    return;
  }

  if(!params.channel){
    done('Please provide at least one channel.');
    return;
  }

  let query = {key: params.key};
  let update = {$addToSet: {channels: params.channel}};
  let options = {new: true};

  ChannelGuide.findOneAndUpdate(query, update, options, done);
}

function removeChannel(params, done){
  if(!params.key){
    done('Please provide a key.');
    return;
  }

  if(!params.channel){
    done('Please provide at least one channel.');
    return;
  }
}

/***** Helpers *****/

function checkForExistingLookup(key, done){
  ChannelGuide.findOne({key: key}, done);
}
