class ConflictError extends Error {
  constructor(message) {
    super(message || 'Конфликт данных');
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
