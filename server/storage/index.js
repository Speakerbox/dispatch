'use strict';

let nconf = require('nconf');
let url = nconf.get('database:url');
let mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
  init: init
};

function init(done) {
  mongoose.connect(url, done);
}