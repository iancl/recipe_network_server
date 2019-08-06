const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('../utils/jwt');

module.exports = function (config, logger) {
  const self = {};

  /**
   * Creates a new user and stores it in DB
   * It doesn't log in user
   * @param {Object} data extracted from request body and contains:
   * - {String} display_name
   * - {String} f_name
   * - {String} l_name
   * - {String} email
   * - {Binary} photo
   * - {String} bio
   * - {String} password
   * @returns {Boolean} true if user was created successfully.
   */
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

  /**
   * Issues a new token if the credentials are correct.
   * @param {String} email
   * @param {String} password
   * @returns {String} token or null
   */
  self.login = async function (email, password) {
    let user = await User.findOne({ email });
    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return null;
    }

    const token = jwt.createToken(
      { rsn: user._id, issuer: config.auth.tokenIssuer },
      config.auth.privateKeyBuffer,
      { expiresIn: config.auth.tokenExpiration, algorithm: 'RS256' }
    );

    logger.debug(`generated token for user ${user._id}`);

    return token;
  };

  return self
};