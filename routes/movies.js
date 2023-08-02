const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controller/movies');
const { validationСreateMovie, validationDeleteMovie } = require('../utils/routeValidation');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// создаёт фильм
router.post('/', validationСreateMovie, createMovie);

// удаляет сохранённый фильм по id
router.delete('/:movieId', validationDeleteMovie, deleteMovie);

module.exports = router;
