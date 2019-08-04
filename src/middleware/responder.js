
const defaultMessages = {
  200: 'success',
  201: 'created',
  400: 'bad request',
  401: 'unauthorized',
  404: 'not found',
  409: 'conflict',
  500: 'error occurred'
};

function respond(res, status, json = { message: defaultMessages[status] }) {
  res
    .status(status)
    .json(json)
}

module.exports = function () {
  return function (req, res, next) {
    const responder = {};

    responder.notFound = function (json) {
      respond(res, 404, json);
    };

    responder.error = function (json) {
      respond(res, 500, json);
    };

    responder.success = function (json) {
      respond(res, 200, json)
    };

    responder.badRequest = function (json) {
      respond(res, 400, json);
    };

    responder.created = function (json) {
      respond(res, 201, json);
    };

    responder.conflict = function (json) {
      respond(res, 409, json);
    };

    responder.unauthorized = function (json) {
      respond(res, 401, json);
    };

    res.responder = responder;

    next();
  }
};