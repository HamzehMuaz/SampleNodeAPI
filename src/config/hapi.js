const Hapi = require('@hapi/hapi');

const routes = require('../api/routes');

const {
  host, port,
} = require('./vars');

module.exports = () => {
  const server = Hapi.Server({
    host,
    port,
  });

  server.route(routes);

  server.route({
    path: '/',
    method: 'GET',
    handler: (request, h) => 'V1.0',
  });

  return server;
};
