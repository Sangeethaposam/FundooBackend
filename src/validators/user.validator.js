import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().regex(/^[A-Z]{1,1}[a-z]{3,}$/).required(),
    lastname: Joi.string().regex(/^[A-Z]{1,1}[a-z]{3,}$/).required(),
    email: Joi.string().regex(/^[a-zA-Z]{3,}([.|_|+-]?[a-zA-Z0-9]+)?[@][a-zA-Z]{3,}[.][a-z]{3,}$/).required(),
    password: Joi.string().regex(/^(?.*[0-9])(?.*[a-z])(?.*[A-Z])(?.*[!@#$%&*()-_+=^.])(?=\\S+$).{8,20}$/).required(),
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
