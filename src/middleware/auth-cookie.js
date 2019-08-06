const jwt = require('../utils/jwt');
const User = require('../models/user');

/**
 * This middleware will make sure that the token is valid and that is hasn't
 * expired yet. If it's still valid then it will query the user and append
 * it to the request object.
 * If the token is expired or invalid it will remove it from the cookies
 * @param {Object} config server configuration values
 * @param {winston.Logger} logger
 * @returns {Function} middleware function
 */
module.exports = function (config, logger) {
  return async function (req, res, next) {
    const token = req.cookies['x-auth-token'];
    if (!token) {
      return res.responder.unauthorized();
    }

    let decoded;
    try {
      // right now jwt is only validating secret and expiration
      decoded = await jwt
        .validate(token, config.publicKeyBuffer, {issuer: config.issuer});
    }
    catch (err) {
      logger.error(err);
      res.clearCookie('x-auth-token');
      return res.responder.unauthorized('invalid token');
    }

    let user;
    try {
      user = await User.findOne({ _id: decoded.rsn });
    }
    catch (err) {
      logger.error(err);
      res.responder.error('cannot fullfill request at this moment');
    }

    req.user = user;
    next();
  };
};