const { Router } = require('express');

const user = require('./user');

module.exports = function (controllers, logger) {
  const router = Router();

  /**
   * api/user routes
   */
  router.use('/user', user(controllers.user, logger));


  return router;
};