'use strict';

let expect = require('chai').expect;
let channelGuideService = require('../../../server/services/channel-guide');
let mongoose = require('mongoose');
let Types = mongoose.Types;
let seed = require('./seed');

describe('Channel guide service', function() {
  beforeEach(seed);

  describe('add lookup', function(){
    let channelId = new Types.ObjectId;

    it('should fail without a key', function(done){
      let params = {
        channels: [channelId]
      };

      channelGuideService.addLookup(params, function(err){
        expect(err).to.equal('Please provide a key.');
        done();
      });
    });

    it('should fail with a duplicate key', function(done){
      let params = {
        key: 'DfcbuRvwbnCXFbHBXQfqbbyshcyjwh',
        channels: [channelId]
      };

      channelGuideService.addLookup(params, function(err){
        expect(err).to.equal('A lookup already exists for that key.');
        done();
      });
    });

    it('should create a lookup if the key does not exist', function(done){
      let params = {
        key: 'BHQzCaNFCtWvXYDiuJaLbNvRGNUZru',
        channels: [channelId]
      };

      channelGuideService.addLookup(params, function(err, result){
        expect(result.key).to.equal(params.key);
        done();
      });
    });
  });

  describe('add channel', function(){
    let channelId = new Types.ObjectId;

    it('should fail without a key', function(done){
      let params = {
        channel: [channelId]
      };

      channelGuideService.addChannel(params, function(err){
        expect(err).to.equal('Please provide a key.');
        done();
      });
    });

    it('should fail if no channel is provided', function(done){
      let params = {
        key: 'DfcbuRvwbnCXFbHBXQfqbbyshcyjwh',
      };

      channelGuideService.addChannel(params, function(err){
        expect(err).to.equal('Please provide at least one channel.');
        done();
      });
    });

    it('should add a channel for a given key', function(done){
      let params = {
        key: 'DfcbuRvwbnCXFbHBXQfqbbyshcyjwh',
        channel: channelId
      };

      channelGuideService.addChannel(params, function(err, result){
        expect(result.channels.length).to.equal(2);
        expect(result.channels.indexOf(channelId)).to.be.greaterThan(-1);
        done();
      });
    });
  });
});
