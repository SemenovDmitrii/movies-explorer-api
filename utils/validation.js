const { celebrate, Joi } = require('celebrate');
const isIRL = require('validator/lib/isURL');
const BadRequestError = require('../errors/BadRequestError');

const urlValidator = (url) => {
  const validity = isIRL(url);
  if (!validity) {
    throw new BadRequestError('Некорректная ссылка');
  }
  return url;
};

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const createMoviesValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().custom(urlValidator).required(),
    trailerLink: Joi.string().custom(urlValidator).required(),
    thumbnail: Joi.string().custom(urlValidator).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
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
