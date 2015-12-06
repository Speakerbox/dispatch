'use strict';

let nconf = require('nconf');
let io = require('socket.io')();
let tokenService = require('../../services/token');
let port = nconf.get('socket:port');

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

function connect() {
  console.log('connected');
}

function authentication(socket, next) {
  let token = socket.handshake.query.token;
  
  if(!token) {
    next({'message': 'Must provide a token'});
    return;
  }
    
  tokenService.getToken(token, function(err, token){
    if(err || !token){
      return next({'message': 'Invalid token'});
    }
      
    next();
  });
}
