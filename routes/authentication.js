const router = require('express').Router();
const { createUser, login } = require('../controller/users');

// создаёт пользователя с переданными в теле
// email, password и name
router.post('/signup', createUser);

// проверяет переданные в теле почту и пароль
// и возвращает JWT
router.post('/signin', login);

module.exports = router;
