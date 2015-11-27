'use strict';

let nconf = require('nconf');
let socket = require('socket.io')();
let port = nconf.get('socket:port');

module.exports = {

	init: function(){
		socket.listen(port);

		socket.on('connect', function (socket) {
		
		});
	}
	
}

