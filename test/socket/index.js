'use strict';

let expect = require('chai').expect;
let ioClient = require('socket.io-client');
let ioStream - require('socket.io-stream');
let nconf = require('nconf');
let socketUrl = nconf.get('socket:url');
let seed = require('./seed');
let mongoose = require('mongoose');
let Connection = mongoose.model('Connection');

describe('Websocket', function() {
  let socket;
  let socketOptions = {
    'reconnection': false,
    'force new connection': true
  };

  beforeEach(seed);

  describe('onConnect()', function(){

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
        expect(err).to.equal('Could not find any channels for that token.');
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

  describe('onDisconnect()', function(){

    beforeEach(function(done) {
      let url = socketUrl + '?token=ayzWzvCbWVgWrrQyooQrwGtnXMNYDd';
      socket = ioClient.connect(url, socketOptions);

      socket.on('connect', done);
    });

    it('should log the disconnect event', function(done) {
      let url = socketUrl + '?token=ayzWzvCbWVgWrrQyooQrwGtnXMNYDd';
      socket = ioClient.connect(url, socketOptions);

      socket.disconnect(function(){
        console.log('disconnected');
      });

      Connection.findOne({socketId: socket.id}, function(err, doc) {
        console.log(err, doc);
        done();
      });
    });
  });
});
