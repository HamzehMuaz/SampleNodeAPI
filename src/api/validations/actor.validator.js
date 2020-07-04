const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const actorBodyValidation = {
  name: Joi.string().optional(),
  facebook_likes: Joi.number().optional(),
  age: Joi.number().optional(),
  facebook_page_link: Joi.string().optional(),
};

module.exports = {
  createActorValidation: {
    payload: Joi.object(actorBodyValidation),
  },

  getActorByIdValidation: {
    params: Joi.object({ id: Joi.objectId().required() }),
  },

  updateActorValidation: {
    payload: Joi.object(actorBodyValidation),
    params: Joi.object({ id: Joi.objectId().required() }),
  },

  deleteActorValidation: {
    params: Joi.object({ id: Joi.objectId().required() }),
  },
};
