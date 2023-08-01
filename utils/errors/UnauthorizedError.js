const MESSAGE_ERROR_UNAUTHORIZED_DEFAULT = require('../constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message || MESSAGE_ERROR_UNAUTHORIZED_DEFAULT);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
