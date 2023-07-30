class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'Ошибка авторизации');
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
