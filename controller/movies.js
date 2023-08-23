const Movie = require('../models/movie');

const BadRequestError = require('../utils/errors/BadRequestError'); // 400
const NotFoundError = require('../utils/errors/NotFoundError'); // 404
const ForbiddenError = require('../utils/errors/ForbiddenError'); // 403

const {
  MESSAGE_ERROR_BAD_REQUEST_CREATE_MOVIE,
  MESSAGE_ERROR_BAD_REQUEST_DELETE_MOVIE,
  MESSAGE_ERROR_NOT_FOUND_DELETE_MOVIE,
  MESSAGE_ERROR_FORBIDDEN_DELETE_MOVIE,
} = require('../utils/constants');

// возвращает все сохранённые текущим пользователем фильмы
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

// создаёт фильм с переданными в теле
// country, director, duration, year,
// description, image, trailer, nameRU, nameEN и thumbnail, movieId
const createMovie = (req, res, next) => {
  const {
    country,
    director, duration,
    year, description,
    image, trailerLink,
    nameRU, nameEN,
    thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE_ERROR_BAD_REQUEST_CREATE_MOVIE));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
// DELETE /movies/_id
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(MESSAGE_ERROR_NOT_FOUND_DELETE_MOVIE));
      }
      if (req.user._id !== movie.owner.toString()) {
        return next(new ForbiddenError(MESSAGE_ERROR_FORBIDDEN_DELETE_MOVIE));
      }
      return movie.deleteOne()
        .then((movieDelete) => {
          res.send(movieDelete);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MESSAGE_ERROR_BAD_REQUEST_DELETE_MOVIE));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
