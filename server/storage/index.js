'use strict';

let nconf = require('nconf');
let url = nconf.get('database:url')
let mongoose = require('mongoose');

// init models out side of .init so they are available to other
// files we require().
mongoose.model('Channel', require('../models/channel'));
mongoose.model('ChannelGuide', require('../models/channel-guide'));
mongoose.model('Connection', require('../models/connection'));

module.exports = {
  init: init
};

function init(done) {
  mongoose.connect(url);
  mongoose.connection.once('open', done);
  mongoose.connection.on('error', done);
}