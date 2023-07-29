const router = require('express').Router();
const { getCurrentUser, updateUserInfoById } = require('../controller/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getCurrentUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', updateUserInfoById);

module.exports = router;
