const Movie = require('../models/movie');

// возвращает все сохранённые текущим пользователем фильмы
const getMovies = (req, res) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// создаёт фильм с переданными в теле
// country, director, duration, year,
// description, image, trailer, nameRU, nameEN и thumbnail, movieId
const createMovie = (req, res) => {
  console.log(req.body);
  const {
    country,
    director, duration,
    year, description,
    image, trailer,
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
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// удаляет сохранённый фильм по id
// DELETE /movies/_id
const deleteMovie = (req, res) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .then((movie) => res.send({ data: movie }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
