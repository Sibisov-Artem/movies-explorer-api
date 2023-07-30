class BadRequestError extends Error {
  constructor(message) {
    super(message || 'Ошибка запроса');
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
