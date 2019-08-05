const { Router } = require('express');

module.exports = function (config, userController, logger) {
  let router = Router();

  /**
   * It attempts to create a new user and store it in db
   */
  router.post('/register', async (req, res) => {
    const body = req.body;

    if (
      !body.display_name ||
      !body.f_name ||
      !body.l_name ||
      !body.email ||
      !body.photo ||
      !body.bio ||
      !body.p
    ) {
      return res.responder.badRequest();
    }

    let result;

    try {
      result = await userController.register(body);
    }
    catch (err) {
      logger.error(err);
      return res
        .responder
        .error({ message: 'cannot create user , try again later' });
    }

    if (result) {
      res.responder.created();
    }
    else {
      res.responder.conflict({ message: 'user already exists' });
    }
  });


  /**
   * Logs in user by issuing a new token which will be passed as httpOnly cookie
   * It will replace existing token if it exists
   */
  router.post('/login', async (req, res) => {
    const body = req.body;

    if (!body.e || !body.p) {
      return res.responder.badRequest();
    }

    let token;

    try {
      token = await userController.login(body.e, body.p);
    }
    catch (err) {
      logger.error(err);
      return res
        .responder
        .error({ message: 'cannot login, try again later' });
    }

    if (token) {
      res
        .cookie('x-auth-token', token, { httpOnly: true, maxAge: config.auth.cookieMaxAge })
        .responder.success();
    }
    else {
      res
        .responder
        .unauthorized({ message: 'username and password do not match' });
    }
  });

  return router;
};