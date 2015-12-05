'use strict';

let async = require('async');
let storage = require('./components/storage');
let streaming = require('./components/streaming');

module.exports = {
	init: init
}

function init(done){
	var tasks = [
		storage.init,
		streaming.init
	];
	async.series(tasks, done);
};
