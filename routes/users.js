const router = require('express').Router();

const { getCurrentUser, updateUserInfoById } = require('../controller/users');
const { validationUpdateUserInfoById } = require('../utils/routeValidation');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getCurrentUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', validationUpdateUserInfoById, updateUserInfoById);

module.exports = router;
