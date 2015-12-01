'use strict';

let nconf = require('nconf');
let io = require('socket.io')();
let port = nconf.get('socket:port');

module.exports = {
  init: init
}

function init(){
  io.listen(port);

  // Middleware for handling authentication
  io.use(function(socket, next){
    let token = socket.handshake.query.token;

    if(!token){
      let err = { message: 'Must provide a token' };
      next(err);
      return;
    }

    authenticate(token)
      .then(function(){
        next();
      })
      .catch(function(err){
        next(err);
      });
  })

  io.on('connect', function(socket) {
    console.log('connected');
  });
}

function authenticate(token){

}
