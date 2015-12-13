'use strict';

let expect = require('chai').expect;
let seed = require('./seed');
let connectionService = require('../../../server/services/connection');
let mongoose = require('mongoose');
let Connection = mongoose.model('Connection');


describe('Connection Service', function() {
  beforeEach(seed);

  describe('log connection', function(){

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
        socket: 'V5sOLmKfyyeumWv7AAAA'
      };

      connectionService.log(params, function(err){
        expect(err).to.equal('Please provide an ip address.');
        done();
      });
    });

    
    it('should record a new connection has been opened', function(done){
      let params = {
        ip: '::ffff:127.0.0.1',
        socket: 'V5sOLmKfyyeumWv7AAAA'
      };

      connectionService.log(params, function(err, result){
        expect(result.name).to.equal(params.name);
        done();
      });
    });
  });

  describe('update connection', function(){
    let connection;

    beforeEach(function(done){
      Connection.findOne({}, function(err, doc){
        connection = doc;
        done();
      });
    });

    it('should fail if a socket id is not provided', function(done){
      let params = {};

      connectionService.update(params, function(err){
        expect(err).to.equal('Please provide a socket id.');
        done();
      });
    });

    it('should mark the connection as closed', function(done){
      let params = {
        socket: connection.socket
      };

      connectionService.update(params, function(err, result){
        expect(result.socket).to.equal(params.socket);
        expect(result.closed).to.not.equal(null);
        done();
      });
    });
  });

});
