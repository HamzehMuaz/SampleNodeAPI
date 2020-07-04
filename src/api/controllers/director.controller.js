const { Director } = require('../models');

exports.getDirectorById = async (request, h) => {
  try {
    const director = await Director.findById(request.params.id);
    return h.response(director).code(200);
  } catch (error) {
    return error;
  }
};

exports.getDirectors = async (request, h) => {
  try {
    const directors = await Director.find();
    return h.response(directors).code(200);
  } catch (error) {
    return error;
  }
};

exports.createDirector = async (request, h) => {
  try {
    const director = await Director.create(request.payload);
    return h.response(director.id).code(200);
  } catch (error) {
    return error;
  }
};

exports.updateDirector = async (request, h) => {
  try {
    const response = await Director.findByIdAndUpdate(
      request.params.id,
      request.payload,
    );
    return h.response(response).code(200);
  } catch (error) {
    return error;
  }
};

exports.deleteDirectorById = async (request, h) => {
  try {
    const response = await Director.remove({ id: request.params.id });
    return h.response(response).code(200);
  } catch (error) {
    return error;
  }
};
