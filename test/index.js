'use strict';

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
