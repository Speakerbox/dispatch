'use strict';

process.env.NODE_ENV = 'test';
require('../config');
let server = require('../server');

// Setup tests
before(function(done) {
	server.init(done);
});

// Teardown tests
after(function(done) {
	done();
});
