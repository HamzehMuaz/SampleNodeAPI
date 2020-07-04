const elasticsearch = require('elasticsearch');

const { esHost } = require('./vars');

module.exports = () => {
  const esClient = new elasticsearch.Client({
    host: esHost,
  });

  return esClient;
};
