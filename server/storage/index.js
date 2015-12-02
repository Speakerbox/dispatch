'use strict';

let mongoose = require('mongoose');
let nconf = require('nconf');
let models = require('../models');

module.exports = {
  init: init
};

function init() {
	var url = nconf.get('database:url');

  mongoose.connect(url, function(err) {
    if (err) {
      return;
    }

    models.init(mongoose.connection);
  });
}