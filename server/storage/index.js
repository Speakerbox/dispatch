'use strict';

let nconf = require('nconf');
let url = nconf.get('database:url')
let mongoose = require('mongoose');

// init models out side of .init so they are available to other
// files we require().
mongoose.model('channel', require('../models/channel'));
mongoose.model('channelGuide', require('../models/channel-guide'));
mongoose.model('connection', require('../models/connection'));

module.exports = {
  init: init
};

function init(done) {
  mongoose.connect(url, done);
}