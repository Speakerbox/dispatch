'use strict';
let expect = require('chai').expect;
let socketClient = require('socket.io-client');
let socket;

beforeEach(function(done){
	let socketUrl = 'http://localhost:3000';
	let socketOptions = {
		reconnection: true,
		reconnectionDelay: 0,
		reconnectionDelayMax: 2000
	};

	socket = socketClient.connect(socketUrl, socketOptions);
	socket.on('connect', function(socket){
		done();
	});
});

afterEach(function(done){
	socket.disconnect();
	done();
});

describe('socket', function() {
  it('should accept incoming connections', function() {

  });
});
