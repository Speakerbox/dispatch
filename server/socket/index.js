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
    next();
  })

  io.on('connect', function(socket) {
  
  });

}
