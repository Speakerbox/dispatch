'use strict';

let expect = require('chai').expect;
let seed = require('./seed');
let connectionService = require('../../../server/services/connection');
let mongoose = require('mongoose');
let Connection = mongoose.model('Connection');


describe('Connection Service', function() {
  beforeEach(seed);

  describe('.connectionOpened()', function(){

    it('should fail if a socket id is not provided', function(done){
      let params = {
        ip: '::ffff:127.0.0.1'
      };

      connectionService.connectionOpened(params, function(err){
        expect(err).to.equal('Please provide a socket id.');
        done();
      });
    });

    it('should fail if a an ip address id is not provided', function(done){
      let params = {
        socketId: 'V5sOLmKfyyeumWv7AAAA'
      };

      connectionService.connectionOpened(params, function(err){
        expect(err).to.equal('Please provide an ip address.');
        done();
      });
    });

    it('should record a new connection has been opened', function(done){
      let params = {
        ip: '::ffff:127.0.0.1',
        socketId: 'V5sOLmKfyyeumWv7AAAA'
      };

      connectionService.connectionOpened(params, function(err, result){
        expect(result.name).to.equal(params.name);
        done();
      });
    });
  });

  describe('.connectionClosed()', function(){
    let connection;

    beforeEach(function(done){
      Connection.findOne({}, function(err, doc){
        connection = doc;
        done();
      });
    });

    it('should fail if a socket id is not provided', function(done){
      let params = {};

      connectionService.connectionClosed(params, function(err){
        expect(err).to.equal('Please provide a socket id.');
        done();
      });
    });

    it('should mark the connection as closed', function(done){
      let params = {
        socketId: connection.socketId
      };

      connectionService.connectionClosed(params, function(err, result){
        expect(result.socketId).to.equal(params.socketId);
        expect(result.closed).to.not.equal(null);
        done();
      });
    });
  });

});
