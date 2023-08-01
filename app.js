require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const router = require('./routes/index');
const errorHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_URL, {
}).then(() => {
  console.log('connected to DB');
});

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение слушает следующий порт: ${PORT}`);
  console.log(process.env.NODE_ENV);
  console.log(process.env.JWT_SECRET);
});
