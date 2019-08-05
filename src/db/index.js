const mongoose = require('mongoose');

/**
 * Connects mongoose to mongoDb server
 * @param {Object} config must contain:
 * - {String} url mongoDb url
 * @returns {Promise} that resolves to client
 */
module.exports.init = function (config) {
  return mongoose.connect(config.url, { useNewUrlParser: true });
};