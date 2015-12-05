'use strict';

let expect = require('chai').expect;
let ioClient = require('socket.io-client');
let nconf = require('nconf');
let socketUrl = nconf.get('socket:url');

describe('socket', function() {
  let socket;
  let socketOptions = {
    'reconnection': false,
    'force new connection': true
  };

  it('should not connect without a token', function(done) {
    socket = ioClient.connect(socketUrl, socketOptions);

    socket.on('error', function(err){
      expect(err).to.equal('Must provide a token');
      expect(socket.connected).to.equal(false);
      done();
    });
  });

  it('should not connect with an invalid token', function(done) {
    let url = socketUrl + '?token=XYLznXKRDwMsshjRJFpBsLngUiEyAx';
    socket = ioClient.connect(url, socketOptions);

    socket.on('error', function(err){
      expect(err).to.equal('Invalid token');
      done();
    });
  });

});
