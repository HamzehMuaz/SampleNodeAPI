const { Movie } = require('../models');

exports.getMovieById = async (request, h) => {
  try {
    const movie = await Movie.findById(request.params.id);
    return h.response(movie).code(200);
  } catch (error) {
    return error;
  }
};

exports.getMovies = async (request, h) => {
  try {
    const movies = await Movie.find();
    return h.response(movies).code(200);
  } catch (error) {
    return error;
  }
};

exports.createMovie = async (request, h) => {
  try {
    const movie = await Movie.create(request.payload);
    return h.response(movie.id).code(200);
  } catch (error) {
    return error;
  }
};

exports.updateMovie = async (request, h) => {
  try {
    const response = await Movie.findByIdAndUpdate(
      request.params.id,
      request.payload,
    );
    return h.response(response).code(200);
  } catch (error) {
    return error;
  }
};

exports.deleteMovieById = async (request, h) => {
  try {
    const response = await Movie.remove({ id: request.params.id });
    return h.response(response).code(200);
  } catch (error) {
    return error;
  }
};
