class ForbiddenError extends Error {
  constructor(message) {
    super(message || 'Не доступно, заблокировано');
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
