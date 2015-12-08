'use strict';

let expect = require('chai').expect;
let ioClient = require('socket.io-client');
let nconf = require('nconf');
let socketUrl = nconf.get('socket:url');
let seed = require('./seed');

beforeEach(function(done){
  seed(done);
});

describe('socket', function() {
  let socket;
  let socketOptions = {
    'reconnection': false,
    'force new connection': true
  };

  it('should not connect without a token', function(done) {
    socket = ioClient.connect(socketUrl, socketOptions);
    socket.on('error', function(err){
      expect(err).to.equal('Please provide a token.');
      expect(socket.connected).to.equal(false);
      done();
    });
  });

  it('should not connect with an invalid token', function(done) {
    let url = socketUrl + '?token=XYLznXKRDwMsshjRJFpBsLngUiEyAx';
    socket = ioClient.connect(url, socketOptions);
    socket.on('error', function(err){
      expect(err).to.equal('Could not find a channel for that token.');
      done();
    });
  });

  it('should connect with a valid token', function(done) {
    let url = socketUrl + '?token=ayzWzvCbWVgWrrQyooQrwGtnXMNYDd';
    socket = ioClient.connect(url, socketOptions);
    socket.on('connect', function(){
      done();
    });
  });
});
