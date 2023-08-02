const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/errors/UnauthorizedError'); // 401

const MESSAGE_ERROR_UNAUTHORIZED_AUTHORIZATION = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new UnauthorizedError(MESSAGE_ERROR_UNAUTHORIZED_AUTHORIZATION));
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // верифицируем токен
    payload = jwt.verify(token, process.env.NODE_ENV !== 'production' ? 'strong-secret-key' : process.env.JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(MESSAGE_ERROR_UNAUTHORIZED_AUTHORIZATION));
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
