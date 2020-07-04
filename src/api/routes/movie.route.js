const {
  createMovieValidation, getMovieByIdValidation,
  updateMovieValidation, deleteMovieValidation,
} = require('../validations/movie.validator');

const movieController = require('../controllers/movie.controller');

const getAllMovies = {
  method: 'GET',
  path: '/movies',
  config: {
    handler: movieController.getMovies,
  },
};

const getMovie = {
  method: 'GET',
  path: '/movies/{id}',
  config: {
    handler: movieController.getMovieById,
    validate: getMovieByIdValidation,
  },
};

const createMovie = {
  method: 'POST',
  path: '/movies',
  config: {
    handler: movieController.createMovie,
    validate: createMovieValidation,
  },
};

const updateMovie = {
  method: 'PUT',
  path: '/movies/{id}',
  config: {
    handler: movieController.updateMovie,
    validate: updateMovieValidation,
  },
};

const deleteMovie = {
  method: 'DELETE',
  path: '/movies/{id}',
  config: {
    handler: movieController.deleteMovieById,
    validate: deleteMovieValidation,
  },
};

module.exports = [
  getMovie,
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
];
