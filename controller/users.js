const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// возвращает информацию о пользователе (email и имя)
const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// обновляет информацию о пользователе (email и имя)
const updateUserInfoById = (req, res) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(userId, { name, email })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// для регистрации пользователя
// создаёт пользователя с переданными в теле
// email, password и name
const createUser = (req, res) => {
  const { name, email } = req.body;

  User.create({ name, email })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// проверяет переданные в теле почту и пароль
// и возвращает JWT
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: 'Не передан email или пароль' });
  }
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(401).send({ message: 'Неправильные почта или пароль' });
      }
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            res.status(401).send({ message: 'Неправильные почта или пароль' });
          }
          const token = jwt.sign({ _id: user._id }, 'strong-secret-key', { expiresIn: '7d' });
          res.send({ token });
        });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  getCurrentUser,
  updateUserInfoById,
  createUser,
  login,
};

/*
Создайте роуты и контроллеры
В API должно быть 5 роутов:


# возвращает информацию о пользователе (email и имя)
GET /users/me

# обновляет информацию о пользователе (email и имя)
PATCH /users/me

# возвращает все сохранённые текущим пользователем фильмы
GET /movies

# создаёт фильм с переданными в теле
# country, director, duration, year, description, image,
 trailer, nameRU, nameEN и thumbnail, movieId
POST /movies

# удаляет сохранённый фильм по id
DELETE /movies/_id
Создайте контроллер для каждого роута. Защитите роуты авторизацией: если клиент не прислал JWT,
доступ к роутам ему должен быть закрыт.
*/
