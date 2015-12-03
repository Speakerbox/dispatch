'use strict';

let nconf = require('nconf');
let io = require('socket.io')();
let tokenService = require('../services/token');
let port = nconf.get('socket:port');

module.exports = {
  init: init
}

function init(done) {
  io.listen(port);

  // Middleware for handling authentication
  io.use(authentication);
  io.on('connect', connect);
  done();
}

function connect() {
  console.log('connected');
}

function authentication(socket, next) {
  let token = socket.handshake.query.token;
  if(!token){
    next({'message': 'Must provide a token'});
    return;
  }
    
  tokenService
  .getToken(token)
  .then(next)
  .catch(function(err){
    next({message: 'Invalid token' });
  });
}
