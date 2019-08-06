const { Router } = require('express');
const authMiddleware = require('../../middleware/auth-cookie');

module.exports = function (config, userController, logger) {
  const router = Router();
  const cookieOpts = {
    httpOnly: true,
    maxAge: config.auth.cookieMaxAge,
    overwrite: true
  };

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
        .error('cannot create user , try again later');
    }

    if (result) {
      res.responder.created();
    }
    else {
      res.responder.conflict('user already exists' );
    }
  });


  /**
   * Logs in user by issuing a new token which will be passed as httpOnly cookie
   * It will replace existing token if it exists
   */
  router.post('/login', async (req, res) => {
    if (!req.body.e || !req.body.p) {
      return res.responder.badRequest();
    }

    let token;
    try {
      token = await userController.login(req.body.e, req.body.p);
    }
    catch (err) {
      logger.error(err);
      return res
        .responder
        .error('cannot login, try again later');
    }

    if (token) {
      res
        .cookie('x-auth-token', token, cookieOpts)
        .responder.success();
    }
    else {
      // we wanna clear the cookie if the log
      res
        .clearCookie('x-auth-token')
        .responder
        .unauthorized('username and password do not match');
    }
  });

  /**
   * returns data about current user
   * *Request must contain valid token*
   */
  router.get('/me', authMiddleware(config.auth, logger), (req, res) => {
    const user = {
      display_name: req.user.display_name,
      bio: req.user.bio,
      f_name: req.user.f_name,
      l_name: req.user.l_name,
      email: req.user.email,
    };

    res.responder.success('success', user);
  });

  return router;
};