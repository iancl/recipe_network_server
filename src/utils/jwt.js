const jwt = require('jsonwebtoken');

/**
 * Creates a new JTW token
 * @param {Object} data
 * @param {String} secret
 * @param {Object} options
 * @returns {Promise} that resolves to token
 */
module.exports.createToken = function (data, secret, opts) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, secret, opts, (err, token) => {
      if (err) {
        return reject(err);
      }

      resolve(token);
    });
  });
};

/**
 * Validates secret and expiration of JTW token
 * Then it decodes it and returns it.
 * @param {jwtToken} token
 * @param {String} secret
 * @returns {Promise} that resolves to decoded token
 */
module.exports.validate = function (token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return reject(err);
      }

      resolve(decoded);
    });
  });
};