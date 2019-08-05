const user = require('./user');

module.exports = function (config, logger) {
  return {
    user: user(config, logger)
  }
};