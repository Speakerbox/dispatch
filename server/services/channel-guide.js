'use strict';

let mongoose = require('mongoose');
let schema = require('../models/channel-guide');
let channelGuide = mongoose.model('channelGuide', schema);

module.exports = {
  findChannelByKey: findChannelByKey
}

function findChannelByKey(token, done){
  channelGuide.findOne({key: token}, done);
}
