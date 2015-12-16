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
  console.log('Socket ' + socket.id + ' has connected.');

  let params = {
    socketId: socket.id,
    ip: socket.request.connection.remoteAddress
  };

  socket.on('disconnect', function(message){
    disconnect(socket);
  });

  connectionService.connectionOpened(params);
}

function disconnect(socket) {
  console.log('Socket ' + socket.id + ' has disconnected.');

  let params = {
    socketId: socket.id,
  };

  connectionService.connectionClosed(params);
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
    
  channelGuideService.findChannels(params, function(err, channels){
    if(err){
      next({'message': err});
      return;
    }

    if(!channels){
      next({'message': 'Could not find any channels for that token.'});
      return;
    }

    next();
  });
}
