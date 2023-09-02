const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // снятие ограничения через 1 минуту
  max: 50, // Лимит на запрос с каждого IP до 50 запросов на `window` (здесь на 1 минут)
  message:
    'Слишком много запросов с этого IP, пожалуйста, повторите попытку через 1 минуту',
  standardHeaders: true, // Возвращаем информацию о лимите скорости в заголовках `RateLimit-*`
  legacyHeaders: false, // Отключаем заголовки `X-RateLimit-*`
});

module.exports = limiter;
