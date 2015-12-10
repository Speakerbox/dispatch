'use strict';

process.env.NODE_ENV = 'test';
require('../config');

let server = require('../server');
let mongoose = require('mongoose');

before(function(done) {
	server.init(done);
});

beforeEach(function(done){
  mongoose.connection.db.dropDatabase(done);
});

// Teardown tests
after(function(done) {
  mongoose.connection.db.dropDatabase(done);
});
