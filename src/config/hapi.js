const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const routes = require('../api/routes');

const {
  host, port,
} = require('./vars');

module.exports = async () => {
  const server = Hapi.Server({
    host,
    port,
  });
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Sample Node API',
          version: '1.0',
        },
      },
    },
  ]);

  server.route(routes);

  server.route({
    path: '/',
    method: 'GET',
    options: {
      description: 'Get Version',
      notes: 'Returns current API version',
      tags: ['api'],
      handler: (request, h) => 'Version 1.0',
    },
  });

  return server;
};
