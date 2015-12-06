'use strict';

let async = require('async');
let storage = require('./storage');
let streams = require('./streams');

module.exports = {
	init: init
}

function init(done){
	var tasks = [
		storage.init,
		streams.init
	];
	async.series(tasks, done);
};
