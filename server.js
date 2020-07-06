// eslint-disable-next-line no-global-assign
Promise = require('bluebird');

const mongoose = require('./src/config/mongoose');

const { host, port } = require('./src/config/vars');

mongoose.connect();

const start = async () => {
  // eslint-disable-next-line global-require
  const server = await require('./src/config/hapi')();
  server.start().then(() => {
    console.log(`Server now running on Host: ${host} and Port: ${port}`);
  }).catch((error) => {
    console.error('There was a problem with start the server', error);
  });
};

start();
