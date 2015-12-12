'use strict';

let Channel = require('mongoose').model('Channel');
let async = require('async');

module.exports = {
	createChannel: createChannel,
  updateChannel: updateChannel,
  deleteChannel: deleteChannel
}

function createChannel(params, done) {
	if(!params.name){
		done('Please provide a channel name.');
		return;
	}

  async.waterfall([
    function(next) {
      checkForExistingChannel(params.name, next);
    },
    function(existingChannel, next) {
      if(existingChannel) {
          next('A channel with that name already exists.');
          return;
        }

      let newChannel = {
        name: params.name,
        created: new Date()
      };

      Channel.create(newChannel, next);
    }
  ], done);
}

function updateChannel(params, done) {
  if(!params.id){
    done('Please provide a channel id.');
    return;
  }

  let update = { name: params.name };
  let options = { new: true };

  Channel.findByIdAndUpdate(params.id, update, options, done);
}

function deleteChannel(params, done) {
  if(!params.id){
    done('Please provide a channel id.');
    return;
  }
    
  Channel.findByIdAndRemove(params.id, done);
}

function checkForExistingChannel(name, done) {
  Channel.findOne({name: name}, done);
}