require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const router = require('./routes/index');
const errorHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // снятие ограничения через 5 минут
  max: 15, // Лимит на запрос с каждого IP до 15 запросов на `window` (здесь на 5 минут)
  message:
    'Слишком много запросов с этого IP, пожалуйста, повторите попытку через 5 минут',
  standardHeaders: true, // Возвращаем информацию о лимите скорости в заголовках `RateLimit-*`
  legacyHeaders: false, // Отключаем заголовки `X-RateLimit-*`
});

app.use(helmet());

app.use(limiter);

mongoose.connect(DB_URL, {
}).then(() => {
  console.log('connected to DB');
});

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Приложение слушает следующий порт: ${PORT}`);
});
