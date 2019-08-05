
const defaultMessages = {
  200: 'success',
  201: 'created',
  400: 'bad request',
  401: 'unauthorized',
  404: 'not found',
  409: 'conflict',
  500: 'error occurred'
};

/**
 * Called by responder methods to respond to client.
 * It basically just calls res.status(status).json(object) making use of the
 * passed arguments.
 * @param {expressResponse} res
 * @param {Integer} status
 * @param {Object} json
 */
function respond(res, status, json) {
  res
    .status(status)
    .json(json)
}

/**
 * Creates an error json object and passes it to the respond function
 * @param {expressResponse} res
 * @param {Integer} status
 * @param {Object} json
 */
function sendError(res, status, message) {
  const json = {
    code: status,
    error: {
      message: message || defaultMessages[status]
    }
  };

  respond(res, status, json);
}

/**
 * Creates an success json object and passes it to the respond function
 * @param {expressResponse} res
 * @param {Integer} status
 * @param {Object} json
 */
function sendOk(res, status, message, data) {
  const json = {
    code: status,
    message: message || defaultMessages[status]
  };

  if (data) {
    json.data = data;
  }

  respond(res, status, json);
}

/**
 * Adds method to res object that is used to respond to client.
 */
module.exports = function () {
  return function (req, res, next) {
    const responder = {};

    responder.badRequest = function (json) {
      sendError(res, 400, message);
    };

    responder.created = function (message, data) {
      sendOk(res, 201, message, data);
    };

    responder.conflict = function (message) {
      sendError(res, 409, message);
    };

    responder.error = function (message) {
      sendError(res, 500, message);
    };

    responder.notFound = function (message) {
      sendError(res, 404, message);
    };

    responder.success = function (message, data) {
      sendOk(res, 200, message, data)
    };

    responder.unauthorized = function (message) {
      sendError(res, 401, message);
    };

    res.responder = responder;

    next();
  }
};