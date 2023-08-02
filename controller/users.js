const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequestError = require('../utils/errors/BadRequestError'); // 400
const NotFoundError = require('../utils/errors/NotFoundError'); // 404
const UnauthorizedError = require('../utils/errors/UnauthorizedError'); // 401
const ConflictError = require('../utils/errors/ConflictError'); // 409

const {
  MESSAGE_ERROR_NOT_FOUND_UPDATE_USER_INFO_BY_ID,
  MESSAGE_ERROR_BAD_REQUEST_UPDATE_USER_INFO_BY_ID,
  MESSAGE_ERROR_BAD_REQUEST_CREATE_USER,
  MESSAGE_ERROR_CONFLICT__CREATE_USER,
  MESSAGE_ERROR_UNAUTHORIZED_LOGIN,
} = require('../utils/constants');

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

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(MESSAGE_ERROR_NOT_FOUND_UPDATE_USER_INFO_BY_ID));
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MESSAGE_ERROR_BAD_REQUEST_UPDATE_USER_INFO_BY_ID));
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
        next(new BadRequestError(MESSAGE_ERROR_BAD_REQUEST_CREATE_USER));
      } else if (err.code === 11000) {
        next(new ConflictError(MESSAGE_ERROR_CONFLICT__CREATE_USER));
      } else {
        next(err);
      }
    });
};

// проверяет переданные в теле почту и пароль
// и возвращает JWT
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError(MESSAGE_ERROR_UNAUTHORIZED_LOGIN));
        return;
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            next(new UnauthorizedError(MESSAGE_ERROR_UNAUTHORIZED_LOGIN));
            return;
          }
          const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV !== 'production' ? 'strong-secret-key' : process.env.JWT_SECRET, { expiresIn: '7d' });
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
