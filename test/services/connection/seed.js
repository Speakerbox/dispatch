'use strict';

let async = require('async');
let mongoose = require('mongoose');
let Connection = mongoose.model('Connection');

module.exports = function(done){
  let tasks = [
    createChannel
  ];

  async.parallel(tasks, done);
};

function createChannel(next){
  let params = {
    socketId: 'kuG9yjWMH9RNGMJ7AAAA',
    ip: '::ffff:127.0.0.1',
    opened: new Date()
  };

  Connection.create(params, next);
}
