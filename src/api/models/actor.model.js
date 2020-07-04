const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const { esHost } = require('../../config/vars');

const esClient = require('../../config/elasticsearch')();

const actorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      es_indexed: true,
    },
    facebook_likes: {
      type: Number,
      es_indexed: true,
    },
    age: {
      type: Number,
      es_indexed: true,
    },
    facebook_page_link: {
      type: String,
      es_indexed: true,
    },
  },
  {
    timestamps: true,
  },
);

actorSchema.plugin(mongoosastic, {
  esClient,
  hosts: [
    esHost,
  ],
  // populate: [],
});

const Actor = mongoose.model('Actor', actorSchema);

Actor.esSearch = Promise.promisify(Actor.esSearch, { context: Actor });

module.exports = Actor;
