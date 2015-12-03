'use strict';

let async = require('async');
let storage = require('./storage');
let socket = require('./socket');

module.exports = {
	init: init
}

function init(done){
	var tasks = [
		storage.init,
		socket.init
	];

	async.series(tasks, done);
};
