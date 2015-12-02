'use strict';

let nconf = require('nconf');
let io = require('socket.io')();
let port = nconf.get('socket:port');
let tokenService = require('../services/token')

module.exports = {
  init: init
}

function init(){
  io.listen(port);

  // Middleware for handling authentication
  io.use(authentication);

  io.on('connect', function(socket) {
    console.log('connected');
  });
}

function authentication(socket, next){
  let token = socket.handshake.query.token;
  let err;

  if(!token){
    next({'message': 'Must provide a token'});
    return;
  }

 tokenService
  .getToken(token)
  .then(function(token){
    if(token){
      next();
    }
  })
  .catch(function(err){
      next({message: 'Invalid token' });
  });
}
