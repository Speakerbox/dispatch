'use strict';

let expect = require('chai').expect;
let channelGuideService = require('../../../server/services/channel-guide');
let ChannelGuide = require('mongoose').model('ChannelGuide');
let seed = require('./seed');

describe('Channel guide service', function() {
  beforeEach(seed);

  describe('add lookup', function(){
    let lookup;

    before(function(){
      ChannelGuide.findOne({}, function(err, doc){
        lookup = doc;
      });
    });

    it('should fail without a key', function(done){
      let params = {
        channels: [lookup._id]
      };

      channelGuideService.addLookup(params, function(err, lookup){
        expect(err).to.equal('Please provide a key.');
        done();
      })
    });

    it('should fail with a duplicate key', function(done){
      let params = {
        key: lookup.key,
        channels: [lookup._id]
      };

      channelGuideService.addLookup(params, function(err, lookup){
        expect(err).to.equal('A lookup already exists for that key.');
        done();
      })
    });
  });
});
