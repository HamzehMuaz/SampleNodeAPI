const {
  createActorValidation, getActorByIdValidation,
  updateActorValidation, deleteActorValidation,
} = require('../validations/actor.validator');

const actorController = require('../controllers/actor.controller');

const getAllActors = {
  method: 'GET',
  path: '/actors',
  config: {
    description: 'Get all actors',
    notes: 'Returns array of actors',
    tags: ['api'],
    handler: actorController.getActors,
  },
};

const getActor = {
  method: 'GET',
  path: '/actors/{id}',
  config: {
    description: 'Get an Actor by Id',
    notes: 'Returns Actor document',
    tags: ['api'],
    handler: actorController.getActorById,
    validate: getActorByIdValidation,
  },
};

const createActor = {
  method: 'POST',
  path: '/actors',
  config: {
    description: 'Create a new Actor',
    tags: ['api'],
    handler: actorController.createActor,
    validate: createActorValidation,
  },
};

const updateActor = {
  method: 'PUT',
  path: '/actors/{id}',
  config: {
    description: 'Update an Actor by Id',
    tags: ['api'],
    handler: actorController.updateActor,
    validate: updateActorValidation,
  },
};

const deleteActor = {
  method: 'DELETE',
  path: '/actors/{id}',
  config: {
    description: 'Delete an Actor by Id',
    tags: ['api'],
    handler: actorController.deleteActorById,
    validate: deleteActorValidation,
  },
};

module.exports = [
  getActor,
  getAllActors,
  createActor,
  updateActor,
  deleteActor,
];
