const { Router } = require('express');
const api = require('./api');

module.exports = function (controllers, logger) {
  const router = Router();

  /**
   * API endpoint
   */
  router.use('/api/v1', api(controllers, logger));

  /**
   * healthcheck route
   */
  router.get('/healthcheck', (req, res) => {
    res.responder.success();
  });

  /**
   * 404 route
   */
  router.use((req, res) => {
    res.responder.notFound();
  });

  /**
   * 500 route
   */
  router.use((err, req, res, next) => {
    logger.error(err);
    res.responder.error();
  });

  return router;
};