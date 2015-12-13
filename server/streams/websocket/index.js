'use strict';

let nconf = require('nconf');
let io = require('socket.io')();
let port = nconf.get('socket:port');
let channelGuideService = require('../../services/channel-guide');
let connectionService = require('../../services/connection');


module.exports = {
  init: init
}

function init(done) {
  // middleware for handling authentication
  io.use(authentication);
  io.on('connect', connect);
  io.listen(port);
  done();
}

function connect(socket) {
  let params = {
    socketId: socket.id,
    ip: socket.request.connection.remoteAddress
  };

  connectionService.log(params);
}

function authentication(socket, next) {
  let token = socket.handshake.query.token;
  
  if(!token) {
    next({'message': 'Please provide a token.'});
    return;
  }

  let params = {
    key: token
  }
    
  channelGuideService.findChannels(params, function(err, channel){
    if(err){
      next({'message': err});
      return;
    }

    if(!channel){
      next({'message': 'Could not find any channels for that token.'});
      return;
    }

    next();
  });
}
