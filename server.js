'use strict';

let numCPUs = require('os').cpus().length;
let cluster = require('cluster');

if (cluster.isMaster) {
  // Fork workers up to availabled cpus
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Exit event is fired whenever a worker process exits.
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' exited.');
    
    // Restart the worker
    let newWorker = cluster.fork();
    console.log('worker ' + newWorker.process.pid + ' created.');
  });	
} else {
  // Start the app
  require('./app');
}
