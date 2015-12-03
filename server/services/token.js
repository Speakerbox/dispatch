'use strict';
let mongoose = require('mongoose');
let schema = require('../models/token');
let tokenModel = mongoose.model('token', schema);

module.exports = {
	setToken: setToken,
	getToken: getToken
}

function getToken(token){
	return tokenModel
		.findOne({token: token})
		.lean()
		.exec()
		.then(function(token){
			if(!token){
				throw new Error('Token not found');
			}
		});
}

function setToken(params){
	
}
