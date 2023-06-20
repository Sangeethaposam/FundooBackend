import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().password().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};

export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    description: Joi.string().min(4).required(),
    color: Joi.string().min(2).optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};
