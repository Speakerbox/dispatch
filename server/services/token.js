'use strict';

let mongoose = require('mongoose');
let schema = require('../models/token');
let tokenModel = mongoose.model('token', schema);

module.exports = {
  setToken: setToken,
  getToken: getToken
}

function getToken(token, done){
  tokenModel.findOne({token: token}, done);
}

function setToken(params){

}
