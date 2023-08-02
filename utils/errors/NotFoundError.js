const MESSAGE_ERROR_NOT_FOUND_DEFAULT = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message || MESSAGE_ERROR_NOT_FOUND_DEFAULT);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
