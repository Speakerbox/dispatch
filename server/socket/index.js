'use strict';

let nconf = require('nconf');
let socket = require('socket.io')();
let port = nconf.get('socket:port');

module.exports = {
  init: init
}

function init(){
  socket.listen(port);

  socket.on('connect', function (socket) {
  
  });
}

