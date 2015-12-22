'use strict';

let async = require('async');
let storage = require('./storage');
let sockets = require('./sockets');

module.exports = {
	init: init
}

function init(done){
	var tasks = [
		storage.init,
		sockets.init
	];
	async.series(tasks, done);
};
