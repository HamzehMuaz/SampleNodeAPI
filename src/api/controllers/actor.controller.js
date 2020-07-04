const { Actor } = require('../models');

exports.getActorById = async (request, h) => {
  try {
    const actor = await Actor.findById(request.params.id);
    return h.response(actor).code(200);
  } catch (error) {
    return error;
  }
};

exports.getActors = async (request, h) => {
  try {
    const actors = await Actor.find();
    return h.response(actors).code(200);
  } catch (error) {
    return error;
  }
};

exports.createActor = async (request, h) => {
  try {
    const actor = await Actor.create(request.payload);
    return h.response(actor.id).code(200);
  } catch (error) {
    return error;
  }
};

exports.updateActor = async (request, h) => {
  try {
    const response = await Actor.findByIdAndUpdate(
      request.params.id,
      request.payload,
    );
    return h.response(response).code(200);
  } catch (error) {
    return error;
  }
};

exports.deleteActorById = async (request, h) => {
  try {
    const response = await Actor.remove({ id: request.params.id });
    return h.response(response).code(200);
  } catch (error) {
    return error;
  }
};
