'use strict';

let nconf = require('nconf');
let url = nconf.get('database:url')
let mongoose = require('mongoose');

module.exports = {
  init: init
};

function init(done) {
  mongoose.connect(url, done);
}