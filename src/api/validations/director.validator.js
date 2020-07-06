const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const directorBodyValidation = {
  name: Joi.string().optional(),
  facebook_likes: Joi.number().optional(),
  age: Joi.number().optional(),
  username: Joi.string().optional(),
  password: Joi.string().max(128).min(6).optional(),
};

module.exports = {
  createDirectorValidation: {
    payload: Joi.object(directorBodyValidation),
  },

  getDirectorByIdValidation: {
    params: Joi.object({ id: Joi.objectId().required() }),
  },

  updateDirectorValidation: {
    payload: Joi.object(directorBodyValidation),
    params: Joi.object({ id: Joi.objectId().required() }),
  },

  deleteDirectorValidation: {
    params: Joi.object({ id: Joi.objectId().required() }),
  },
};
