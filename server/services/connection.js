'use strict';

let mongoose = require('mongoose');
let Connection = mongoose.model('Connection');

module.exports = {
  connectionOpened: connectionOpened,
  connectionClosed: connectionClosed
}

function connectionOpened(params, done){
  if(!params.ip) {
    done('Please provide an ip address.');
    return;
  }

  if(!params.socketId) {
    done('Please provide a socket id.');
    return;
  }

  let date = new Date();
  var log = {
    ip: params.ip,
    socketId: params.socketId,
    opened: date
  };

  Connection.create(log, done);
}

function connectionClosed(params, done){
  if(!params.socketId){
    done('Please provide a socket id.');
    return;
  }

  let date = new Date();
  let query = { socketId: params.socketId };
  let update = { closed: date };
  let options = { new: true };

  Connection.findOneAndUpdate(query, update, options, function(err, doc){
    // Callback is optional
    if(done){
      done(err, doc);
    }
  });
}