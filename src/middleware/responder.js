function error(res, message = 'error occured') {
  res
    .status(500)
    .json({
      message
    });
}

function notFound(res, message = 'resource not found') {
  res
    .status(404)
    .json({
      message
    });
}

function badRequest(res, message = 'bad request') {
  res
    .status(400)
    .json({
      message
    });
}

function success(res, data = {message: 'success'}) {
  res
    .status(200)
    .json(data)
}

module.exports = function () {
  return function (req, res, next) {
    const responder = {};

    responder.notFound = function () {
      notFound(res);
    };

    responder.error = function (message) {
      error(res, message);
    };

    responder.success = function (data) {
      success(res, data);
    };

    responder.badRequest = function (message) {
      badRequest(res, message);
    };

    res.responder = responder;

    next();
  }
};