'use strict';

let expect = require('chai').expect;
let channelGuideService = require('../../../server/services/channel-guide');
let ChannelGuide = require('mongoose').model('ChannelGuide');
let seed = require('./seed');

describe('Channel guide service', function() {
  beforeEach(seed);

  describe('add lookup', function(){
    let lookup;

    beforeEach(function(done){
      ChannelGuide.findOne({}, function(err, doc){
        lookup = doc;
        done();
      });
    });

    it('should fail without a key', function(done){
      let params = {
        channels: [lookup._id]
      };

      channelGuideService.addLookup(params, function(err){
        expect(err).to.equal('Please provide a key.');
        done();
      });
    });

    it('should fail with a duplicate key', function(done){
      let params = {
        key: lookup.key,
        channels: [lookup._id]
      };

      channelGuideService.addLookup(params, function(err){
        expect(err).to.equal('A lookup already exists for that key.');
        done();
      });
    });
  });
});
