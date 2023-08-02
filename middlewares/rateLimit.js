const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // снятие ограничения через 5 минут
  max: 15, // Лимит на запрос с каждого IP до 15 запросов на `window` (здесь на 5 минут)
  message:
    'Слишком много запросов с этого IP, пожалуйста, повторите попытку через 5 минут',
  standardHeaders: true, // Возвращаем информацию о лимите скорости в заголовках `RateLimit-*`
  legacyHeaders: false, // Отключаем заголовки `X-RateLimit-*`
});

module.exports = limiter;
