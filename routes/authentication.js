const router = require('express').Router();

const { createUser, login } = require('../controller/users');
const { validationCreateUser, validationLogin } = require('../utils/routeValidation');

// создаёт пользователя с переданными в теле
// email, password и name
router.post('/signup', validationCreateUser, createUser);

// проверяет переданные в теле почту и пароль
// и возвращает JWT
router.post('/signin', validationLogin, login);

module.exports = router;
