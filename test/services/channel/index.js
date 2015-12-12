'use strict';

let expect = require('chai').expect;
let seed = require('./seed');
let channelService = require('../../../server/services/channel');
let mongoose = require('mongoose');
let Channel = mongoose.model('Channel');


describe('Channel Service', function() {
  beforeEach(seed);

  describe('create channel', function(){

    it('should fail if a name is not provided', function(done){
      let params = {};

      channelService.createChannel(params, function(err){
        expect(err).to.equal('Please provide a channel name.');
        done();
      });
    });

    it('should fail with a duplicate name', function(done){
      let params = {
        name: 'Speakerbox Dev'
      };

      channelService.createChannel(params, function(err){
        expect(err).to.equal('A channel with that name already exists.');
        done();
      });
    });

    it('should create a new channel', function(done){
      let params = {
        name: 'speakerbox test',
      };

      channelService.createChannel(params, function(err, result){
        expect(result.name).to.equal(params.name);
        done();
      });
    });
  });

  describe('update channel', function(){
    let channel;

    beforeEach(function(done){
      Channel.findOne({}, function(err, doc){
        channel = doc;
        done();
      });
    });

    it('should fail if an id is not provided', function(done){
      let params = {
        name: 'new speakerbox'
      };

      channelService.updateChannel(params, function(err){
        expect(err).to.equal('Please provide a channel id.');
        done();
      });
    });

    it('should update a channel', function(done){
      let params = {
        id: channel.id,
        name: 'new speakerbox',
      };

      channelService.updateChannel(params, function(err, result){
        expect(result.name).to.equal(params.name);
        done();
      });
    });
  });

  describe('delete channel', function(){

    let channel;

    beforeEach(function(done){
      Channel.findOne({name: 'Speakerbox Dev'}, function(err, doc){
        channel = doc;
        done();
      });
    });

    it('should fail if an id is not provided', function(done){
      let params = {};

      channelService.deleteChannel(params, function(err){
        expect(err).to.equal('Please provide a channel id.');
        done();
      });
    });

    it('should delete a channel', function(done){
      let params = {
        id: channel.id
      };

      channelService.deleteChannel(params, function(err, result){
        expect(result.id).to.equal(params.id);
        done();
      });
    });
  });


});
