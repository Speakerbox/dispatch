'use strict';

let dgram = require('dgram');
let socket = dgram.createSocket('udp4');

module.exports = {
	init: init
};

function init(done){
	done();
}