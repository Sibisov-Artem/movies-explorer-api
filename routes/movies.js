const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controller/movies');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// создаёт фильм
router.post('/', createMovie);

// удаляет сохранённый фильм по id
router.delete('/_id', deleteMovie);

module.exports = router;
