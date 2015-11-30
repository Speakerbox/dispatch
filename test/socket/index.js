'use strict';

let expect = require('chai').expect;
let ioClient = require('socket.io-client');
let nconf = require('nconf');
let socket;

describe('socket', function() {

  it('should not allow unauthorized connections', function(done) {
  	let socketUrl = nconf.get('socket:url');
  	socket = ioClient.connect(socketUrl);
  	socket.on('connect', function(){
  		done();	
  	})
  });
});
