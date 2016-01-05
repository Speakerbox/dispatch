'use strict';

let nconf = require('nconf');
let io = require('socket.io')();
let ioStream = require('socket.io-stream');
let broadcastStream = ioStream.createStream();
let port = nconf.get('socket:port');
let channelGuideService = require('../services/channel-guide');
let connectionService = require('../services/connection');


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
  console.log('socket ' + socket.id + ' has connected.');

  let params = {
    socketId: socket.id,
    ip: socket.request.connection.remoteAddress
  };

  socket.on('disconnect', function(message){
    disconnect(socket);
  });

  ioStream(socket).emit('receiveAudio', broadcastStream);

  ioStream(socket).on('streamAudio', function(stream, data) {
    stream.pipe(broadcastStream);
  });

  connectionService.connectionOpened(params);
}

function disconnect(socket) {
  console.log('socket ' + socket.id + ' has disconnected.');

  let params = {
    socketId: socket.id,
  };

  connectionService.connectionClosed(params);
}

function authentication(socket, next) {
  let token = socket.handshake.query.token;

  console.log('authenticating socket ' + socket.id + ' with token ' + token + ', IP address is ' + socket.request.connection.remoteAddress);
  
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
