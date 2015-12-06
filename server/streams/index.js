'use strict';

let async = require('async');
let websocket = require('./websocket');
let udp = require('./udp');

module.exports = {
  init: init
}

function init(done) {
  var tasks = [
    websocket.init,
    udp.init
  ];
  async.parallel(tasks, done);
}