const {
  createDirectorValidation, getDirectorByIdValidation,
  updateDirectorValidation, deleteDirectorValidation,
} = require('../validations/director.validator');

const directorController = require('../controllers/director.controller');

const getAllDirectors = {
  method: 'GET',
  path: '/directors',
  config: {
    handler: directorController.getDirectors,
  },
};

const getDirector = {
  method: 'GET',
  path: '/directors/{id}',
  config: {
    handler: directorController.getDirectorById,
    validate: getDirectorByIdValidation,
  },
};

const createDirector = {
  method: 'POST',
  path: '/directors',
  config: {
    handler: directorController.createDirector,
    validate: createDirectorValidation,
  },
};

const updateDirector = {
  method: 'PUT',
  path: '/directors/{id}',
  config: {
    handler: directorController.updateDirector,
    validate: updateDirectorValidation,
  },
};

const deleteDirector = {
  method: 'DELETE',
  path: '/directors/{id}',
  config: {
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
