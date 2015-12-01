'use strict';

let expect = require('chai').expect;
let ioClient = require('socket.io-client');
let nconf = require('nconf');
let socket;

describe('socket', function() {

  it('should not connect without a token', function(done) {
  	let socketUrl = nconf.get('socket:url');
  	socket = ioClient.connect(socketUrl);

  	socket.on('error', function(err){
  		expect(err).to.equal('Must provide a token');
  		expect(socket.connected).to.equal(false);
	  	socket.disconnect();
	  	done();
  	});
  	
  });

  it('should not connect with an invalid token', function(done) {
  	let socketUrl = nconf.get('socket:url');
  	socket = ioClient.connect(socketUrl + '?token=XYLznXKRDwMsshjRJFpBsLngUiEyAx');

  	socket.on('error', function(err){
  		expect(err).to.equal('Must provide a token');
  		expect(socket.connected).to.equal(false);
	  	socket.disconnect();
	  	done();
  	});
  	
  });

  // it('should not connect without an invalid token', function(done) {
  // 	let socketUrl = nconf.get('socket:url');
  // 	socket = ioClient.connect(socketUrl + '?token=XYLznXKRDwMsshjRJFpBsLngUiEyAx');
  // 	expect(socket.connected).to.equal(false);
  // 	socket.on('connect', function(socket){
  // 		console.log('connected');
  // 		done();
  // 	})
  // });

});
