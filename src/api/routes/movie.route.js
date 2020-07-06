const {
  createMovieValidation, getMovieByIdValidation,
  updateMovieValidation, deleteMovieValidation,
} = require('../validations/movie.validator');

const movieController = require('../controllers/movie.controller');

const getAllMovies = {
  method: 'GET',
  path: '/movies',
  config: {
    description: 'Get all Movies',
    tags: ['api'],
    handler: movieController.getMovies,
  },
};

const getMovie = {
  method: 'GET',
  path: '/movies/{id}',
  config: {
    description: 'Get a Movie by Id',
    tags: ['api'],
    handler: movieController.getMovieById,
    validate: getMovieByIdValidation,
  },
};

const createMovie = {
  method: 'POST',
  path: '/movies',
  config: {
    description: 'Create a Movie',
    tags: ['api'],
    handler: movieController.createMovie,
    validate: createMovieValidation,
  },
};

const updateMovie = {
  method: 'PUT',
  path: '/movies/{id}',
  config: {
    description: 'Update a Movie by Id',
    tags: ['api'],
    handler: movieController.updateMovie,
    validate: updateMovieValidation,
  },
};

const deleteMovie = {
  method: 'DELETE',
  path: '/movies/{id}',
  config: {
    description: 'Delete a Movie by Id',
    tags: ['api'],
    handler: movieController.deleteMovieById,
    validate: deleteMovieValidation,
  },
};

const searchMovies = {
  method: 'POST',
  path: '/movies/search',
  config: {
    description: 'Search Movies',
    tags: ['api'],
    handler: movieController.searchMovies,
  },
};

const countMovies = {
  method: 'POST',
  path: '/movies/count',
  config: {
    description: 'Count Movies, selected based on Country, ImdbScore and Language',
    tags: ['api'],
    handler: movieController.countMovies,
  },
};

const getAllMoviesAndFilter = {
  method: 'POST',
  path: '/movies/all',
  config: {
    description: 'Get all Movies, but filter by Genres and Plot Keywords',
    tags: ['api'],
    handler: movieController.getAllMoviesAndFilter,
  },
};

module.exports = [
  getMovie,
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  countMovies,
  getAllMoviesAndFilter,
];
