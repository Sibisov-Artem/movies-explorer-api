const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequestError = require('../utils/errors/BadRequestError'); // 400
const NotFoundError = require('../utils/errors/NotFoundError'); // 404
const UnauthorizedError = require('../utils/errors/UnauthorizedError'); // 401
const ConflictError = require('../utils/errors/ConflictError'); // 409

// возвращает информацию о пользователе (email и имя)
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

// обновляет информацию о пользователе (email и имя)
const updateUserInfoById = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(userId, { name, email })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(' Пользователь с указанным _id не найден.'));
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении пользователя.'));
      } else {
        next(err);
      }
    });
};

// для регистрации пользователя
// создаёт пользователя с переданными в теле
// email, password и name
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Конфликт данных. Этот адрес почты уже занят'));
      } else {
        next(err);
      }
    });
};

// проверяет переданные в теле почту и пароль
// и возвращает JWT
const login = (req, res, next) => {
  const { email, password } = req.body;
  // if (!email || !password) {
  //   res.status(400).send({ message: 'Не передан email или пароль' });
  // }
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError('Неправильные почта или пароль'));
        return;
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            next(new UnauthorizedError('Неправильные почта или пароль'));
            return;
          }
          const token = jwt.sign({ _id: user._id }, 'strong-secret-key', { expiresIn: '7d' });
          res.send({ token });
        });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  updateUserInfoById,
  createUser,
  login,
};
