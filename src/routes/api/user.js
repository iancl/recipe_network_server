const { Router } = require('express');

module.exports = function (userController, logger) {
  let router = Router();

  // TODO: create password policy
  // find a valid format for the json
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
      res.responder.success({ token })
    }
    else {
      res
        .responder
        .unauthorized({ message: 'username and password do not match' });
    }
  });

  return router;
};