'use strict';

let async = require('async');
let channel = require('../../../server/models/channel');
let channelGuide = require('../../../server/models/channel-guide');

module.exports = function(done){
  async.waterfall([
    createChannel,
    addChannelLookup
  ], done);
}

function createChannel(next){
  let params = {
    name: 'Speakerbox Dev',
    created: new Date()
  };

  channel.create(params, next)
}

function addChannelLookup(channel, next){
  let params = {
    key: 'ayzWzvCbWVgWrrQyooQrwGtnXMNYDd',
    channels: [channel._id]
  };

  channelGuide.create(params, next)
}
