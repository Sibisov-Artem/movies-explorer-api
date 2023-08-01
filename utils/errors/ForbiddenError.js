const MESSAGE_ERROR_FORBIDDEN_DEFAULT = require('../constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message || MESSAGE_ERROR_FORBIDDEN_DEFAULT);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
