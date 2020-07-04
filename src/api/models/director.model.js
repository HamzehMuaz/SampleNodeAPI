const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const bcrypt = require('bcryptjs');
const { esHost } = require('../../config/vars');

const esClient = require('../../config/elasticsearch')();

const directorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    facebook_likes: {
      type: Number,
    },
    age: {
      type: Number,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
      minlength: 6,
      maxlength: 128,
    },
  },
  {
    timestamps: true,
  },
);

directorSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

directorSchema.plugin(mongoosastic, {
  esClient,
  hosts: [
    esHost,
  ],
  // populate: [],
});

const Director = mongoose.model('Director', directorSchema);

Director.esSearch = Promise.promisify(Director.esSearch, { context: Director });

module.exports = Director;
