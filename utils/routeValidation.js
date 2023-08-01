const { celebrate, Joi } = require('celebrate');
const regularHttp = require('./regularHttp');

const validationСreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regularHttp),
    trailerLink: Joi.string().required().regex(regularHttp),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(regularHttp),
    movieId: Joi.number().required(),
  }),
});

const validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

const validationUpdateUserInfoById = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validationСreateMovie,
  validationDeleteMovie,
  validationUpdateUserInfoById,
  validationCreateUser,
  validationLogin,
};
