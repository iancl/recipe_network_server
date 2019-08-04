const user = require('./user');
const auth = require('./auth');

module.exports = function (logger) {
  return {
    auth: auth(logger),
    user: user(logger)
  }
};