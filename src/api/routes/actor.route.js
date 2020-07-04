const {
  createActorValidation, getActorByIdValidation,
  updateActorValidation, deleteActorValidation,
} = require('../validations/actor.validator');

const actorController = require('../controllers/actor.controller');

const getAllActors = {
  method: 'GET',
  path: '/actors',
  config: {
    handler: actorController.getActors,
  },
};

const getActor = {
  method: 'GET',
  path: '/actors/{id}',
  config: {
    handler: actorController.getActorById,
    validate: getActorByIdValidation,
  },
};

const createActor = {
  method: 'POST',
  path: '/actors',
  config: {
    handler: actorController.createActor,
    validate: createActorValidation,
  },
};

const updateActor = {
  method: 'PUT',
  path: '/actors/{id}',
  config: {
    handler: actorController.updateActor,
    validate: updateActorValidation,
  },
};

const deleteActor = {
  method: 'DELETE',
  path: '/actors/{id}',
  config: {
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
