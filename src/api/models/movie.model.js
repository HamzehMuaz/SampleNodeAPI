const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
    },
    gross: {
      type: Number,
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
    },
    num_voted_users: {
      type: Number,
    },
    cast_total_facebook_likes: {
      type: Number,
    },
    plot_keywords: {
      type: [String],
    },
    imdb_link: {
      type: String,
    },
    num_user_for_reviews: {
      type: Number,
    },
    language: {
      type: String,
    },
    country: {
      type: String,
    },
    content_rating: {
      type: String,
      enum: ['Approved', 'G', 'GP', 'M', 'NC-17', 'Not Rated', 'Passed', 'PG', 'PG-13', 'R', 'TV-14', 'TV-G', 'TV-MA',
        'TV-PG', 'TV-Y', 'TV-Y7', 'Unrated', 'X', ''],
    },
    budget: {
      type: Number,
    },
    title_year: {
      type: Number,
      min: 1900,
      max: 2030,
    },
    imdb_score: {
      type: Number,
      min: 0,
      max: 10,
    },
    aspect_ratio: {
      type: Number,
      min: 1,
    },
    movie_facebook_likes: {
      type: Number,
    },
    actors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
      },
    ],
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Director',
    },
    color: {
      type: String,
      enum: ['Black and White', 'Color', ''],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Movie', movieSchema);
