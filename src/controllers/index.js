const user = require('./user');
const auth = require('./auth');

module.exports = function (config, logger) {
  return {
    auth: auth(logger),
    user: user(config, logger)
  }
};