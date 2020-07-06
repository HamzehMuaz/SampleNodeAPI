const {
  createDirectorValidation, getDirectorByIdValidation,
  updateDirectorValidation, deleteDirectorValidation,
} = require('../validations/director.validator');

const directorController = require('../controllers/director.controller');

const getAllDirectors = {
  method: 'GET',
  path: '/directors',
  config: {
    description: 'Get all Directors',
    tags: ['api'],
    handler: directorController.getDirectors,
  },
};

const getDirector = {
  method: 'GET',
  path: '/directors/{id}',
  config: {
    description: 'Get a Director by Id',
    tags: ['api'],
    handler: directorController.getDirectorById,
    validate: getDirectorByIdValidation,
  },
};

const createDirector = {
  method: 'POST',
  path: '/directors',
  config: {
    description: 'Create a new Director',
    tags: ['api'],
    handler: directorController.createDirector,
    validate: createDirectorValidation,
  },
};

const updateDirector = {
  method: 'PUT',
  path: '/directors/{id}',
  config: {
    description: 'Update a Director by Id',
    tags: ['api'],
    handler: directorController.updateDirector,
    validate: updateDirectorValidation,
  },
};

const deleteDirector = {
  method: 'DELETE',
  path: '/directors/{id}',
  config: {
    description: 'Delete a Director by Id',
    tags: ['api'],
    handler: directorController.deleteDirectorById,
    validate: deleteDirectorValidation,
  },
};

module.exports = [
  getDirector,
  getAllDirectors,
  createDirector,
  updateDirector,
  deleteDirector,
];
