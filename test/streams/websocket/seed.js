'use strict';

let async = require('async');
let mongoose = require('mongoose');
let Channel = mongoose.model('Channel');
let ChannelGuide = mongoose.model('ChannelGuide');

module.exports = function(done){
  let tasks = [
    createChannel,
    addChannelLookup
  ];

  async.waterfall(tasks, done);
};

function createChannel(next){
  let params = {
    name: 'Speakerbox Dev',
    created: new Date()
  };

  Channel.create(params, next);
}

function addChannelLookup(channel, next){
  let params = {
    key: 'ayzWzvCbWVgWrrQyooQrwGtnXMNYDd',
    channels: [channel._id]
  };

  ChannelGuide.create(params, next);
}
