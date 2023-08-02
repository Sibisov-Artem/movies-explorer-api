const MESSAGE_ERROR_BAD_REQUEST_DEFAULT = require('../constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message || MESSAGE_ERROR_BAD_REQUEST_DEFAULT);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
