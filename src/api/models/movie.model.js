const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const { esHost } = require('../../config/vars');

const esClient = require('../../config/elasticsearch')();

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      es_indexed: true,
    },
    duration: {
      type: Number,
      es_indexed: true,
    },
    gross: {
      type: Number,
      es_indexed: true,
    },
    genres: {
      type: [
        {
          type: String,
          enum: ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir',
            'Game-Show', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'News', 'Reality-TV', 'Romance', 'Sci-Fi', 'Short', 'Sport', 'Thriller',
            'War', 'Western', ''],
        },
      ],
      es_indexed: true,
    },
    num_voted_users: {
      type: Number,
      es_indexed: true,
    },
    cast_total_facebook_likes: {
      type: Number,
      es_indexed: true,
    },
    plot_keywords: {
      type: [String],
      es_indexed: true,
    },
    imdb_link: {
      type: String,
      es_indexed: true,
    },
    num_user_for_reviews: {
      type: Number,
      es_indexed: true,
    },
    language: {
      type: String,
      es_indexed: true,
    },
    country: {
      type: String,
      es_indexed: true,
    },
    content_rating: {
      type: String,
      enum: ['Approved', 'G', 'GP', 'M', 'NC-17', 'Not Rated', 'Passed', 'PG', 'PG-13', 'R', 'TV-14', 'TV-G', 'TV-MA',
        'TV-PG', 'TV-Y', 'TV-Y7', 'Unrated', 'X', ''],
      es_indexed: true,
    },
    budget: {
      type: Number,
      es_indexed: true,
    },
    title_year: {
      type: Number,
      min: 1900,
      max: 2030,
      es_indexed: true,
    },
    imdb_score: {
      type: Number,
      min: 0,
      max: 10,
      es_indexed: true,
    },
    aspect_ratio: {
      type: Number,
      min: 1,
      es_indexed: true,
    },
    movie_facebook_likes: {
      type: Number,
      es_indexed: true,
    },
    actors: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Actor',
        },
      ],
      es_indexed: true,
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Director',
      es_indexed: true,
    },
    color: {
      type: String,
      enum: ['Black and White', 'Color', ''],
      es_indexed: true,
    },
  },
  {
    timestamps: true,
  },
);

movieSchema.plugin(mongoosastic, {
  esClient,
  hosts: [
    esHost,
  ],
  // populate: [],
});

const Movie = mongoose.model('Movie', movieSchema);

Movie.esSearch = Promise.promisify(Movie.esSearch, { context: Movie });

module.exports = Movie;
