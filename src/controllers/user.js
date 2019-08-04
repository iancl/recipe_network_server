const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

function createToken(data, secret, opts) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, secret, opts, (err, token) => {
      if (err) {
        return reject(err);
      }

      resolve(token);
    });
  });
}

module.exports = function (config, logger) {
  const self = {};

  self.register = async function (data) {
    let user = await User.findOne({ email: data.email });

    if (user) {
      logger.debug(`user ${user._id} already exists`);
      return false;
    }

    const userModel = {
      display_name: data.display_name,
      f_name: data.f_name,
      l_name: data.l_name,
      email: data.email,
      photo: data.photo,
      bio: data.bio,
      password: await bcrypt.hash(data.p, config.auth.saltRounds)
    };

    user = await User.create(userModel);
    logger.info(`created user ${user._id}`);

    return true;
  };


  // TODO:
  //  - find what's the best jwt token to use cause a string might not be
  //    the best option
  //  - find whats a good signing algorithm
  self.login = async function (email, password) {
    let user = await User.findOne({ email });

    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return null;
    }

    const token = createToken(
      { rsn: user._id },
      config.auth.secret,
      { expiresIn: config.auth.tokenExpiration }
    );

    logger.debug(`generated token for user ${user._id}`);

    return token
  };

  return self
};