const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const genresEnum = ['Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Film-Noir',
  'Game-Show', 'History', 'Horror', 'Music', 'Musical', 'Mystery', 'News', 'Reality-TV', 'Romance', 'Sci-Fi', 'Short', 'Sport', 'Thriller',
  'War', 'Western', ''];

const contentRatingEnum = ['Approved', 'G', 'GP', 'M', 'NC-17', 'Not Rated', 'Passed', 'PG', 'PG-13', 'R', 'TV-14', 'TV-G', 'TV-MA',
  'TV-PG', 'TV-Y', 'TV-Y7', 'Unrated', 'X', ''];

const colorEnum = ['Black and White', 'Color', ''];

const movieBodyValidation = {
  duration: Joi.number().optional(),
  gross: Joi.number().optional(),
  genres: Joi.array().items(Joi.string().valid(...genresEnum)).optional(),
  num_voted_users: Joi.number().optional(),
  cast_total_facebook_likes: Joi.number().optional(),
  plot_keywords: Joi.array().items(Joi.string()).optional(),
  imdb_link: Joi.string().optional(),
  num_user_for_reviews: Joi.number().optional(),
  language: Joi.string().optional(),
  country: Joi.string().optional(),
  content_rating: Joi.array().items(Joi.string().valid(...contentRatingEnum)).optional(),
  budget: Joi.number().optional(),
  title_year: Joi.number().min(1900).max(2030).optional(),
  imdb_score: Joi.number().min(0).max(10).optional(),
  aspect_ratio: Joi.number().min(1).optional(),
  movie_facebook_likes: Joi.number().optional(),
  actors: Joi.array().items(Joi.objectId()).optional(),
  director: Joi.objectId().optional(),
  color: Joi.string().valid(...colorEnum).optional(),
};

module.exports = {
  createMovieValidation: {
    payload: Joi.object({ ...movieBodyValidation, ...{ title: Joi.string().required() } }),
  },

  getMovieByIdValidation: {
    params: Joi.object({ id: Joi.objectId().required() }),
  },

  updateMovieValidation: {
    payload: Joi.object({ ...movieBodyValidation, ...{ title: Joi.string().optional() } }),
    params: Joi.object({ id: Joi.objectId().required() }),
  },

  deleteMovieValidation: {
    params: Joi.object({ id: Joi.objectId().required() }),
  },
};
