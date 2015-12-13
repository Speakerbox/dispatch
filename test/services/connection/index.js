'use strict';

let expect = require('chai').expect;
let seed = require('./seed');
let connectionService = require('../../../server/services/connection');
let mongoose = require('mongoose');
let Connection = mongoose.model('Connection');


describe('Connection Service', function() {
  beforeEach(seed);

  describe('.log()', function(){

    it('should fail if a socket id is not provided', function(done){
      let params = {
        ip: '::ffff:127.0.0.1'
      };

      connectionService.log(params, function(err){
        expect(err).to.equal('Please provide a socket id.');
        done();
      });
    });

    it('should fail if a an ip address id is not provided', function(done){
      let params = {
        socketId: 'V5sOLmKfyyeumWv7AAAA'
      };

      connectionService.log(params, function(err){
        expect(err).to.equal('Please provide an ip address.');
        done();
      });
    });

    it('should record a new connection has been opened', function(done){
      let params = {
        ip: '::ffff:127.0.0.1',
        socketId: 'V5sOLmKfyyeumWv7AAAA'
      };

      connectionService.log(params, function(err, result){
        expect(result.name).to.equal(params.name);
        done();
      });
    });
  });

  describe('.update()', function(){
    let connection;

    beforeEach(function(done){
      Connection.findOne({}, function(err, doc){
        connection = doc;
        done();
      });
    });

    it('should fail if a socket id is not provided', function(done){
      let params = {};

      connectionService.update(params, function(err, doc){
        expect(err).to.equal('Please provide a socket id.');
        done();
      });
    });

    it('should mark the connection as closed', function(done){
      let params = {
        socketId: connection.socketId
      };

      connectionService.update(params, function(err, result){
        expect(result.socketId).to.equal(params.socketId);
        expect(result.closed).to.not.equal(null);
        done();
      });
    });
  });

});
