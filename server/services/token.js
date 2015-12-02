'use strict';

let tokenModel = require('../models/token');
let promise = require('bluebird');

module.exports = function(){
	getToken: getToken
}

function getToken(token){
	return token;
}
