'use strict';

let mongoose = require('mongoose');
let Connection = mongoose.model('Connection');

module.exports = {
  log: log,
  update: update
}

function log(params, done){
  if(!params.ip) {
    done('Please provide an ip address.');
    return;
  }

  if(!params.socket) {
    done('Please provide a socket id.');
    return;
  }

  let date = new Date();
  var log = {
    ip: params.ip,
    socket: params.socket,
    created: date
  };

  Connection.create(log, done);
}

function update(params, done){
  if(!params.socket){
    done('Please provide a socket id.');
  }

  let date = new Date();
  let query = { socket: params.socket };
  let update = { closed: date };
  let option = { new: true };

  Connection.findOneAndUpdate(query, update, options, done);
}