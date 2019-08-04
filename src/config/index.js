const defaults = require('./defaults.json');

module.exports = function () {
  return {
    db: {
      url: process.env.DB_URL || defaults.db.url
    },
    log: {
      level: process.env.LOG_LEVEL || defaults.log.level
    },
    // this must always get overriden by the env var
    auth: {
      secret: process.env.AUTH_SECRET || defaults.auth.secret,
      saltRounds: process.env.SALT_ROUNDS || defaults.auth.salt_rounds,
      tokenExpiration: process.env.TOKEN_EXPIRATION | defaults.auth.token_expiration
    },
    server: {
      port: process.env.PORT || defaults.server.port
    }
  };
};
