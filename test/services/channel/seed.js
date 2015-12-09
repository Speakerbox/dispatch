'use strict';

let async = require('async');
let mongoose = require('mongoose');
let Channel = mongoose.model('Channel');

module.exports = function(done){
  let tasks = [
    createChannel
  ];

  async.parallel(tasks, done);
};

function createChannel(next){
  let params = {
    name: 'Speakerbox Dev',
    created: new Date()
  };

  Channel.create(params, next);
}
