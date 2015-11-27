'use strict';

let socket = require('socket.io')();

socket.listen(3000);

socket.on('connect', function (socket) {
	console.log('connected');
});
