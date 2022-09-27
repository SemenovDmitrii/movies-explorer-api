const { Joi, celebrate } = require('celebrate');

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

const createMoviesValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .required()
      .pattern(
        /^((https?):\/\/)(www.)?[a-z0-9-]+\.[a-z]+[a-z0-9/\-._~:%?#[\]@!$&='()*+,;]+#?$/i,
      ),
    trailerLink: Joi.string()
      .required()
      .pattern(
        /^((https?):\/\/)(www.)?[a-z0-9-]+\.[a-z]+[a-z0-9/\-._~:%?#[\]@!$&='()*+,;]+#?$/i,
      ),
    nameRU: Joi.string()
      .required()
      .pattern(/^[?!,.а-яА-ЯёЁ0-9\s]+$/),
    nameEN: Joi.string()
      .required()
      .pattern(/^[?!,.A-Za-z0-9\s]+$/),
    thumbnail: Joi.string()
      .required()
      .pattern(
        /^((https?):\/\/)(www.)?[a-z0-9-]+\.[a-z]+[a-z0-9/\-._~:%?#[\]@!$&='()*+,;]+#?$/i,
      ),
    movieId: Joi.number().required(),
  }),
});

const removeMoviesValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  createUserValidator,
  loginValidator,
  updateUserValidator,
  createMoviesValidator,
  removeMoviesValidator,
};
