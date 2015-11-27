'use strict';

// Load the local (git ingnored) .env file into env.process
let dotenv = require('dotenv').load();

let nconf = require('nconf');
let path = require('path');
let environment = process.env.NODE_ENV || 'development';
let localConfig =  __dirname + '/env/' + environment + '.json'

// Load nconf with command line arguments, environment variables, and our local config in order of precendence.  
nconf
  .argv()
  .env()
  .file(localConfig);




