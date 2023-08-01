const Movie = require('../models/movie');

const BadRequestError = require('../utils/errors/BadRequestError'); // 400
const NotFoundError = require('../utils/errors/NotFoundError'); // 404
const ForbiddenError = require('../utils/errors/ForbiddenError'); // 403

// возвращает все сохранённые текущим пользователем фильмы
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
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
    .then((movie) => res.status(201).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('При создании переданы некорректные данные.'));
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
        return next(new NotFoundError('Фильм с указанным _id не найден.'));
      }
      if (req.user._id !== movie.owner.toString()) {
        return next(new ForbiddenError('Удалять фильмы других пользователей недопустимо'));
      }
      return movie.deleteOne()
        .then((movieDelete) => {
          res.send({ data: movieDelete });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Удаление фильма с некорректным id.'));
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
