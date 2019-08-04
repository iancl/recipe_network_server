const { Router } = require('express');
const passport = require('passport');

module.exports = function (userController, logger) {
  let router = Router();

  router.post('/register', async (req, res, next) => {
    const dummyData = {
      displayName: 'iqn',
      fName: 'Ian',
      lName: 'Calderon',
      email: 'ianc@lderon.com',
      photo: '10010101010101',
      bio: 'this is my boring bio'
    };

    passport.authenticate('register', function(err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        console.log("-----------user not found");
      }

      if (info) {
        console.log('+++++++++++++++++++++++++', info);
      }

      req.logIn(user, function(err) {
        console.log('------------------------_________________________________-----------------------------');
      });
    })(req, res, next);


    let response;

    // not sure what to do here yet
    try {
      response = userController.register(dummyData);
    }
    catch (err) {
      logger.error(err);
    }

    res.responder.success(dummyData);
  });

  return router;
};