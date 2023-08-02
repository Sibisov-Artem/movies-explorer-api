const MESSAGE_ERROR_CONFLICT_DEFAULT = require('../constants');

class ConflictError extends Error {
  constructor(message) {
    super(message || MESSAGE_ERROR_CONFLICT_DEFAULT);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
