class NotFoundError extends Error {
  constructor(message) {
    super(message || 'Данные не найдены');
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
