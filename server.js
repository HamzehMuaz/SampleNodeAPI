// eslint-disable-next-line no-global-assign
Promise = require('bluebird');

const mongoose = require('./src/config/mongoose');
const server = require('./src/config/hapi')();

const { host, port } = require('./src/config/vars');

mongoose.connect();

server.start().then(() => {
  console.log(`Server now running on Host: ${host} and Port: ${port}`);
}).catch((error) => {
  console.error('There was a problem with start the server', error);
});

module.exports = server;
