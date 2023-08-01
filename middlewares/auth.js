const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ message: 'Необходима авторизация' });
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    // верифицируем токен
    payload = jwt.verify(token, process.env.NODE_ENV !== 'production' ? 'strong-secret-key' : process.env.JWT_SECRET);
  } catch (err) {
    res.status(401).send({ message: 'Необходима авторизация' });
    return;
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
