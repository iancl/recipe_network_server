const { Router } = require('express');
const user = require('./user');

module.exports = function (config, controllers, logger) {
  const router = Router();

  /**
   * api/user routes
   */
  router.use('/user', user(config, controllers.user, logger));
  return router;
};