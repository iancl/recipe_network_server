const { Router } = require('express');
const authMiddleware = require('../../middleware/auth-cookie');

const user = require('./user');

module.exports = function (config, controllers, logger) {
  const router = Router();

  /**
   * api/user routes
   */
  router.use('/user', user(config, controllers.user, logger));

  /**
   * dummy
   */
  router.use('/protected', authMiddleware(config.auth, logger), (req, res) => {
    console.log('user', req.user);
    res.responder.success({message: 'you are still logged in'});
  });

  return router;
};