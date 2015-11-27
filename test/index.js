'use strict';

// Setup tests
before(function(done) {
	require('../config');
	require('../server');
	done();
});

// Teardown tests
after(function(done) {
	done();
});
